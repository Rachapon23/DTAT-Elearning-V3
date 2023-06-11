import React from "react";
import { useState, useEffect, useContext } from "react";

// import Page
import Course_info from "./Course_info";
import Course_Room from "./Course_Room";
import Course_condition from "./Course_condition";
import Course_topic from "./Course_topic";
import Course_finished from "./Course_finished";

import "./CourseManage.css";
// ant
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
  ColorPicker,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
//course Context
import { CourseContext } from "./CourseContext";
import { debounce } from "lodash";
// fucntion : GET
import { getCourse } from "../../../../../function/Teacher/course";

// fucntion : POST
import { createFile } from "../../../../../function/Teacher/course_update";
// fucntion : PUT
import { updateCalendar } from "../../../../../function/Teacher/calendar";
// fucntion : DELETE
import { deleteCalendar } from "../../../../../function/Teacher/calendar";

//momentJS
import moment from "moment";
import "moment/locale/th";
import Course_topic_children from "./Course_topic_children";
moment.locale("th");

const Course_main = () => {
  const {
    loadDataCourse,
    loadTopic,
    topicData,
    course_id,
    courseData,
    loadCalendar,
    even,
  } = useContext(CourseContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [step, setStep] = useState([]);
  const [nextState, setNextState] = useState([]);
  const pageList = courseData?.type
    ? [<Course_info />, <Course_topic />, <Course_finished />]
    : [
        <Course_info />,
        <Course_Room />,
        <Course_condition />,
        <Course_topic />,
        <Course_finished />,
      ];

  const [currentDisplay, setCurrentDisplay] = useState(pageList);

  useEffect(() => {
    courseData?.type
      ? setStep([
          {
            title: "Course Info",
            content: "First-content",
          },
          {
            title: "topic",
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
            title: "topic",
            content: "fourth-content",
          },
          {
            title: "Finished",
            content: "Last-content",
          },
        ]);
    setCurrentDisplay(pageList);
  }, [courseData?.type]);

  const renderPageNav = () => {
    return (
      <Row justify={"space-between"} style={{ height: "10%" }}>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              console.log(courseData);
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
                <>
                  {currentPage === pageList.length - 1 ? (
                    <></>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => handleDisplay("Next")}
                    >
                      Next
                    </Button>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const handleDisplay = (mode) => {
    if (mode === "Next") {
      setCurrentPage(currentPage + 1);
    } else if (mode === "Previous") {
      if (currentPage - 1 >= 0) {
        setCurrentPage(currentPage - 1);
      }
    } else if (mode === "Finished") {
      setCurrentPage(currentPage + 1);
    }
  };

  const items = step.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onChangeColor = (e) => {
    updateCalendar(sessionStorage.getItem("token"), courseData?.calendar?._id, {
      start: courseData?.calendar?.start,
      end: courseData?.calendar?.end,
      color: e.toHexString(),
    })
      .then((res) => {
        loadDataCourse();
        loadCalendar();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };
  const handleRemoveCalendar = () => {
    deleteCalendar(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        loadDataCourse();
        loadCalendar();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };
  const debounceOnChange = debounce(onChangeColor, 200);

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

      {courseData?.calendar !== null &&
      step[1]?.title === "Time & Room" &&
      currentPage === 1 ? (
        <Row className="course-main-for-calendar">
          <Card className="card-calendar">
            <Row justify="center">
              <Col className="col-card-calendar" span={6}>
                start :{" "}
                {moment(courseData?.calendar?.start?.substring(0, 10)).format(
                  "LL"
                )}
              </Col>
              <Col className="col-card-calendar" span={6}>
                end :{" "}
                {moment(courseData?.calendar?.end?.substring(0, 10)).format(
                  "LL"
                )}
              </Col>
              <Col className="col-card-calendar" span={6}>
                <ColorPicker
                  onChange={debounceOnChange}
                  value={courseData?.calendar?.color}
                  presets={[
                    {
                      label: "Recommended",
                      colors: [
                        "#000000",
                        "#000000E0",
                        "#000000A6",
                        "#00000073",
                        "#00000040",
                        "#00000026",
                        "#0000001A",
                        "#00000012",
                        "#0000000A",
                        "#00000005",
                        "#F5222D",
                        "#FA8C16",
                        "#FADB14",
                        "#8BBB11",
                        "#52C41A",
                        "#13A8A8",
                        "#1677FF",
                        "#2F54EB",
                        "#722ED1",
                        "#EB2F96",
                        "#F5222D4D",
                        "#FA8C164D",
                        "#FADB144D",
                        "#8BBB114D",
                        "#52C41A4D",
                        "#13A8A84D",
                        "#1677FF4D",
                        "#2F54EB4D",
                        "#722ED14D",
                        "#EB2F964D",
                      ],
                    },
                  ]}
                />
              </Col>
              <Col className="col-card-calendar" span={6}>
                <Button onClick={handleRemoveCalendar}>
                  <DeleteOutlined />
                </Button>
              </Col>
            </Row>
          </Card>
        </Row>
      ) : (
        <></>
      )}

      {courseData.type === true ? (
        <>
          {topicData.length !== 0 &&
          step[1]?.title === "topic" &&
          currentPage === 1 ? (
            <>
              {topicData.map((item, index) => (
                <Course_topic_children
                  nextState={nextState}
                  setNextState={setNextState}
                  key={item._id}
                  item={item}
                  index={index}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {topicData.length !== 0 &&
          step[3]?.title === "topic" &&
          currentPage === 3 ? (
            <>
              {topicData.map((item, index) => (
                <Course_topic_children
                  nextState={nextState}
                  setNextState={setNextState}
                  key={item._id}
                  item={item}
                  index={index}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      )}

      {/* {topicData.length !== 0 &&
      (step[3]?.title === "topic" || step[1]?.title === "topic") &&
      (currentPage === 3 || currentPage === 1) ? (
        <>
          {topicData.map((item, index) => (
            <Course_topic_children
              nextState={nextState}
              setNextState={setNextState}
              key={item._id}
              item={item}
              index={index}
            />
          ))}
        </>
      ) : (
        <>{console.log(currentPage)}</>
      )} */}

      <Row className="course-main-btn-bottom">
        <Col flex={"auto"}>
          {currentPage < pageList.length ? renderPageNav() : null}
        </Col>
      </Row>
    </Layout>
  );
};

export default Course_main;
