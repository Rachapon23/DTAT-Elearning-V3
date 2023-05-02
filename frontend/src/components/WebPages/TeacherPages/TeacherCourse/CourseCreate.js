import React, { useEffect } from "react";
import {
  InfoCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
  BorderOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Layout,
  Row,
  Tooltip,
  Button,
  Input,
  Typography,
  Table,
  Breadcrumb,
  Steps,
  Form,
  Radio,
  Upload,
  message,
  Image,
  Select,
  Calendar,
  Empty,
  Tree,
  Result,
} from "antd";
import NavBar from "../../../Layout/NavBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import AntdImgCrop from "antd-img-crop";

import "../teach.css";

const { Title } = Typography;
const { TextArea } = Input;


// ==============================================================================================================================================================================
// NOTE: ส่วนของการสร้างเนื้อหา (Content) ยังไม่สมบูรณ์
// ==============================================================================================================================================================================

const Coursecreate = () => {
  // Variable-Start
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const [courseType, setCoursetype] = useState("Public");
  const [publicType, setPublicType] = useState(true);
  // Variable-End -------------------------------------------------------------------------------------------------------------------------------------------------------------


  // Data for request //
  const [topic, SetTopic] = useState([]);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    detail: "",
    room: "",
    type: true,
    video: "",
    image: "",
    teacher: "",
  });

  // Function add topic
  const handleAddTopic = () => {
    SetTopic([
      ...topic,
      {
        title: "",
        detail: "",
        sub: [],
        link: [],
        file: [],
      },
    ]);
  };

const [coverIMG,setCoverImg] = useState("")
  // Images Cover //
