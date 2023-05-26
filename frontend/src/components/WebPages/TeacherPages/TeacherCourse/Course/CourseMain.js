import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuFoldOutlined } from "@ant-design/icons";

import {
  Layout,
  Steps,
  Menu,
  Row,
  theme,
  Radio,
  Card,
  Button,
  Col,
} from "antd";

// Page
import CourseInfo from "./CourseInfo";
import TimeAndRoom from "./TimeAndRoom";
import ManagePlant from "./ManagePlant";
import ContentCourse from "./ContentCourse";
import Finished from "./Finished";

// function Update : PUT
import { updateCourseInfo } from "../../../../../function/Teacher/course_master";
// fucntion : GET
import { getCourse } from "../../../../../function/Teacher/course";
// function :POST
import { updateCoursetimeAndRoom } from "../../../../../function/Teacher/course_master";

import "./course.css";
const { Header, Sider, Content } = Layout;

const CourseMain = () => {
  const [courseType, setCourseType] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [step, setStep] = useState([]);
  const { course_id } = useParams();
  // object
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    detail: "",
    type: courseType,
    image: "",
  });
  const [timeAndroom, setTimeAndRoom] = useState({
    room: "",
    start: "",
    end: "",
    color: "#0288D1",
  });

  const [courseData, setCourseData] = useState({});
  const loadDataCourse = () => {
    getCourse(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        console.log(res);
        setCourseData(res.data.data);
        setCourseType(res.data.data.type);
        setCourseInfo({
          name: res.data.data.name,
          detail: res.data.data.detail,
          type: res.data.data.type,
        });
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  // for load data
  useEffect(() => {
    loadDataCourse();
  }, []);

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

  const items = step.map((item) => ({
    key: item.title,
    title: item.title,
  }));

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

  const renderPageNav = () => {
    return (
      <Row justify={"space-between"} style={{ height: "10%" }}>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              console.log("test");
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
                <Button
                  type="primary"
                  onClick={() => handleDisplay("Finished")}
                >
                  Finished
                </Button>
              ) : (
                <Button type="primary" onClick={() => handleDisplay("Next")}>
                  Next
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
        courseUpdataInfo();
      } else if (currentPage === 1) {
        if (step[1].title === "Time & Room") {
          CourseUpdateTimeAndRoom();
        } 
        else if (step[1].title === "Content") {
        }
      } else if (currentPage === 2) {
        if (step[2].title === "Manage Plant") {
          setCurrentPage(currentPage + 1);
        }
      }
      // setCurrentPage(currentPage + 1);
    } else if (mode === "Previous") {
      if (currentPage - 1 >= 0) {
        setCurrentPage(currentPage - 1);
      }
    } else if (mode === "Finished") {
      // HandleCreateCourse();
    }
  };

  const CourseUpdateTimeAndRoom = () => {
    updateCoursetimeAndRoom(
      sessionStorage.getItem("token"),
      timeAndroom,
      course_id
    )
      .then((res) => {
        // console.log(res);
        setCurrentPage(currentPage + 1);
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const courseUpdataInfo = () => {
    updateCourseInfo(sessionStorage.getItem("token"), courseInfo, course_id)
      .then((res) => {
        // console.log(res);
        setCurrentPage(currentPage + 1);
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  return (
    <Layout className="course-main-layout">
      <Row className="course-main-content">
        <Col flex="auto" style={{ justifyContent: "center" }}>
          <Card title={"Course"} className="card-create">
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

      <Row className="course-main-btn-bottom">
        <Col flex={"auto"}>
          {currentPage < pageList.length ? renderPageNav() : null}
        </Col>
      </Row>
    </Layout>
  );
};

export default CourseMain;
