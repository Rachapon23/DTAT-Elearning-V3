import React, { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Row, Col, Segmented, Table, Typography, Upload, Image, Button, Modal, Card, Input, Tabs } from 'antd'
import { MenuOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { CSS } from '@dnd-kit/utilities';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';
import { Link } from 'react-router-dom';
import { createannounce, createFilePublic, updateannounce, updateCourse } from '../../../../function/Admin/adminFunction';
import { AdminContext } from './AdminManageContext';
import ImgCrop from 'antd-img-crop';
import CourseTable from './CourseTable';

const { Title } = Typography;
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"

const RowTable = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'], });

  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      },
    )?.replace(/translate3d\(([^,]+),/, 'translate3d(0,'),
    transition,
    ...(
      isDragging ?
        {
          position: 'relative',
          zIndex: 1,
        } : {}
    ),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            children: (
              <Row
                justify={"center"}
                align={"middle"}
                style={{
                  height: "70px",
                  touchAction: 'none',
                  cursor: 'move',
                }}
                ref={setActivatorNodeRef}
                {...listeners}
              >
                <Col flex={"auto"}>
                  <MenuOutlined
                    style={{ fontSize: "120%", }}
                  />
                </Col>
              </Row>
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};


const AdminManageHome = ({ manage = null, initAction = "Preview" }) => {

  const [imageData, setImageData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const { announce, setAnnounce } = useContext(AdminContext)
  const { coursePublic, setCoursePublic } = useContext(AdminContext)
  const { coursePrivate, setCoursePrivate } = useContext(AdminContext)

  const [manageHomeData, setManageHomeData] = useState()
  const [actionMode, setActionMode] = useState(initAction)
  const [saveChange, setSaveChange] = useState(false)

  const [isUpdate, setIsUpdate] = useState(false)

  const handleAddImage = async (image) => {

    let createFileField = null

    switch (manage) {
      case "Announce": createFileField = "announce"; break;
      default: return;
    }
    // if (manage === "Public Course") createFileField = "publicCourse"
    // if (manage === "Private Course") createFileField = "announce"

    let formData = new FormData()
    console.log(image?.file)
    formData.append("file", image?.file)
    formData.append("original_name", image?.file?.name)


    // onChange(index, { image: formData })

    // create image for preview before upload to server


    let imageData = null
    await createFilePublic(sessionStorage.getItem("token"), formData, createFileField)
      .then(
        (res) => {
          const data = res.data.data
          imageData = data
          console.log(data)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )

    if (!imageData) return
    const objectUrl = URL.createObjectURL(image?.file)
    setSelectedImage(objectUrl)

    await createannounce(sessionStorage.getItem("token"), {
      name: imageData?.name,
      original_name: imageData?.original_name,
    })
      .then(
        (res) => {
          const data = res.data.data
          console.log(data)
          setAnnounce(() => data.announce)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )

  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const renderButton = (actionMode, manage) => {
    console.log(actionMode, manage)
    if (actionMode === "Preview" && manage === "Announce") {
      return (
        <ImgCrop
          showReset
          aspect={2.63 / 1}
        >
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={handleAddImage}
            onPreview={onPreview}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </ImgCrop>
      )
    }

    if (manage === "Public Course" || manage === "Private Course") {
      if (actionMode === "Preview") {
        return (
          <Button color="primary" onClick={() => setActionMode("Add")} >Add</Button>
        )
      }
      if (actionMode === "Add") {
        return (
          <Button
            type="primary"
            onClick={() => {
              setActionMode("Preview")
              handleUpdateCourse()
            }}>
            Save
          </Button>
        )
      }
    }
  }


  const manageHomeTitle = () => {
    return (
      <Row align={"middle"} justify={"space-between"} >
        <Col>
          <Breadcrumb
            separator={<Title level={5} style={{ marginTop: "10px" }}> {">"} </Title>}
            items={[
              {
                title: <Title level={5} style={{ marginTop: "10px" }}><p >Manage Home</p></Title>,
                key: "courses"
              },
              {
                title: <Title level={5} style={{ marginTop: "10px" }}><p>{manage}</p></Title>,
                key: "courses_create",
              },
            ]}
          />
        </Col>
        <Col style={{ paddingTop: "1px", paddingBottom: "1px", }}>
          <Row>
            {
              renderButton(actionMode, manage)
            }
          </Row>
        </Col>
      </Row >
    )
  }

  async function handleUpdateCourse() {
    // console.log(manage)

    if (manage !== "Public Course" && manage !== "Private Course") return
    if (manageHomeData === coursePublic) return
    if (manageHomeData === coursePrivate) return

    const field = manage === "Public Course" ? "course_public" : manage === "Private Course" ? "course_private" : null
    const courseData = manage === "Public Course" ? coursePublic : manage === "Private Course" ? coursePrivate : null


    await updateCourse(sessionStorage.getItem("token"), { [field]: courseData }, `?field=${field}&fetch=_id,name,enabled,type,image`)
      .then(
        (res) => {
          const data = res.data.data
          if (manage === "Public Course") setCoursePublic(data.course_public)
          if (manage === "Private Course") setCoursePrivate(data.course_private)
          setSaveChange(true)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )

  }

  const handleUnloadImage = (e) => {
    e.target.src = DEFAULT_IMAGE
  }

  async function handleDeleteannounce(index) {
    const length = announce.length
    const prevData = announce.slice(0, index)
    const nextData = announce.slice(index + 1, length)
    const currData = announce[index]

    await updateannounce(sessionStorage.getItem("token"), {
      announce: [...prevData, ...nextData],
      remove: currData
    })
      .then(
        (res) => {
          const data = res.data.data
          console.log(res.data)
          setAnnounce(() => data.announce)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )
  }

  const columnsPreview = [
    {
      title: 'Image',
      dataIndex: 'url',
      align: "center",
      width: "10%",
      render: (data) => {
        return (
          <Image
            width={150}
            src={process.env.REACT_APP_IMG + data}
          />
        )
      }
    },
    {
      title: 'File Name',
      dataIndex: 'original_name',
    },
  ];


  const onDragEnd = async ({ active, over }) => {
    if (active.id !== over?.id) {
      let updatedData = null
      setAnnounce((previous) => {
        const activeIndex = previous.findIndex((i) => i.name === active.id);
        const overIndex = previous.findIndex((i) => i.name === over?.id);
        updatedData = arrayMove(previous, activeIndex, overIndex);
        return updatedData
      });

      if (updatedData) {
        await updateannounce(sessionStorage.getItem("token"), {
          announce: updatedData
        })
          .then(
            (res) => {
              const data = res.data.data
              console.log("update > ", data)
              setAnnounce(() => data.announce)

            }
          )
          .catch(
            (err) => {
              console.log(err)
            }
          )
      }

    }
  };

  const columnsEdit = () => {
    switch (manage) {
      case "Announce":
        return ([
          {
            key: 'sort',
            align: "center",
            width: "5%",
          },
          {
            title: 'Image',
            dataIndex: 'url',
            align: "center",
            width: "10%",
            render: (data) => {
              return (
                <Image
                  width={150}
                  src={process.env.REACT_APP_IMG + data}
                />
              )
            }
          },
          {
            title: 'File Name',
            dataIndex: 'original_name',
          },
          // {
          //   title: 'Edit',
          //   align: "center",
          //   width: "5%",
          //   render: (data) => (
          //     <Button onClick={() => null}>
          //       <EditOutlined style={{ fontSize: "120%" }} />
          //     </Button>
          //   )
          // },
          {
            title: 'Delete',
            align: "center",
            width: "5%",
            render: (data) => (
              <Button onClick={() => handleDeleteannounce(announce.indexOf(data))}>
                <DeleteOutlined style={{ fontSize: "120%" }} />
              </Button>
            )
          },
        ])
      case "Public Course":
      case "Private Course":
        return ([
          // {
          //   key: 'sort',
          //   align: "center",
          //   width: "5%",
          // },
          {
            title: 'Image',
            dataIndex: 'image',
            align: "center",
            width: "10%",
            render: (data) => {
              // console.log(data?.name)
              // if (!data?.url) return
              return (
                <Image
                  width={150}
                  onError={handleUnloadImage}
                  src={data?.name ? `${process.env.REACT_APP_IMG}/course/${data?.name}` : DEFAULT_IMAGE}
                />
              )
            }
          },
          {
            title: "Course",
            dataIndex: 'name',
            key: 'name',
            width: "50%",
          },
          // {
          //   title: "ID",
          //   dataIndex: '_id',
          //   key: '_id',
          // },
          {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            align: "center",
            render: (type) => type === true ? "Public" : "Private",
          },
          {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (status) => status === true ? "Close" : "Open"//"Disable" : "Eanble",
          },
        ])
      default: return null
    }
  }


  useEffect(() => {

    switch (manage) {
      case "Announce":
        console.log(":LKLJKJKH")
        setManageHomeData(() => announce);
        setActionMode("Preview");
        setSaveChange(false)
        break;
      case "Public Course":
        setManageHomeData(() => coursePublic);
        setActionMode("Preview");
        setSaveChange(false)
        break;
      case "Private Course":
        setManageHomeData(() => coursePrivate);
        setActionMode("Preview");
        setSaveChange(false)
        break;
      default:
        setManageHomeData(null);
      // setActionMode("Preview");
    }
    console.log(saveChange)

  }, [announce, manage, saveChange])

  const renderContent = (actionMode, manage) => {
    // console.log(actionMode, manage)
    // console.log(manageHomeData)

    if (actionMode === "Preview") {

      switch (manage) {
        case "Announce":
          return (
            <Col flex={"auto"}>
              {
                announce ?
                  (
                    <DndContext onDragEnd={onDragEnd}>
                      <SortableContext
                        // rowKey array
                        items={announce.map((i) => i.name)}
                        strategy={verticalListSortingStrategy}
                      >
                        <Table
                          components={{
                            body: {
                              row: RowTable,
                            },
                          }}
                          rowKey="name"
                          columns={columnsEdit()}
                          dataSource={announce}
                        />
                      </SortableContext>
                    </DndContext>
                  )
                  :
                  (
                    <Table
                      columns={columnsPreview}
                      dataSource={null}
                    />
                  )
              }
            </Col>
          )
        case "Public Course":
          return (
            <Col flex={"auto"}>
              {
                coursePublic ?
                  (
                    <Table
                      rowKey="name"
                      columns={columnsEdit()}
                      dataSource={coursePublic}
                    />
                  )
                  :
                  (
                    <Table
                      columns={columnsPreview}
                      dataSource={null}
                    />
                  )
              }
            </Col>
          )
        case "Private Course":
          return (
            <Col flex={"auto"}>
              {
                coursePrivate ?
                  (
                    <Table
                      rowKey="name"
                      columns={columnsEdit()}
                      dataSource={coursePrivate}
                    />
                  )
                  :
                  (
                    <Table
                      columns={columnsPreview}
                      dataSource={null}
                    />
                  )
              }
            </Col>
          )
        default:
          return (
            <Col flex={"auto"}>
              <Table
                columns={columnsPreview}
                dataSource={null}
              />
            </Col>
          )
      }

    }
    if (manage === "Public Course" || manage === "Private Course") {
      if (actionMode === "Add") {
        return (
          <Col flex={"auto"}>
            <CourseTable manage={manage} />
          </Col>
        )
      }
    }
  }

  return (
    <Card title={manageHomeTitle()} style={{ width: "100%" }}>
      <Row style={{ width: "100%" }}>
        {
          renderContent(actionMode, manage)
        }
      </Row>
    </Card>

  )
}
export default AdminManageHome