import { Avatar, Breadcrumb, Button, Card, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../../../../function/Student/course";

const { Text, Title } = Typography

const RegisterCourse = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState()

    const fetchCourse = async () => {
        await getCourse(sessionStorage.getItem("token"), params.id)
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

    const registerCourseTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >
                <Col>
                    <Breadcrumb
                        separator={<Title level={5} style={{ marginTop: "10px" }}> {">"} </Title>}
                        items={[
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p >Browes Course</p></Title>,
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
                    {/* <Link to="/teacher/page/create-exam" state={{ mode: "Create" }}> */}
                        <Button onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    {/* </Link> */}
                </Col>
            </Row>
        )
    }

    return (
        <Row justify={"center"}>
            <Col flex={"auto"} style={{ padding: "2%" }}>
                {/* Register Course: {course?.name} */}
                <Card
                    title={registerCourseTitle()}>
                    <Row justify={"center"}>
                        <Col flex={"auto"}>
                            <Row justify={"start"} style={{ paddingTop: "0.5%", paddingBottom: "2%" }}>
                                <Col style={{ width: "100%" }}>
                                    <h4>{course?.name}</h4>
                                </Col>
                                <Col flex={"auto"} style={{ paddingTop: "0.3%" }}>
                                    <Row justify={"start"} align={"middle"}>
                                        <Col>
                                            
                                        </Col>
                                        <Col>
                                            by {course?.teacher?.firstname} {course?.teacher?.lastname}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row style={{ paddingTop: "2%" }}>
                                <Col flex={"auto"}>
                                    <Text >{course?.detail}</Text>
                                </Col>
                            </Row>
                            <Row justify={"center"} style={{ paddingTop: "5%" }}>
                                <Col flex={"auto"}>
                                    <Button type="primary" style={{ width: "100%" }}> Add Course </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row >
    )
}

export default RegisterCourse;