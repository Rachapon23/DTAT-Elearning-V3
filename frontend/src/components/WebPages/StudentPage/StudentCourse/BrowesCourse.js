import { Breadcrumb, Button, Card, Col, Row, Typography } from "antd";
import React, { useContext } from "react";
import CardCourse from "../../../Card/CardCourse"
import { StudentContext } from "./StudentCourseContext";
import { useNavigate } from "react-router-dom";

const GROUP_NUMBER = 3
const { Title } = Typography

const BrowesCourse = () => {

    const { courses } = useContext(StudentContext)
    const navigate = useNavigate()
    // console.log(courses)

    const handleNavigate = (navStr, dataStage) => {
        navigate(navStr, { state: dataStage})
      }

    const handleClickCourse = (e) => {
        console.log(e.target.id)
        if(!e?.target?.id) return
        handleNavigate(`/student/page/register-course/${e?.target?.id}`)
    }

    const browesCourseTitle = () => {
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
                            // {
                            //     title: <Title level={5} style={{ marginTop: "10px" }}><p>{course?.name}</p></Title>,
                            //     key: "courses_create",
                            // },
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

    const renderContent = (index) => {
        if (index % GROUP_NUMBER !== 0) return null

        return (
            <Row justify={"start"} style={{ paddingInlineStart: "7%" }}>
                {
                    courses.slice(index, index + GROUP_NUMBER).map((data) => (
                        <Col style={{ padding: "1%", }}>
                            <CardCourse
                                onClick={handleClickCourse}
                                data={{
                                    _id: data?._id,
                                    name: data?.name,
                                    detail: data?.detail,
                                    image: data?.image?.url
                                }} />
                        </Col>
                    ))
                }
            </Row>
        )

    }

    return (
        <Row justify={"center"}>
            <Col flex={"auto"} style={{ padding: "2%" }}>
                <Row justify={"center"}>
                    <Col flex={"auto"}>
                        <Card title={browesCourseTitle()}>
                            {
                                courses.map((_, index) => (
                                    renderContent(index)
                                ))
                            }
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )

}

export default BrowesCourse;