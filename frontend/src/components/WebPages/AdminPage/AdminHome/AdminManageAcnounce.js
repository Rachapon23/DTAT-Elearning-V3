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
import { createAcnounce, createFilePublic, updateAcnounce } from '../../../../function/Admin/adminFunction';
import { AdminContext } from './AdminContext';
import ImgCrop from 'antd-img-crop';

const { Title } = Typography;

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
                  // backgroundColor: "aqua",
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


const AdminManageHome = ({ manage = null }) => {

  const [imageData, setImageData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const { acnounce, setAcnounce } = useContext(AdminContext)
  const { coursePublic, setCoursePublic } = useContext(AdminContext)
  const { coursePrivate, setCoursePrivate } = useContext(AdminContext)

  const [manageHomeData, setManageHomeData] = manage === "Acnounce" ?
    acnounce :
    manage === "Public Course" ?
      coursePublic :
      manage === "Private Course" ?
        coursePrivate : null

  const [actionMode, setActionMode] = useState("Edit")

  const handleAddImage = async (image) => {
    let formData = new FormData()
    console.log(image?.file)
    formData.append("file", image?.file)
    formData.append("original_name", image?.file?.name)
    const createFileField = "acnounce"

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

    await createAcnounce(sessionStorage.getItem("token"), {
      name: imageData?.name,
      original_name: imageData?.original_name,
    })
      .then(
        (res) => {
          const data = res.data.data
          console.log(data)
          setAcnounce(() => data.acnounce)
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

            <ImgCrop
              showReset
              aspect={2.63 / 1}
            // https://www.digitalrebellion.com/webapps/aspectcalc <- use to calculate aspect ratio
            // rotationSlider
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
            {/* <Button color="primary" onClick={() => setActionMode("Preview")}>Save</Button> */}
          </Row>

        </Col>
      </Row >
    )
  }

  async function handleDeleteAcnounce(index) {
    const length = acnounce.length
    const prevData = acnounce.slice(0, index)
    const nextData = acnounce.slice(index + 1, length)
    const currData = acnounce[index]

    await updateAcnounce(sessionStorage.getItem("token"), {
      acnounce: [...prevData, ...nextData],
      remove: currData
    })
      .then(
        (res) => {
          const data = res.data.data
          console.log(res.data)
          setAcnounce(() => data.acnounce)

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
      setAcnounce((previous) => {
        const activeIndex = previous.findIndex((i) => i.name === active.id);
        const overIndex = previous.findIndex((i) => i.name === over?.id);
        updatedData = arrayMove(previous, activeIndex, overIndex);
        return updatedData
      });

      if (updatedData) {
        await updateAcnounce(sessionStorage.getItem("token"), {
          acnounce: updatedData
        })
          .then(
            (res) => {
              const data = res.data.data
              console.log(data)
              setAcnounce(() => data.acnounce)

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

  const columnsEdit = [
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
        <Button onClick={() => handleDeleteAcnounce(acnounce.indexOf(data))}>
          <DeleteOutlined style={{ fontSize: "120%" }} />
        </Button>
      )
    },
  ];

  return (
    <Card title={manageHomeTitle()} style={{ width: "100%" }}>
      <Row style={{ width: "100%" }}>
        <Col flex={"auto"}>
          {
            manageHomeData ?
              (
                <DndContext onDragEnd={onDragEnd}>
                  <SortableContext
                    // rowKey array
                    items={acnounce.map((i) => i.name)}
                    strategy={verticalListSortingStrategy}
                  >
                    <Table
                      components={{
                        body: {
                          row: RowTable,
                        },
                      }}
                      rowKey="name"
                      columns={columnsEdit}
                      dataSource={acnounce}
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
      </Row>
    </Card>

  )
}
export default AdminManageHome