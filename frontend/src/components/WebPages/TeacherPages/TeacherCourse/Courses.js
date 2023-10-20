import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Button,
  Table,
  Breadcrumb,
  Segmented,
  Switch,
} from "antd";
import {
  BarsOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import "./courses.css";
import "../teach.css";
import { Link, useNavigate } from "react-router-dom";
import {
  listCourse,
  removeCourse,
  createCourse,
  updateCourseenabled,
} from "../../../../function/Teacher/course";
const { Title } = Typography;

const Courses = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [hasChanged, setHasChanged] = useState(false);

  // const {courses} = useContext(TeacherCourseContext)
  const [courses, setCourses] = useState(
    null |
    [
      {
        image: {
          original_name: "",
          name: "",
        },
        _id: "",
        condition: [],
        createdAt: "",
        detail: "",
        enabled: null,
        name: "",
        room: "",
        topic: [],
        type: null,
        updatedAt: "",
        video: null,
        calendar: "",
        teacher: "",
        exam: "",
      },
    ]
  );
  const navigate = useNavigate();

  const handleRemoveCourse = async (index) => {
    await removeCourse(sessionStorage.getItem("token"), courses[index]?._id)
      .then((res) => {
        // console.log(res.data.data);
        setHasChanged(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = async (value, id) => {
    await updateCourseenabled(sessionStorage.getItem("token"), id, {
      enabled: value,
    })
      .then((res) => {
        fetchCourse();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Data-Page-Start
  const columns = [
    {
      title: "No",
      // dataIndex: 'key',
      // key: 'key',
      // sorter: (a, b) => a.key - b.key,
      // sortOrder: sortedInfo.columnKey === 'key' ? sortedInfo.order : null,
      // ellipsis: true,
      width: "10%",
      render: (data) => courses.indexOf(data) + 1,
    },
    {
      title: "Course",
      dataIndex: "name",
      key: "name",
      width: "50%",
      // filters: [
      //   {
      //     text: "Joe",
      //     value: "Joe",
      //   },
      //   {
      //     text: "Jim",
      //     value: "Jim",
      //   },
      // ],
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value, record) => record.name.includes(value),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (type === true ? "Public" : "Private"),
      align: "center",
    },
    {
      title: "Status",
      key: "enabled",
      align: "center",
      width: "10%",
      render: (data) => {
        const index = courses.indexOf(data);
        return (
          // <Button onClick={()=>{
          // 	console.log(courses[index]?._id)
          // }}>
          // 	<EditOutlined />
          // </Button>
          <Switch
            checked={courses[index]?.enabled}
            onChange={(value) => {
              onChange(value, courses[index]?._id);
            }}
          />
        );
      },
    },
    {
      title: "Edit",
      key: "edit",
      align: "center",
      width: "10%",
      render: (data) => {
        const index = courses.indexOf(data);
        return (
          <Link to={`/teacher/page/create-course/${courses[index]?._id}`}>
            <Button>
              <EditOutlined />
            </Button>
          </Link>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      align: "center",
      width: "10%",
      render: (data) => {
        const index = courses.indexOf(data);
        return (
          <Button onClick={() => handleRemoveCourse(index)}>
            <DeleteOutlined />
          </Button>
        );
      },
    },
  ];


  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  // const [displayMode, setDisplayMode] = useState("List");
  const handleDisplay = (mode) => {
    // if (!mode) {
    //     mode = displayMode;
    // }
    // else {
    //     setDisplayMode(mode);
    // }
    // switch (mode) {
    //     case "List": setCurrentDisplay(<Table columns={columns} dataSource={courses} onChange={handleChange} />); break;
    //     case "Kanban": setCurrentDisplay(kanbanDisplay); break;
    //     default: setCurrentDisplay(<Table columns={columns} dataSource={courses} onChange={handleChange} />);
    // }
  };


  // Sub-Component-Page-Start
  const myCoursesTitle = () => {
    return (
      <Row align={"middle"} justify={"space-between"}>
        <Col>
          {/* <p style={{ marginTop: "10px" }}>List Course</p> */}
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
                    <p>Course</p>
                  </Title>
                ),
                key: "courses",
              },
              {
                title: (
                  <Title level={5} style={{ marginTop: "10px" }}>
                    <p>List Course</p>
                  </Title>
                ),
                key: "courses_list",
              },
            ]}
          />
        </Col>
        <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
          <Button onClick={CreateCourseEmpty}>Create</Button>
        </Col>
      </Row>
    );
  };

  const CreateCourseEmpty = () => {
    createCourse(sessionStorage.getItem("token"))
      .then((res) => {
        navigate(`/teacher/page/create-course/${res.data.data._id}`);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);

        // alert for user
        alert(err.response.data.error);
      });
  };

  const renderDisplay = () => {
    return (
      <Table columns={columns} dataSource={courses} onChange={handleChange} />
    );
  };

  // Page-Conttoller-Start
  // const cardData = (
  //     <div style={{ paddingTop: "1%" }}>
  //         <Card
  //             hoverable
  //             style={{
  //                 width: "450px",
  //             }}
  //             cover={<img alt="example" src="/book-main-img-3.png" />}
  //         >
  //             <Meta title="Course" description="This is a description of a course" />
  //         </Card>
  //     </div>
  // )
  // const arrayCrad = [cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData]
  // const kanbanDisplay = (
  //     <div className="row">
  //         {
  //             arrayCrad.map((card) => card)
  //         }
  //     </div>
  // );

  const fetchCourse = async () => {
    await listCourse(sessionStorage.getItem("token"))
      .then((res) => {
        const data = res.data.data;
        // console.log(data);
        setCourses(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourse();
    // renderDisplay()
    return () => {
      setHasChanged(false);
    };
  }, [hasChanged]);

  return (
    <Layout
      className="layout-content-card"
    >
      <Row>
        <Col
          flex="auto" style={{ justifyContent: "center" }}>

          <Card title={myCoursesTitle()} className="card-shadow" style={{ maxWidth: "100%" }}>
            <Row justify="space-between" style={{ marginBottom: "1%" }}>
              <Col>
                <Segmented
                  defaultValue={"List"}
                  options={[
                    {
                      label: "List",
                      value: "List",
                      icon: <BarsOutlined />,
                      disabled: true
                    },
                    // {
                    // 	label: "Kanban",
                    // 	value: "Kanban",
                    // 	icon: <AppstoreOutlined />,
                    // },
                  ]}
                  onChange={handleDisplay}
                />
              </Col>
            </Row>
            <Row justify="center">
              <Col flex={"auto"} style={{ width: "2000px" }}>
                {renderDisplay()}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Courses;
