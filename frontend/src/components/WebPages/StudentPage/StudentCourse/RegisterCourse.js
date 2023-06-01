import { Avatar, Breadcrumb, Button, Card, Col, Image, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../../../../function/Student/course";

const { Text, Title } = Typography
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"

const RegisterCourse = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState()


    const isPassCondition = () => {
        // TODO: implement check condition of course
        return false
    }

    const handleAddCourse = async () => {

        if (!isPassCondition()) {
            // alert user or something
            return
        }
        // when add course create activity -> in student's home, use activity to fetch all student added course


    }

    const handleUnloadImage = (e) => {
        e.target.src = DEFAULT_IMAGE
    }

    const fetchCourse = async () => {
        await getCourse(sessionStorage.getItem("token"), params.id, `?fetch=name,detail,image,condition`)
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
            <Col flex={"auto"} style={{ padding: "2%", paddingLeft: "10%", paddingRight: "10%" }}>
                {/* Register Course: {course?.name} */}
                <Card
                    title={registerCourseTitle()}>
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

                                            {/* <Col style={{ width: "15%" }}>
                                                <Row style={{ paddingTop: "18%", paddingBottom: "20px" }}>
                                                    <Button
                                                        type="primary"
                                                        size="large"
                                                        block
                                                        onClick={handleAddCourse}
                                                    >
                                                        Add Course
                                                    </Button>
                                                </Row>
                                                <Row>
                                                    <Button
                                                        type="primary"
                                                        size="large"
                                                        block
                                                        onClick={handleAddCourse}
                                                    >
                                                        Start
                                                    </Button>
                                                </Row>
                                            </Col >
                                            <Col style={{ width: "25px" }} /> */}
                                        </Row>

                                        <Row style={{ paddingTop: "0.5%", }}>
                                            <Col style={{ width: "48%"}}>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    block
                                                    onClick={handleAddCourse}
                                                >
                                                    Add Course
                                                </Button>
                                            </Col>
                                            <Col style={{ width: "2%"}}/>
                                            <Col flex={"auto"}>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    block
                                                    onClick={handleAddCourse}
                                                >
                                                    Start
                                                </Button>
                                            </Col>

                                        </Row>

                                    </Card>
                                </Col>
                            </Row>

                            <Row style={{ paddingTop: "1%" }}>
                                <Col flex={"auto"}>
                                    <Card >
                                        Condtion for course if exist
                                    </Card>
                                </Col>

                            </Row>

                            {/* <Row style={{ paddingTop: "2%" }}>
                                <Col flex={"auto"}>

                                </Col>
                            </Row> */}

                            {/* <Row justify={"center"} style={{ paddingTop: "5%" }}>
                                <Col flex={"auto"}>
                                    
                                </Col>
                            </Row> */}
                        </Col>
                    </Row>
                </Card >
            </Col >
        </Row >
    )
}

export default RegisterCourse;