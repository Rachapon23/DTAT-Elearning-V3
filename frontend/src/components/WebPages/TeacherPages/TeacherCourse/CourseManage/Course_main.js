import React from "react";
import { useState, useEffect, useContext } from "react";

// import Page
import Course_info from "./Course_info";
import Course_Room from "./Course_Room";
import Course_condition from "./Course_condition";
import Course_topic from "./Course_topic";
import Course_finished from "./Course_finished";
import Course_topic_children from "./Course_topic_children";

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
  Breadcrumb,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
//course Context
import { CourseContext } from "./CourseContext";
// fucntion : POST
import { createFile } from "../../../../../function/Teacher/course_update";
// fucntion : PUT
import { updateCalendar } from "../../../../../function/Teacher/calendar";
// fucntion : DELETE
import { deleteCalendar } from "../../../../../function/Teacher/calendar";

//momentJS
import moment from "moment";
import "moment/locale/th";
import { Link } from "react-router-dom";
moment.locale("th");

const { Title, Text } = Typography

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
          title: "Topic",
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
          title: "Topic",
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
          {/* <Button
            type="primary"
            onClick={() => {
              console.log(courseData.calendar);
            }}
          >
            {" "}
            Preview
          </Button> */}
        </Col>

        <Col>
          <Row>
            {
              currentPage !== 0 ?
                (
                  <Col style={{ paddingRight: "10px" }}>
                    <Button onClick={() => handleDisplay("Previous")}>
                      Previous
                    </Button>
                  </Col>
                )
                :
                (null)
            }
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

  const courseCreateTitle = () => {
    return (
      <Row align={"middle"} justify={"space-between"} >
        <Col>
          <Breadcrumb
            separator={<Title level={5} style={{ marginTop: "10px" }}> {">"} </Title>}
            items={
              [
                {
                  title: <Title level={5} style={{ marginTop: "10px" }}><p >Course</p></Title>,
                  key: "courses"
                },
                {
                  title: <Title level={5} style={{ marginTop: "10px" }}><p>Create Exam</p></Title>,
                  key: "courses_action",
                },
              ]
            }
          />
        </Col>
        <Col style={{ paddingTop: "1px", paddingBottom: "1px", }}>
          <Link to="/teacher/page/list-course">
            <Button>
              Back
            </Button>
          </Link>
        </Col>
      </Row>
    )
  }

  return (
    <Layout className="course-main-layout" >
      <Row className="course-main-content">
        <Col flex="auto" style={{ justifyContent: "center" }}>
          <Card title={courseCreateTitle()} className="card-shadow">
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

      {(courseData?.calendar !== null || courseData?.calendar !== undefined) &&
        step[1]?.title === "Time & Room" &&
        currentPage === 1 ? (
        <Row className="course-main-for-calendar">
          <Card className="card-calendar">
            <Row justify="center" align={"middle"}>
              <Col className="col-card-calendar" span={6}>
                <Text strong> Start : </Text>
                &nbsp;
                {
                  courseData?.calendar?.start ?
                    (
                      moment(courseData?.calendar?.start).format("LL")
                    )
                    :
                    (
                      "Not selected"
                    )
                }
              </Col>
              <Col className="col-card-calendar" span={6}>
                <Text strong> End : </Text>
                &nbsp;
                {
                  courseData?.calendar?.end ?
                    (
                      moment(courseData?.calendar?.end).format("LL")
                    )
                    :
                    (
                      "Not selected"
                    )
                }
              </Col>
              <Col className="col-card-calendar" span={6}>
                <ColorPicker
                  disabled={!courseData?.calendar}
                  onChange={debounceOnChange}
                  value={courseData?.calendar?.color}
                  trigger="hover"
                />
              </Col>
              <Col className="col-card-calendar" span={6}>
                <Button onClick={handleRemoveCalendar}>
                  <Row justify={"center"} align={"middle"}>
                    <Col flex={"auto"} style={{ marginTop: "-5px" }}>
                      <DeleteOutlined />
                    </Col>
                  </Row>
                </Button>
              </Col>
            </Row>
          </Card>
        </Row>
      ) : (
        <></>
      )}


      {
        courseData.type === true ? (
          <>
            {
              topicData.length !== 0 &&
                step[1]?.title === "topic" &&
                currentPage === 1 ?
                (
                  <>
                    {topicData.map((item, index) => (
                      <Card>
                        <Course_topic_children
                          nextState={nextState}
                          setNextState={setNextState}
                          key={item._id}
                          item={item}
                          index={index}
                        />
                      </Card>

                    ))}
                  </>
                )
                :
                (
                  <></>
                )
            }
          </>
        ) : (
          <>
            {topicData.length !== 0 &&
              step[3]?.title === "topic" &&
              currentPage === 3 ? (
              <>
                {topicData.map((item, index) => (
                  <Card>
                    <Course_topic_children
                      nextState={nextState}
                      setNextState={setNextState}
                      key={item._id}
                      item={item}
                      index={index}
                    />
                  </Card>
                ))}
              </>
            ) : (
              <></>
            )}
          </>
        )
      }
      <Row className="course-main-btn-bottom">
        <Col flex={"auto"}>
          {currentPage < pageList.length ? renderPageNav() : null}
        </Col>
      </Row>
    </Layout >
  );
};

export default Course_main;
