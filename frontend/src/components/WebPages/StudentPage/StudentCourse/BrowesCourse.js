import { Breadcrumb, Button, Card, Col, Empty, Radio, Row, Segmented, Tabs, Typography } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import CardCourse from "../../../Card/CardCourse"
import { StudentContext } from "./StudentCourseContext";
import { useNavigate } from "react-router-dom";
import "./studentcourse.css";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";

const GROUP_NUMBER = 4
const { Title } = Typography

const BrowesCourse = () => {

    const { courses } = useContext(StudentContext)
    const [filterType, setFilterType] = useState(null)
    const navigate = useNavigate()

    const handleNavigate = (navStr, dataStage) => {
        navigate(navStr, { state: dataStage })
    }

    const handleClickCourse = (e, data) => {
        // console.log(e)
        e.target.id = data?._id
        // if(!e?.target?.id) return
        handleNavigate(`/student/page/register-course/${e?.target?.id}`)
    }

    const handleFilterCourseType = (courseType) => {
        console.log(courseType)
        setFilterType(courseType)
    }

    const fileterCourse = (courses) => {
        console.log("filtered")
        if (!filterType) setFilterType("All")
        console.log(filterType)
        switch (filterType) {
            case "Public":
                console.log(courses.filter((item) => item?.type))
                return courses.filter((item) => item?.type)
            case "Private":
                console.log(courses.filter((item) => !item?.type))
                return courses.filter((item) => !item?.type)
            case "All":
                return courses
            default:
                return courses
        }
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

    const renderContent = useCallback((index) => {
        // console.log("index:", filteredCourse)
        if (index % GROUP_NUMBER !== 0) return null

        return (
            <Row gutter={[32, 0]} justify={"start"} style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                {
                    fileterCourse(courses).slice(index, index + GROUP_NUMBER).map((data) => (
                        <Col span={6} style={{ padding: "1%", }}>
                            <CardCourse
                                onClick={(e) => handleClickCourse(e, data)}
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

    }, [courses])

    useEffect(() => {
        setFilterType("All")
    }, [])


    return (
        <div className="bg-st-course">
            <NavBarHome />
            <div style={{ width: "100%", marginTop: "100px", marginBottom: "50px" }}>
                <Row justify={"center"} >
                    <Col flex={"auto"} >
                        {/* style={{ padding: "2%", paddingTop: "4%" }} */}
                        <Row justify={"center"} align={"top"}>
                            <Col flex={"auto"}>
                                <Card title={browesCourseTitle()}>
                                    <Row style={{ paddingLeft: "3%", paddingRight: "3%", paddingBottom: "0.5%", }}>
                                        <Segmented
                                            style={{ width: "220px" }}
                                            block
                                            onChange={handleFilterCourseType}
                                            options={[
                                                "All",
                                                "Public",
                                                "Private"
                                            ]}
                                        />
                                    </Row>
                                    {
                                        fileterCourse(courses).length > 0 ?
                                            (
                                                fileterCourse(courses).map((_, index) => (
                                                    renderContent(index)
                                                ))
                                            )
                                            :
                                            (
                                                <Empty />
                                            )
                                    }
                                </Card>
                            </Col>
                        </Row>
                    </Col >
                </Row >
            </div>
        </div>
    )

}

export default BrowesCourse;