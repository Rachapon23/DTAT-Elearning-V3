import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Image,
  Row,
  Timeline,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getCourse } from "../../../../function/Student/course";
import { getPrivateFieldImage, listTopicCourse } from "../../../../function/Student/topic";

import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";
import "./studentcourse.css";
import StudentCourse_file from "./StudentCourse_file";
import StudentCourse_link from "./StudentCourse_link";

const { Text, Title } = Typography;
const DEFAULT_IMAGE =
  "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const StudentExam = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [topicData, setTopicData] = useState([]);
  const [imageData, setImageData] = useState(null);

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
            <Button onClick={() => handleNavigate(`/student/page/home`, { tabIndex: 1 })}>Back</Button>
          </Row>
        </Col>
      </Row>
    );
  };

  const fetchCourse = async () => {
    await getCourse(
      sessionStorage.getItem("token"),
      params.id,
      `?pops=path:teacher$select:firstname lastname`
    )
      .then((res) => {
        const data = res.data.data;
        fetchTopic(data._id);
        setCourse(data);
        handleFetchImage(data.image.name)
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

  const handleFetchImage = async (imageName) => {
    console.log("course: ", imageName)

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
      <NavBarHome />
      <div style={{ width: "100%", marginTop: "100px", marginBottom: "50px" }}>
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
                    src={imageData ? imageData : DEFAULT_IMAGE}
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
                <Text style={{ fontSize: "12px" }}>
                  by {course?.teacher?.firstname} {course?.teacher?.lastname}
                </Text>
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
                {item.sub_content.length > 0 ? (
                  <ul style={{ marginTop: "15px" }}>
                    {item.sub_content.map((ttem, ddex) => (
                      <li className="li-list">{ttem}</li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
                {item.file.length > 0 ? (
                  <StudentCourse_file item={item} />
                ) : (
                  <></>
                )}
                {item.link.length > 0 ? (
                  <StudentCourse_link item={item} />
                ) : (
                  <></>
                )}
              </Card>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default StudentExam;
