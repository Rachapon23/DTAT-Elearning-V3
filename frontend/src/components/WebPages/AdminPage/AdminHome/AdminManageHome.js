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
import { createAcnounce, createFilePublic } from '../../../../function/Admin/adminFunction';
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
          zIndex: 9999,
        } : {}
    ),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: 'none',
                  cursor: 'move',
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

const itemPage = [
  {
    key: '1',
    label: `Overview`,
    // children: overviewProgress(),
  },
  {
    key: '2',
    label: `Detailed`,
    // children: detailedProgress(),
  },
];





const AdminManageHome = () => {

  const [imageData, setImageData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const { acnounce, setAcnounce } = useContext(AdminContext)

  const handleAddImage = async (image) => {
    let formData = new FormData()
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
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )

  }

  const [acnounceData, setAcnounceData] = useState({
    _id: null,
    urlImage: null,
    image: null,
    age: null,
  })
  const [dataSource, setDataSource] = useState([
    {
      _id: '1',
      urlImage: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      image: "test1.png",
    },
    {
      _id: '2',
      urlImage: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      image: "test2.png",
    },
    {
      _id: '3',
      urlImage: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      image: "test3.png",
    },
    {
      _id: "4",
      urlImage: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      image: "test4.png",
    },
  ]);

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
                title: <Title level={5} style={{ marginTop: "10px" }}><p>Acnounce</p></Title>,
                key: "courses_create",
              },
            ]}
          />
        </Col>
        <Col style={{ paddingTop: "1px", paddingBottom: "1px", }}>
          <ImgCrop rotationSlider>
            {/* <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}

            > */}
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={handleAddImage}
              onPreview={onPreview}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>

            </Upload>
          </ImgCrop>


        </Col>
      </Row >
    )
  }

  function handleDeleteAcnounce(index) {
    const length = dataSource.length
    const prevData = dataSource.slice(0, index)
    const nextData = dataSource.slice(index + 1, length)
    setDataSource(() => [...prevData, ...nextData])
  }

  const columns = [
    {
      key: 'sort',
      align: "center",
      width: "5%",
    },
    // {
    //   title: 'Order',
    //   width: "5%",
    //   fixed: 'left',
    //   render: (data) => {
    //     return acnounce.indexOf(data) + 1
    //   }
    // },
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
    {
      title: 'Edit',
      align: "center",
      width: "5%",
      render: (data) => (
        <Button onClick={() => null}>
          <EditOutlined style={{ fontSize: "120%" }} />
        </Button>
      )
    },
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


  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setAcnounce((previous) => {
        const activeIndex = previous.findIndex((i) => i.name === active.id);
        const overIndex = previous.findIndex((i) => i.name === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };


  return (
    <Card title={manageHomeTitle()} style={{ width: "100%" }}>
      <Row style={{ width: "100%" }}>
        <Col flex={"auto"}>
          {
            acnounce ?
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
                      columns={columns}
                      dataSource={acnounce}
                    />
                  </SortableContext>
                </DndContext>
              )
              :
              (
                <Table
                  columns={columns}
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