import { Breadcrumb, Button, Card, Col, Image, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../../../../function/Student/course";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";

const { Text, Title } = Typography
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"

const StudentExam = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState()

    const handleUnloadImage = (e) => {
        e.target.src = DEFAULT_IMAGE
    }

    const studentCourseTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >
                <Col>
                    <Breadcrumb
                        separator={<Title level={5} style={{ marginTop: "10px" }}> {">"} </Title>}
                        items={[
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p >Course</p></Title>,
                                key: "courses"
                            },
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p>{course?.name}</p></Title>,
                                key: "courses_create",
                            },
                        ]}
                    />
                </Col>
                <Col style={{ paddingTop: "1px", paddingBottom: "1px", }}>
                    <Row>
                        <Button onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </Row>
                </Col>
            </Row >
        )
    }

    const fetchCourse = async () => {
        await getCourse(sessionStorage.getItem("token"), params.id, `?pops=path:teacher$select:firstname lastname`)
            .then(
                (res) => {
                    const data = res.data.data
                    console.log(data)
                    setCourse(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    return (
        <div className="bg-st-course">
            <NavBarHome />
            <div style={{ width: "100%", marginTop: "100px", marginBottom: "50px" }}>
                <Row justify={"center"}>
                    <Col flex={"auto"}>
                        <Card title={studentCourseTitle()} style={{ width: "100%" }}>
                            <Row justify={"center"}>
                                <Col flex={"auto"}>
                                    <Row>
                                        <Col flex={"auto"}>
                                            <Card>
                                                <Row justify={"start"} style={{ paddingTop: "0.5%", paddingBottom: "1%" }}>
                                                    <Col style={{ width: "330px" }}>
                                                        <Image
                                                            width={300}
                                                            preview={false}
                                                            onError={handleUnloadImage}
                                                            src={course?.image?.url ? (process.env.REACT_APP_IMG + course?.image?.url) : DEFAULT_IMAGE}
                                                        />
                                                    </Col>
                                                    <Col flex={"auto"} style={{ minWidth: "30%" }}>
                                                        <Row>
                                                            <Col flex={"auto"} style={{ width: "80%" }}>
                                                                <h4>{course?.name}</h4>
                                                            </Col>
                                                        </Row>
                                                        <Row justify={"start"} align={"middle"}>
                                                            <Col>
                                                                by {course?.teacher?.firstname} {course?.teacher?.lastname}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col style={{ paddingTop: "25px" }}>
                                                                <Text >{course?.detail}</Text>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row style={{ paddingTop: "2%", }}>
                                                    <Col style={{ width: "100%" }}>
                                                        {/* <Button
                                                            // disabled={!passedCondition}
                                                            type="primary"
                                                            size="large"
                                                            block
                                                        >
                                                            {
                                                                (
                                                                    "Add Course"
                                                                )
                                                            }

                                                        </Button> */}
                                                    </Col>

                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row style={{ paddingTop: "1%" }}>
                                        <Col flex={"auto"}>
                                            <Card >
                                                Contents and quizes...
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>

    )
}

export default StudentExam;