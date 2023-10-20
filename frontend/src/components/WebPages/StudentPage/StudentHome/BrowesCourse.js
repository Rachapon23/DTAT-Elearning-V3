import { Card, Col, Empty, Row, Segmented } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import CardCourse from "../../../common/CourseCard/CardCourse"
import { useLocation, useNavigate } from "react-router-dom";
// import "./studentcourse.css";
import { listCourse } from "../../../../function/Student/course";
import { getPrivateFieldImage } from "../../../../function/Student/topic";
import { useMediaQuery } from "react-responsive";

const GROUP_NUMBER = 4

const BrowesCourse = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    const isScreenCondition1 = useMediaQuery({ query: '(min-width: 1500px)' })
    const isScreenCondition2 = useMediaQuery({ query: '(min-width: 1400px)' })
    const isScreenCondition3 = useMediaQuery({ query: '(min-width: 1300px)' })
    const isScreenCondition4 = useMediaQuery({ query: '(min-width: 1270px)' })

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
        // if (index % GROUP_NUMBER !== 0) return null
        let cardWidth = 250
        if(isBigScreen) cardWidth = 400
        else if(isScreenCondition1) cardWidth = 300
        else if(isScreenCondition2) cardWidth = 250
        else if(isScreenCondition3) cardWidth = 260
        else if(isScreenCondition4) cardWidth = 260

        return (
            <Row gutter={[32, 0]} justify={"start"} style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                {
                    fileterCourse(courses).map((data) => (
                        <Col span={6} style={{ padding: "1%", }}>
                            <CardCourse
                                onClick={(e) => handleClickCourse(e, data)}
                                width={cardWidth}
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

    }, [courses, fileterCourse, handleClickCourse, isBigScreen, isScreenCondition1, isScreenCondition2, isScreenCondition3, isScreenCondition4])

    const renderContentMobile = useCallback((index) => {
        // console.log("index:", filteredCourse)
        // if (index % GROUP_NUMBER !== 0) return null

        return (
            <Row justify={'center'} style={{ paddingLeft: "3%", paddingRight: "3%", paddingTop: 30, }}>
                {
                    fileterCourse(courses).map((data) => (
                        <Col style={{ padding: "1%", paddingBottom: 5 }}>
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
                                                [false].map((_, index) => (
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
                                            [false].map((_, index) => (
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
        if (isDesktopOrLaptop) return BrowseCoursePc()
        if (isTabletOrMobile) return BrowseCourseMobile()
    }

    return renderBrowesCourse()

}

export default BrowesCourse;