const hadleCoverImg = (e) =>{
    setCoverImg(e.target.files[0])
}


  // Function for info
  const hadleChangeInfo = (e) => {
    setCourseInfo((courseInfo) => ({
      ...courseInfo,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name,e.target.value)
    // console.log(nameCourse)
  };

  // Function Create Course
  const HandleCreateCourse = () => {
    console.log("Submit --");
    setCurrentPage(pageList.length - 1);
  };

  // Data-Page-Start
  const steps = [
    {
      title: "Course Info",
      content: "First-content",
    },
    {
      title: "Time & Room",
      content: "Second-content",
    },
    {
      title: "Manage Plant",
      content: "Second-content",
    },
    {
      title: "Content",
      content: "Last-content",
    },
  ];

  const stepItems = steps.map((item) => {
    if (courseType === "Private") {
      return {
        key: item.title,
        title: item.title,
      };
    }
    if (item.title !== "Time & Room" && item.title !== "Manage Plant") {
      return {
        key: item.title,
        title: item.title,
      };
    }
  });

  const plantCol = [
    {
      title: "Plant",
      dataIndex: "plant",
      key: "name",
      align: "center",
      children: [
        {
          title: <Select></Select>,
          dataIndex: "plant",
          key: "name",
          width: "40%",
        },
      ],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      children: [
        {
          title: <Input type="number"></Input>,
          dataIndex: "amount",
          key: "amount",
          width: "30%",
        },
      ],
    },
    {
      title: "Action",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      children: [
        {
          title: <Button style={{ width: "100%" }}>Add</Button>,
          dataIndex: "action",
          key: "action",
          width: "12%",
          align: "center",
        },
      ],
    },
  ];

  // Data-Page-End ------------------------------------------------------------------------------------------------------------------------------------------------------------

  // Data-Mockup-Start
  //   const [fileList, setFileList] = useState([
  //     {
  //       uid: "-1",
  //       name: "xxx.png",
  //       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //     },
  //   ]);

  const plantData = [
    {
      key: "A",
      plant: "A",
      amount: 5,
      action: (
        <Row align={"middle"} justify={"space-around"}>
          <Col>
            <EditTwoTone style={{ fontSize: 20 }} />
          </Col>
          <Col>
            <DeleteTwoTone style={{ fontSize: 20 }} />
          </Col>
        </Row>
      ),
    },
    {
      key: "B",
      plant: "B",
      amount: 5,
      action: (
        <Row align={"middle"} justify={"space-around"}>
          <Col>
            <EditTwoTone style={{ fontSize: 20 }} />
          </Col>
          <Col>
            <DeleteTwoTone style={{ fontSize: 20 }} />
          </Col>
        </Row>
      ),
    },
    {
      key: "C",
      plant: "C",
      amount: 5,
      action: (
        <Row align={"middle"} justify={"space-around"}>
          <Col>
            <EditTwoTone style={{ fontSize: 20 }} />
          </Col>
          <Col>
            <DeleteTwoTone style={{ fontSize: 20 }} />
          </Col>
        </Row>
      ),
    },
    {
      key: "D",
      plant: "D",
      amount: 5,
      action: (
        <Row align={"middle"} justify={"space-around"}>
          <Col>
            <EditTwoTone style={{ fontSize: 20 }} />
          </Col>
          <Col>
            <DeleteTwoTone style={{ fontSize: 20 }} />
          </Col>
        </Row>
      ),
    },
    {
      key: "E",
      plant: "E",
      amount: 5,
      action: (
        <Row align={"middle"} justify={"space-around"}>
          <Col>
            <EditTwoTone style={{ fontSize: 20 }} />
          </Col>
          <Col>
            <DeleteTwoTone style={{ fontSize: 20 }} />
          </Col>
        </Row>
      ),
    },
  ];

  const roomOptions = [
    {
      label: "Floor 1",
      options: [
        {
          label: "A",
          value: "A",
        },
        {
          label: "B",
          value: "B",
        },
      ],
    },
    {
      label: "Floor 2",
      options: [
        {
          label: "C",
          value: "C",
        },
        {
          label: "D",
          value: "D",
        },
      ],
    },
  ];

  const [gData, setGdata] = useState({
    key1: {
      title: (
        <Row align={"middle"} justify={"space-between"}>
          <Col style={{ width: "100%" }}>
            <Input></Input>
          </Col>
        </Row>
      ),
      key: "1",
    },
    key2: {
      title: (
        <Row align={"middle"} justify={"space-between"}>
          <Col style={{ width: "100%" }}>
            <Input></Input>
          </Col>
        </Row>
      ),
      key: "2",
    },
    key3: {
      title: (
        <Row align={"middle"} justify={"space-between"}>
          <Col style={{ width: "100%" }}>
            <Input></Input>
          </Col>
        </Row>
      ),
      key: "3",
    },
  });
  // Data-Mockup-End ----------------------------------------------------------------------------------------------------------------------------------------------------------

  // Function-Start
  //   const onChange = ({ fileList: newFileList }) => {
  //     setFileList(newFileList);
  //   };

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onDrop = (info) => {
    if (info) {
      const dropKey = info.node.key;
      const dragKey = info.dragNode.key;
      const dropPos = info.node.pos;

      const dropData = gData[`key${dropKey}`];
      const dragData = gData[`key${dragKey}`];
      console.log(dropData, dragData);

      setGdata({
        ...gData,
        [`key${dragKey}`]: dropData,
        [`key${dropKey}`]: dragData,
      });

      console.log(dropKey, dragKey, dropPos);
    }
    setGdata(gData);
  };

  const handleCreateContent = () => {
    setCardContentList([...cardContentList, cardContent]);
  };

  const handleDisplay = (mode) => {
    if (mode) {
      if (mode.target.innerText === "Next") {
        setCurrentPage(currentPage + 1);
      } else if (mode.target.innerText === "Previous") {
        if (currentPage - 1 >= 0) {
          setCurrentPage(currentPage - 1);
        }
      } else if (mode.target.innerText === "Create") {
        HandleCreateCourse();
      }
    }
    setCurrentDisplay(pageList[currentPage]);
  };

  const handleChangeType = (e) => {
    switch (e.target.value) {
      case "Public":
        setPublicType(true);
        setCourseInfo((courseInfo) => ({
          ...courseInfo,
          ["type"]: true,
        }));

        break;
      case "Private":
        setPublicType(false);
        setCourseInfo((courseInfo) => ({
          ...courseInfo,
          ["type"]: false,
        }));
        break;
      default:
        setPublicType(true);
    }
    setCoursetype(e.target.value);
  };
  // Function-End -------------------------------------------------------------------------------------------------------------------------------------------------------------

  // Sub-Component-Page-Start
  const tooltipCourseType = () => {
    return (
      <Tooltip>
        <Row>
          <Col>{"Public: can study without enroll"}</Col>
          <Col>{"Private: must enroll before study"}</Col>
        </Row>
      </Tooltip>
    );
  };

  const managePlant = (
    <Form
      style={{ paddingTop: "2%" }}
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Row>
        <Col style={{ width: "100%" }}>
          {/* <Form.Item label="Teach Time" required tooltip="This is a required field">
                        <RangePicker></RangePicker>
                    </Form.Item> */}

          <Form.Item
            label="Manage Plant"
            required
            tooltip={{
              title: "Tooltip with customize icon",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Table
              dataSource={plantData}
              columns={plantCol}
              pagination={{ pageSize: 4 }}
              size="middle"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const timeNroom = (
    <Form
      style={{ paddingTop: "2%" }}
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Row align={"middle"}>
        <Col style={{ height: "350px", width: "100%" }}>
          <Form.Item label="Teach Time" required>
            <Calendar fullscreen={false} />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item label="Room" required>
            <Select options={roomOptions} />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Card>
            <Row align={"middle"} justify={"space-between"}>
              <Col style={{ width: "45%" }}>
                <Row justify={"start"}>
                  <Col>Color:</Col>
                  <Col
                    style={{
                      width: "7%",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    {
                      <BorderOutlined
                        style={{
                          backgroundColor: "red",
                          color: "red",
                          fontSize: 20,
                        }}
                      />
                    }
                  </Col>
                </Row>
                <Row style={{ paddingTop: "1%" }}>
                  <Col>Room: C</Col>
                </Row>
                <Row style={{ paddingTop: "1%" }}>
                  <Col>Since: 23/03/2023 to 24/03/2023</Col>
                </Row>
              </Col>
              <Col>
                <Button>Delete</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );

  const OnFF = (va) => {
    console.log("Finish", va);
  };

  const courseInformation = (
    <Form
      style={{ paddingTop: "2%" }}
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
      onFinish={OnFF}
    >
      <Row>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Course Name"
            required
            tooltip="This is a required field"
            name={"name"}
          >
            <Input
              placeholder="input placeholder"
              name="name"
              onChange={hadleChangeInfo}
            />
          </Form.Item>

<<<<<<< HEAD
    const cardContent = (

        <Row justify={"center"}>
            <Col style={{ width: "100%" }}>
                <Card >
                    <Row justify={"center"} align={"middle"}>
                        <Col style={{ width: "90%", paddingRight: "2%" }} >
                            <Row>
                                <Col flex={"auto"}>
                                    <Form.Item label="Topic" tooltip="This is a required field">
                                        <Input placeholder="input placeholder" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col flex={"auto"}>
                                    <Form.Item label="Detail">
                                        <TextArea
                                            showCount
                                            maxLength={250}
                                            style={{ height: 120 }}
                                            onChange={onChange}
                                            placeholder="can resize"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{ width: "10%", display: "flex", justifyContent: "center" }}>

                            <Card style={{ height: "200px", display: "flex" }}>
                                <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
                                    <Col flex={"auto"}>
                                        <Row justify={"center"} >
                                            <Button type="text">Sub</Button>
                                        </Row>
                                        <Row justify={"center"}>
                                            <Button type="text">Link</Button>
                                        </Row>
                                        <Row justify={"center"}>
                                            <Button type="text">File</Button>
                                        </Row>
                                    </Col>
                                </Row>

                            </Card>

                        </Col>
                    </Row>
                    {renderCardExtarField()}
                </Card>
            </Col>
        </Row>
    )

    const courseCreateTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >
                <Col>
                    <Breadcrumb
                        separator={<Title level={5} style={{ marginTop: "15px" }}> {">"} </Title>}
                        items={[
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p >Courses</p></Title>,
                                key: "courses"
                            },
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p>Create Course</p></Title>,
                                key: "courses_create",
                            },
                        ]}
                    />
                    {/* <Title level={5} style={{ marginTop: "10px" }}>Create Course</Title> */}
                </Col>
                <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
                    <Link to="/teacher/page/listcourse">
                        <Button>
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
        )
    }

    const cardEmptyContent = (
        <Card>
            <Row justify={"center"}>
                <Col>
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        // style={{height: "100%"}}
                        description={
                            <span>
                                No Content
                            </span>
                        }
                    >
                        <Button type="primary" onClick={handleCreateContent}>Create Now</Button>
                    </Empty>
                </Col>
            </Row>
        </Card >
    )

    const courseCreateFinished = (
        <Row align={"middle"} justify={"center"} style={{ height: "400px" }}>
            <Col >
                <Result
                    status="success"
                    title="Successfully Purchased Cloud Server ECS!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Link to="/teacher/page/listcourse">
                            <Button type="primary" key="console">
                                Back To My Courses
                            </Button>
                        </Link>,
                        // <Button key="buy">Buy Again</Button>,
                    ]}
                />
            </Col>
        </Row>
    )

    const renderDisplay = () => {
        return currentDisplay
    }

    const renderPageNav = () => {
        return (
            <Row justify={"space-between"} style={{ height: "10%", }}>
                <Col>
                    <Button> Preview</Button>
                </Col>

                <Col>
                    <Row>
                        <Col style={{ paddingRight: "10px", }}>
                            <Button onClick={handleDisplay}>Previous</Button>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={handleDisplay}>{currentPage === pageList.length - 1 ? "Done" : "Next"}</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    // Sub-Component-Page-End ---------------------------------------------------------------------------------------------------------------------------------------------------



    // Page-Conttoller-Start
    const [cardContentList, setCardContentList] = useState([cardContent, cardContent])
    const courseContent = (
        <Form
            style={{ paddingTop: "2%" }}
            form={form}
            layout="vertical"
            initialValues={{
                requiredMarkValue: requiredMark,
=======
          <Form.Item
            label="Detail"
            name={"detail"}
            required
            tooltip={{
              title: "Tooltip with customize icon",
              icon: <InfoCircleOutlined />,
>>>>>>> 51578a0dc819e15a58a1a4bc6620e9c2ede8c33e
            }}
          >
            <TextArea
              showCount
              maxLength={250}
              style={{ height: 120 }}
              // onChange={onChange}
              placeholder="can resize"
              name="detail"
              onChange={hadleChangeInfo}
            />
          </Form.Item>

          <Form.Item label="Course Type" required tooltip={tooltipCourseType()}>
            <Radio.Group defaultValue={courseType} buttonStyle="solid">
              <Radio.Button value="Public" onChange={handleChangeType}>
                Public
              </Radio.Button>
              <Radio.Button value="Private" onChange={handleChangeType}>
                Private
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Cover Image">
            <Row justify={"space-between"}>
              <Col style={{ width: "100%" }}>
               {/* input HTML form */}
                <input type="file" onChange={hadleCoverImg}/>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const renderCardExtarField = () => {
    return (
      <Row>
        <Col style={{ width: "88%" }}>
          {/* {console.log(Object.values(gData))} */}
          <Tree
            className="draggable-tree"
            draggable
            blockNode
            onDrop={onDrop}
            treeData={Object.values(gData)}
          />
        </Col>
      </Row>
    );
  };

  const cardContent = (
    <Row justify={"center"}>
      <Col style={{ width: "100%" }}>

        <Card>
          <Row justify={"center"} align={"middle"}>
            <Col style={{ width: "90%", paddingRight: "2%" }}>
              <Row>
                <Col flex={"auto"}>
                  <Form.Item label="Topic" tooltip="This is a required field">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col flex={"auto"}>
                  <Form.Item label="Detail">
                    <TextArea
                      showCount
                      maxLength={250}
                      style={{ height: 120 }}
                      //   onChange={onChange}
                      placeholder="can resize"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col
              style={{
                width: "10%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card style={{ height: "200px", display: "flex" }}>
                <Row
                  align={"middle"}
                  justify={"center"}
                  style={{ height: "100%" }}
                >
                  <Col flex={"auto"}>
                    <Row justify={"center"}>
                      <Button type="text">Sub</Button>
                    </Row>
                    <Row justify={"center"}>
                      <Button type="text">Link</Button>
                    </Row>
                    <Row justify={"center"}>
                      <Button type="text">File</Button>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {/* {renderCardExtarField()} */}
        </Card>

      </Col>
    </Row>
  );

  const courseCreateTitle = () => {
    return (
      <Row align={"middle"} justify={"space-between"}>
        <Col>
          <Breadcrumb
            separator={
              <Title level={5} style={{ marginTop: "10px" }}>
                {" "}
                {">"}{" "}
              </Title>
            }
            items={[
              {
                title: (
                  <Title level={5} style={{ marginTop: "10px" }}>
                    <p>My Courses</p>
                  </Title>
                ),
                key: "courses",
              },
              {
                title: (
                  <Title level={5} style={{ marginTop: "10px" }}>
                    <p>Create Course</p>
                  </Title>
                ),
                key: "courses_create",
              },
            ]}
          />
          {/* <Title level={5} style={{ marginTop: "10px" }}>Create Course</Title> */}
        </Col>
        <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
          <Link to="/teacher/page/listcourse">
            <Button>Back</Button>
          </Link>
        </Col>
      </Row>
    );
  };

  const cardEmptyContent = (
    <Card>
      <Row justify={"center"}>
        <Col>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            // style={{height: "100%"}}
            description={<span>No Content</span>}
          >
            <Button type="primary" onClick={handleCreateContent}>
              Create Now
            </Button>
          </Empty>
        </Col>
      </Row>
    </Card>
  );

  const courseCreateFinished = (
    <Row align={"middle"} justify={"center"} style={{ height: "400px" }}>
      <Col>
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Link to="/teacher/page/listcourse">
              <Button type="primary" key="console">
                Back To My Courses
              </Button>
            </Link>,
            // <Button key="buy">Buy Again</Button>,
          ]}
        />
      </Col>
    </Row>
  );

  const renderDisplay = () => {
    return currentDisplay;
  };

  const renderPageNav = () => {
    return (
      <Row justify={"space-between"} style={{ height: "10%" }}>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
                console.log(courseInfo)
                console.log(coverIMG)
            }}
          >
            {" "}
            Preview
          </Button>
        </Col>

        <Col>
          <Row>
            <Col style={{ paddingRight: "10px" }}>
              <Button onClick={handleDisplay}>Previous</Button>
            </Col>
            <Col>
              <Button type="primary" onClick={handleDisplay}>
                {currentPage === pageList.length - 2 ? "Create" : "Next"}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  // Sub-Component-Page-End ---------------------------------------------------------------------------------------------------------------------------------------------------

  // Page-Conttoller-Start
  const [cardContentList, setCardContentList] = useState([
    // cardContent,
    cardContent,
  ]);
  const courseContent = (
    <Form
      style={{ paddingTop: "2%" }}
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Row justify={"center"}>
        {/* <Col style={{ width: "5%" }} /> */}
        <Col style={{ width: "95%" }}>
          <Row style={{ paddingTop: "1%" }}>
            <Col flex="auto">
              {cardContentList.length === 0
                ? cardEmptyContent
                : cardContentList.map((card) => card)}
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
  const pageList =
    courseType === "Private"
      ? [
          courseInformation,
          timeNroom,
          managePlant,
          courseContent,
          courseCreateFinished,
        ]
      : [courseInformation, courseContent, courseCreateFinished];

  const [currentDisplay, setCurrentDisplay] = useState(pageList[0]);
  const [currentPage, setCurrentPage] = useState(0);
  // Page-Conttoller-End ------------------------------------------------------------------------------------------------------------------------------------------------------

  // Use Effect-Start
  useEffect(() => {
    handleDisplay();
    renderCardExtarField();
  }, [currentPage, cardContentList, gData, courseType]);
  // Use Effect-End -----------------------------------------------------------------------------------------------------------------------------------------------------------

  // console.log(pageList.length)
  return (
    <Layout className="layout-content-create">
      {/* <NavBar page={"Courses"} /> */}
      <Row className="content">
        <Col flex="auto" style={{ justifyContent: "center" }}>
          <Card title={courseCreateTitle()} className="card-create">
            {/* <Row justify="space-between" >
                        </Row> */}
            <Row>
              <Steps items={stepItems} current={currentPage} />
            </Row>
            <Row
              className="row-con"
              justify="center"
              style={{ paddingTop: "1%" }}
            >
              <Col flex={"auto"} className="col-con">
                {renderDisplay()}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="btn-bottom">
        <Col flex={"auto"}>
          {currentPage < pageList.length - 1 ? renderPageNav() : null}
        </Col>
      </Row>
    </Layout>
  );
};

export default Coursecreate;
