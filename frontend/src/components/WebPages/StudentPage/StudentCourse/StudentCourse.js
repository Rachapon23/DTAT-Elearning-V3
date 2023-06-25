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
  const [imageData, setImageData] = useState(null);
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
        // handleFetchImage(data.image.name)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTopic = (id) => {
    listTopicCourse(sessionStorage.getItem("token"), id)
      .then((res) => {
        setTopicData(res.data);
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

  const handleFetchImage = async (imageName) => {

    const image_name = imageName
    if (!image_name) return

    const field = "course"
    const param = "file"

    let response
    await getPrivateFieldImage(sessionStorage.getItem("token"), field, param, image_name)
      .then(
        (res) => {
          response = res
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )

    const objectUrl = URL.createObjectURL(response.data);
    setImageData(objectUrl)
  }


  useEffect(() => {
    fetchCourse();
  }, []);

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
                    by {course?.teacher?.firstname} {course?.teacher?.lastname}
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
                        <Col style={{ paddingRight: "10px" }}>{teacherProfile?.firstname}</Col>
                        <Col >{teacherProfile?.lastname}</Col>
                      </Row>
                      <Row>
                        <Col style={{ paddingRight: "15px" }}><Text strong> Email: </Text> </Col>
                        <Col>{teacherProfile?.email}</Col>
                      </Row>
                      <Row>
                        <Col style={{ paddingRight: "30px" }}><Text strong> Tel: </Text> </Col>
                        <Col>{teacherProfile?.tel}</Col>
                      </Row>
                    </Col>
                  </Row>
                </Modal>
              </Row>
              {/* <Row justify={"center"}>
                <Col flex={"auto"}>
                  <Row
                    justify={"start"}
                    style={{ paddingTop: "0.5%", paddingBottom: "1%" }}
                  >
                    <Col style={{ width: "330px" }}></Col>
                    <Col flex={"auto"} style={{ minWidth: "30%" }}>
                      <Row>
                        <Col flex={"auto"} style={{ width: "80%" }}>
                          <Title style={{ color: "#002c8c" }} level={3}>
                            {course?.name}
                          </Title>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Text>{course?.detail}</Text>
                        </Col>
                      </Row>
                      <Row justify={"end"} align={"end"}>
                        <Col style={{ fontSize: "12px" }}>
                          by {course?.teacher?.firstname}{" "}
                          {course?.teacher?.lastname}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row> */}
            </Card>
          </Col>
        </Row>
        {topicData.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default StudentExam;
