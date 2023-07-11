import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Image,
  Modal,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getCourse, getProfile } from "../../../../function/Student/course";
import { getPrivateFieldImage, listTopicCourse } from "../../../../function/Student/topic";
import "./studentcourse.css";
import StudentCourse_file from "./StudentCourse_file";
import StudentCourse_link from "./StudentCourse_link";

const { Text, Title } = Typography;
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const StudentExam = () => {
  const params = useParams();
  const location = useLocation()
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [topicData, setTopicData] = useState([]);
  const [openProfile, setOpenProfile] = useState(false)
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [selectedTabIndex] = useState(location?.state?.tabIndex ? location.state.tabIndex : 0)

  const handleNavigate = (navStr, dataStage) => {
    navigate(navStr, { state: dataStage })
  }

  const handleUnloadImage = (e) => {
    e.target.src = DEFAULT_IMAGE;
  };

  const studentCourseTitle = () => {
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
                    <p>{course?.name}</p>
                  </Title>
                ),
                key: "courses_create",
              },
            ]}
          />
        </Col>
        <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
          <Row>
            <Button onClick={() => handleNavigate(`/student/page/home`, { tabIndex: selectedTabIndex })}>Back</Button>
          </Row>
        </Col>
      </Row>
    );
  };

  const renderTopic = () => {
    if (Array.isArray(topicData) && topicData.length > 0) {
      return (
        <>
          {
            topicData.map((item, index) => (
              <Row key={index} justify={"center"} style={{ marginBottom: "15px" }}>
                <Col flex={"auto"}>
                  <Card style={{ padding: "20px", width: "100%" }}>
                    <Title style={{ color: "#002c8c" }} level={3}>
                      {item.title}
                    </Title>
                    <Text>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {item.detail}
                    </Text>
                    <br />
                    {
                      item.sub_content.length > 0 ?
                        (
                          <ul style={{ marginTop: "15px" }}>
                            {item.sub_content.map((ttem, ddex) => (
                              <li className="li-list">{ttem}</li>
                            ))}
                          </ul>
                        )
                        :
                        (
                          <></>
                        )
                    }
                    {
                      item.file.length > 0 ?
                        (
                          <StudentCourse_file item={item} />
                        )
                        :
                        (
                          <></>
                        )
                    }
                    {
                      item.link.length > 0 ?
                        (
                          <StudentCourse_link item={item} />
                        )
                        :
                        (
                          <></>
                        )
                    }
                  </Card>
                </Col>
              </Row>
            ))
          }
        </>
      )
    }
    if (topicData === null) {
      return (
        <Col flex={"auto"}>
          <Card>
            <Row justify={"center"} align={"middle"}>
              <Title level={4}> Course Not Avaliable </Title>
            </Row>
          </Card>
        </Col>
      )
    }
    return null
  }

  const fetchCourse = async () => {
    await getCourse(
      sessionStorage.getItem("token"),
      params.id,
      `?pops=path:teacher$select:firstname lastname _id`
    )
      .then((res) => {
        const data = res.data.data;
        fetchTopic(data._id);
        setCourse(data);
        fetchTeacherProfile(data.teacher._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTopic = (id) => {
    listTopicCourse(sessionStorage.getItem("token"), id)
      .then((res) => {
        const data = res.data
        if (data?.enabled === false) {
          setTopicData(null)
        }
        else {
          setTopicData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTeacherProfile = async (id) => {
    await getProfile(sessionStorage.getItem("token"), id)
      .then(
        (res) => {
          const data = res.data.data
          setTeacherProfile(data);
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  const studentCoursePc = () => {
    return (
      <div className="bg-st-course">
        <div style={{ width: "100%", marginTop: "20px", marginBottom: "50px" }}>
          <Row justify={"center"} style={{ marginBottom: "15px" }}>
            <Col flex={"auto"}>
              <Card
                // cover={
                //   <img
                //     alt="example"
                //     src={`http://localhost:5500/uploads/course/${course?.image?.name}`}
                //   />
                // }
                title={studentCourseTitle()} style={{ width: "100%" }}
              >
                <Row gutter={16}>
                  <Col span={6}>
                    <Image
                      style={{ borderRadius: "5px" }}
                      preview={false}
                      onError={handleUnloadImage}
                      src={course?.image?.name ? `${process.env.REACT_APP_IMG}/course/${course?.image?.name}` : DEFAULT_IMAGE}
                    />
                  </Col>
                  <Col span={6}>
                    <Title style={{ color: "#002c8c" }} level={3}>
                      {course?.name}
                    </Title>
                    <Text style={{ fontSize: "13px" }}>
                      {course?.detail}</Text>

                  </Col>
                </Row>
                <Row justify={'end'}>
                  <Link>
                    <Text style={{ fontSize: "12px", color: "blue" }} onClick={() => setOpenProfile(true)}>
                      By {teacherProfile?.firstname} {teacherProfile?.lastname}
                    </Text>
                  </Link>

                  <Modal title="Teacher Profile" open={openProfile} onOk={() => setOpenProfile(false)} onCancel={() => setOpenProfile(false)} footer={null}>
                    <Row>
                      <Col flex={"auto"} style={{ maxWidth: "150px" }}>
                        <Avatar
                          shape="square"
                          size={120}
                          style={{
                            cursor: "pointer",
                            paddingBottom: "0.5%",
                            verticalAlign: "middle",
                          }}
                        >
                          <Row justify={"center"} align={"middle"}>
                            <Col flex={"auto"} style={{ paddingTop: "10px" }}>
                              <Text style={{ fontSize: "300%", color: "white" }}>
                                {teacherProfile?.firstname ? teacherProfile?.firstname.substring(0, 1) : ""}
                              </Text>
                            </Col>
                          </Row>
                        </Avatar>
                      </Col>
                      <Col>
                        <Row>
                          <Col style={{ paddingRight: "10px" }}><Text strong> Name: </Text> </Col>
                          <Col style={{ paddingRight: "10px" }}>{teacherProfile?.firstname ? teacherProfile?.firstname : "No data"}</Col>
                          <Col >{teacherProfile?.lastname}</Col>
                        </Row>
                        <Row>
                          <Col style={{ paddingRight: "15px" }}><Text strong> Email: </Text> </Col>
                          <Col>{teacherProfile?.email ? teacherProfile?.email : "No data"}</Col>
                        </Row>
                        <Row>
                          <Col style={{ paddingRight: "30px" }}><Text strong> Tel: </Text> </Col>
                          <Col>{teacherProfile?.tel ? teacherProfile?.tel : "No data"}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Modal>
                </Row>
              </Card>
            </Col>
          </Row>
          {
            renderTopic()
          }
        </div>
      </div>
    );
  }

  const studentCourseMobile = () => {
    return (
      <div className="bg-st-course">
        <div style={{ width: "100%", marginTop: "20px", marginBottom: "50px" }}>
          <Row justify={"center"} style={{ marginBottom: "15px" }}>
            <Col flex={"auto"}>
              <Card title={studentCourseTitle()} style={{ width: "100%" }} >
                <Row gutter={16}>
                  <Col span={6}>
                    <Image
                      style={{ borderRadius: "5px" }}
                      preview={false}
                      onError={handleUnloadImage}
                      src={course?.image?.name ? `${process.env.REACT_APP_IMG}/course/${course?.image?.name}` : DEFAULT_IMAGE}
                    />
                  </Col>
                  <Col span={6}>
                    <Title style={{ color: "#002c8c" }} level={3}>
                      {course?.name}
                    </Title>
                    <Text style={{ fontSize: "13px" }}>
                      {course?.detail}</Text>

                  </Col>
                </Row>
                <Row justify={'end'}>
                  <Link>
                    <Text style={{ fontSize: "12px", color: "blue" }} onClick={() => setOpenProfile(true)}>
                      By {teacherProfile?.firstname} {teacherProfile?.lastname}
                    </Text>
                  </Link>

                  <Modal title="Teacher Profile" open={openProfile} onOk={() => setOpenProfile(false)} onCancel={() => setOpenProfile(false)} footer={null}>
                    <Row>
                      <Col flex={"auto"} style={{ maxWidth: "150px" }}>
                        <Avatar
                          shape="square"
                          size={120}
                          style={{
                            cursor: "pointer",
                            paddingBottom: "0.5%",
                            verticalAlign: "middle",
                          }}
                        >
                          <Row justify={"center"} align={"middle"}>
                            <Col flex={"auto"} style={{ paddingTop: "10px" }}>
                              <Text style={{ fontSize: "300%", color: "white" }}>
                                {teacherProfile?.firstname ? teacherProfile?.firstname.substring(0, 1) : ""}
                              </Text>
                            </Col>
                          </Row>
                        </Avatar>
                      </Col>
                      <Col>
                        <Row>
                          <Col style={{ paddingRight: "10px" }}><Text strong> Name: </Text> </Col>
                          <Col style={{ paddingRight: "10px" }}>{teacherProfile?.firstname ? teacherProfile?.firstname : "No data"}</Col>
                          <Col >{teacherProfile?.lastname}</Col>
                        </Row>
                        <Row>
                          <Col style={{ paddingRight: "15px" }}><Text strong> Email: </Text> </Col>
                          <Col>{teacherProfile?.email ? teacherProfile?.email : "No data"}</Col>
                        </Row>
                        <Row>
                          <Col style={{ paddingRight: "30px" }}><Text strong> Tel: </Text> </Col>
                          <Col>{teacherProfile?.tel ? teacherProfile?.tel : "No data"}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Modal>
                </Row>
              </Card>
            </Col>
          </Row>
          {
            renderTopic()
          }
        </div>
      </div>
    );
  }

  const renderStudentCourse = () => {
    if (false) {
      return studentCoursePc()
    }
    if (true) {
      return studentCourseMobile()
    }
  }

  return renderStudentCourse()
};

export default StudentExam;
