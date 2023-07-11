import { Card, Col, Empty, Row, Segmented } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import CardCourse from "../../../common/CourseCard/CardCourse"
import { useLocation, useNavigate } from "react-router-dom";
// import "./studentcourse.css";
import { listCourse } from "../../../../function/Student/course";
import { getPrivateFieldImage } from "../../../../function/Student/topic";

const GROUP_NUMBER = 4

const BrowesCourse = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const [filterType, setFilterType] = useState(null)
    const [imageData, setImageData] = useState(null);

    const handleNavigate = useCallback((navStr, dataStage) => {
        navigate(navStr, { state: dataStage })
    }, [navigate])

    const handleClickCourse = useCallback((e, data) => {
        // console.log(e)
        e.target.id = data?._id
        // if(!e?.target?.id) return
        handleNavigate(`/student/page/register-course/${e?.target?.id}`)
    }, [handleNavigate])

    const handleFilterCourseType = (courseType) => {
        console.log(courseType)
        setFilterType(courseType)
    }

    const fileterCourse = useCallback((courses) => {
        // console.log("filtered")
        if (!filterType) setFilterType("All")
        // console.log(filterType)
        switch (filterType) {
            case "Public":
                // console.log(courses.filter((item) => item?.type))
                return courses.filter((item) => item?.type)
            case "Private":
                // console.log(courses.filter((item) => !item?.type))
                return courses.filter((item) => !item?.type)
            case "All":
                return courses
            default:
                return courses
        }
    }, [filterType])

    const renderContentPc = useCallback((index) => {
        // console.log("index:", filteredCourse)
        if (index % GROUP_NUMBER !== 0) return null

        return (
            <Row gutter={[32, 0]} justify={"start"} style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                {
                    fileterCourse(courses).slice(index, index + GROUP_NUMBER).map((data) => (
                        <Col span={6} style={{ padding: "1%", }}>
                            {console.log("data: ", data)}
                            <CardCourse
                                onClick={(e) => handleClickCourse(e, data)}
                                data={{
                                    _id: data?._id,
                                    name: data?.name,
                                    detail: data?.detail,
                                    image: data?.image?.name
                                }}
                            />
                        </Col>
                    ))
                }
            </Row>
        )

    }, [courses, fileterCourse, handleClickCourse])

    const renderContentMobile = useCallback((index) => {
        // console.log("index:", filteredCourse)
        if (index % GROUP_NUMBER !== 0) return null

        return (
            <Row justify={"center"} style={{ paddingLeft: "3%", paddingRight: "3%", paddingTop: 40 }}>
                {
                    fileterCourse(courses).slice(index, index + GROUP_NUMBER).map((data) => (
                        <Col style={{ padding: "1%", paddingBottom: 5}}>
                            {console.log("data: ", data)}
                            <CardCourse
                                onClick={(e) => handleClickCourse(e, data)}
                                width={300}
                                data={{
                                    _id: data?._id,
                                    name: data?.name,
                                    detail: data?.detail,
                                    image: data?.image?.name
                                }}
                            />
                        </Col>
                    ))
                }
            </Row>
        )

    }, [courses, fileterCourse, handleClickCourse])

    const fetchCourse = async () => {
        await listCourse(sessionStorage.getItem("token"), `?selects=name,detail,image,type`)
            .then(
                (res) => {
                    const data = res.data.data
                    setCourses(data)
                    // console.log("student context", data)
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

    const BrowseCoursePc = () => {
        return (
            <div style={{ width: "100%", }}>
                <Row justify={"center"} >
                    <Col flex={"auto"} >
                        {/* style={{ padding: "2%", paddingTop: "4%" }} */}
                        <Row justify={"center"} align={"top"}>
                            <Col flex={"auto"}>
                                <Card>
                                    <Row style={{ paddingLeft: "3%", paddingRight: "3%", paddingBottom: "0.5%", }}>
                                        <Segmented
                                            style={{ width: "220px" }}
                                            value={filterType}
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
                                                    renderContentPc(index)
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
        )
    }

    const BrowseCourseMobile = () => {
        return (
            <div style={{ width: "100%", }}>
                <Row justify={"center"} >
                    <Col flex={"auto"} >
                        <Row justify={"center"} align={"top"}>
                            <Col flex={"auto"}>
                                {/* <Card> */}
                                <Row justify={'center'} style={{ paddingLeft: "3%", paddingRight: "3%", paddingBottom: 10, }}>
                                    <Segmented
                                        style={{ width: "220px", position: 'fixed', zIndex: 10 }}
                                        value={filterType}
                                        block
                                        onChange={handleFilterCourseType}
                                        options={[
                                            "All",
                                            "Public",
                                            "Private",
                                        ]}
                                    />
                                </Row>
                                {
                                    fileterCourse(courses).length > 0 ?
                                        (
                                            fileterCourse(courses).map((_, index) => (
                                                renderContentMobile(index)
                                            ))
                                        )
                                        :
                                        (
                                            <Empty />
                                        )
                                }
                                {/* </Card> */}
                            </Col>
                        </Row>
                    </Col >
                </Row >
            </div>
        )
    }

    const renderBrowesCourse = () => {
        if (false) return BrowseCoursePc()
        if (true) return BrowseCourseMobile()
    }

    return renderBrowesCourse()

}

export default BrowesCourse;