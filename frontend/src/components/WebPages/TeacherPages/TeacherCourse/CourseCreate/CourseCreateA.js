import React, { useEffect, useRef, useCallback, useMemo } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  SearchOutlined,
  BarsOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  PictureOutlined,
  UpOutlined,
  DownOutlined,
  PlusSquareOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Layout,
  Menu,
  Row,
  theme,
  Avatar,
  Divider,
  Tooltip,
  Progress,
  Tabs,
  Button,
  Pagination,
  Input,
  Typography,
  Table,
  Segmented,
  Badge,
  Alert,
  Breadcrumb,
  Steps,
  Form,
  Radio,
  Image,
  Empty,
  Affix,
  Result,
} from "antd";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../../teach.css";
import { Spin } from "antd";

// Page
import CourseInfo from "./CourseInfo";
import TimeAndRoom from "./TimeAndRoom";
import ManagePlant from "./ManagePlant";
import ContentCourse from "./Content";
import Finished from "./Finished";
// function
import { createCourse } from "../../../../../function/Teacher/course";
import { timeAndRoom } from "../../../../../function/Teacher/timeAndroom";

// import NavBar from "../../../Layout/NavBar"
// import CardContent from "./CardContent";

const { Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

function CourseCreateA() {
  const [currentPage, setCurrentPage] = useState(0);
  const [courseType, setCourseType] = useState(true);
  const [step, setStep] = useState([]);
  const [idCourse, setIdCourse] = useState("");

  // Data for request //
  const [topic, SetTopic] = useState([]);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    detail: "",
    type: true,
    teacher: sessionStorage.getItem("user_id"),
  });
  const [timeAndroom, setTimeAndRoom] = useState({
    room: "",
    start: "",
    end: "",
    color: "",
  });

  const [statusLoading, setStatusLoading] = useState(false);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
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
                    <p>Course</p>
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
        </Col>
        <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
          <Link to="/teacher/page/list-course">
            <Button>Back</Button>
          </Link>
        </Col>
      </Row>
    );
  };

  const pageList = courseType
    ? [
        <CourseInfo
          courseType={courseType}
          setCourseType={setCourseType}
          courseInfo={courseInfo}
          setCourseInfo={setCourseInfo}
        />,
        <ContentCourse />,
        <Finished />,
      ]
    : [
        <CourseInfo
          courseType={courseType}
          setCourseType={setCourseType}
          courseInfo={courseInfo}
          setCourseInfo={setCourseInfo}
        />,
        <TimeAndRoom
          timeAndroom={timeAndroom}
          setTimeAndRoom={setTimeAndRoom}
        />,
        <ManagePlant />,
        <ContentCourse />,
        <Finished />,
      ];

  const [currentDisplay, setCurrentDisplay] = useState(pageList);

  const items = step.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const renderPageNav = () => {
    return (
      <Row justify={"space-between"} style={{ height: "10%" }}>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              console.log("courseInfo");
              console.log("coverIMG");
            }}
          >
            {" "}
            Preview
          </Button>
        </Col>

        <Col>
          <Row>
            <Col style={{ paddingRight: "10px" }}>
              <Button onClick={() => handleDisplay("Previous")}>
                Previous
              </Button>
            </Col>
            <Col>
              {currentPage === pageList.length - 2 ? (
                <Button type="primary" onClick={() => handleDisplay("Create")}>
                  Create
                </Button>
              ) : (
                <Button type="primary" onClick={() => handleDisplay("Next")}>
                  {statusLoading ? <Spin indicator={antIcon} /> : "Next"}
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const handleDisplay = (mode) => {
    if (mode === "Next") {
      if (currentPage === 0) {
        setStatusLoading(true);
        CreateCourse();
      }
      else if (step[1].title === "Time & Room"){
        setStatusLoading(true);
        updateCourseWithTimeAndRoom()
      }
      // setCurrentPage(currentPage + 1);
    } else if (mode === "Previous") {
      if (currentPage - 1 >= 0) {
        setCurrentPage(currentPage - 1);
      }
    } else if (mode === "Create") {
      // HandleCreateCourse();
    }

    // setCurrentDisplay(pageList[currentPage]);
  };
  useEffect(() => {
    courseType
      ? setStep([
          {
            title: "Course Info",
            content: "First-content",
          },
          {
            title: "Content",
            content: "second-content",
          },
          {
            title: "Finished",
            content: "Last-content",
          },
        ])
      : setStep([
          {
            title: "Course Info",
            content: "First-content",
          },
          {
            title: "Time & Room",
            content: "second-content",
          },
          {
            title: "Manage Plant",
            content: "third-content",
          },
          {
            title: "Content",
            content: "fourth-content",
          },
          {
            title: "Finished",
            content: "Last-content",
          },
        ]);
    setCurrentDisplay(pageList);
  }, [courseType]);

  const CreateCourse = () => {
    createCourse(sessionStorage.getItem("token"), courseInfo)
      .then((res) => {
        console.log(res);
        setStatusLoading(false);
        setIdCourse(res.data.data._id);
        setCurrentPage(currentPage + 1);
      })
      .catch((err) => {
        console.log(err);
        setStatusLoading(false);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const updateCourseWithTimeAndRoom = () =>{
    timeAndRoom(sessionStorage.getItem("token"),idCourse,timeAndroom)
    .then((res) => {
      console.log(res);
      setStatusLoading(false);
      setCurrentPage(currentPage + 1);
    })
    .catch((err) => {
      console.log(err);
      setStatusLoading(false);
      // alert for user
      alert(err.response.data.error);
    });

  }
  return (
    <Layout className="layout-content-create">
      <Row className="content">
        <Col flex="auto" style={{ justifyContent: "center" }}>
          <Card title={courseCreateTitle()} className="card-create">
            <Row justify="space-between"></Row>
            <Row>
              <Steps items={items} current={currentPage} />
            </Row>
            <Row
              className="row-con"
              justify="center"
              style={{ paddingTop: "1%" }}
            >
              <Col flex={"auto"} className="col-con">
                {currentDisplay[currentPage]}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {timeAndroom.start !== "" && currentPage === 1 ? (
        <Card
          style={{
            marginTop: "10px",
          }}
        >
          <Row>
            <Col span={6}>
              <p>start : {timeAndroom.start}</p>
            </Col>
            <Col span={6}>
              <p>end : {timeAndroom.end}</p>
            </Col>
            <Col span={6}>
              <Row>
                <p>color : </p>
                <div
                  style={{
                    marginLeft: "5px",
                    borderRadius: "5px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: timeAndroom.color,
                  }}
                ></div>
              </Row>
            </Col>
            <Col span={6}>
              <Button
                onClick={() => {
                  setTimeAndRoom({
                    start: "",
                    end: "",
                    color: "",
                  });
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Card>
      ) : (
        <></>
      )}

      <Row className="btn-bottom">
        <Col flex={"auto"}>
          {currentPage < pageList.length ? renderPageNav() : null}
        </Col>
      </Row>
      <button
        className="btn btn-info mt-5"
        onClick={() => {
          console.log(timeAndroom);
        }}
      >
        INfo
      </button>
    </Layout>
  );
}

export default CourseCreateA;
