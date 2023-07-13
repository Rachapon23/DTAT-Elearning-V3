import { Avatar, Breadcrumb, Button, Card, Col, Divider, Image, Progress, Row, Typography, message } from "antd";
import React, { createRef, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createActivity, getActivity, getCourse, getUser, getCalendarByCourseId } from "../../../../function/Student/course";
import { listCondition } from "../../../../function/Student/condition";
import "./studentcourse.css";
import { getPrivateFieldImage } from "../../../../function/Student/topic";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { useMediaQuery } from "react-responsive";
import { StudentPageContext } from "../StudentPageContext";

const { Text, Title } = Typography
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"

const RegisterCourse = () => {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    const params = useParams()
    const navigate = useNavigate()
    const calendarRef = createRef()

    const [course, setCourse] = useState(null)
    const [plant, setPlant] = useState(null)
    const [registered, setRegistered] = useState(false)
    const [passedCondition, setPassedCondition] = useState(false)
    const [pageChange, setPageChange] = useState(false)
    const [conditionData, setConditionData] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [courseResult, setCourseResult] = useState(false)
    const [even, setEven] = useState(null);
    const [messageApi, notifyContextHolder] = message.useMessage();

    const { currentPage, setCurrentPage } = useContext(StudentPageContext)

    const notify = (type, message) => {
        //type success / error / warning
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const handleNavigate = (navStr, dataStage) => {
        navigate(navStr, { state: dataStage })
    }

    const isPassCondition = async (conditionData) => {
        // check registered
        await checkRegistered()
        console.log("conditionData: ", conditionData)
        if (
            Array.isArray(conditionData) &&
            (
                conditionData.length === 0 ||
                course?.type === true
            )
        ) return setPassedCondition(true)

        // check plant
        let result = false
        for (let i = 0; i < conditionData.length; i++) {
            console.log("condition: ", conditionData[i], " plant: ", conditionData[i].plant.name, plant)
            if (conditionData[i].plant.name === plant) {
                console.log("plan:t: ", plant)
                result = true
                break
            }

            if (conditionData[i].current + 1 > conditionData[i].maximum) {
                result = false
                break
            }
            // console.log("plant: ", conditionData[i].plant.name, " plant: ", plant)

        }

        console.log("in plant: ", result)
        setPassedCondition(result)
        setPageChange(true)
    }

    const checkRegistered = async () => {
        await getActivity(sessionStorage.getItem("token"), null, `?search=user:${sessionStorage.getItem("user_id")},course:${params.id}&fetch=_id,result`)
            .then(
                (res) => {
                    const data = res.data.data
                    console.log(data)
                    if (data) {
                        setCourseResult(data.result)
                        setRegistered(true)
                    }
                    console.log("result: ", courseResult)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const handleOpenCourse = () => {
        if (courseResult === 0) {
            setCurrentPage(0)
            handleNavigate(`/student/page/course/${params.id}`)
            
        }
        else {
            setCurrentPage(1)
            handleNavigate(`/student/page/course/${params.id}`)
        }
    }

    const handleAddCourse = async () => {

        if (!isPassCondition(conditionData)) {
            // alert user or something
            // console.log("????")
            return
        }
        // when add course create activity -> in student's home, use activity to fetch all student added course
        await createActivity(sessionStorage.getItem("token"), {
            user: sessionStorage.getItem("user_id"),
            course: params.id,
        })
            .then(
                (res) => {
                    const data = res.data.data
                    fetchCourse()
                    pageChange(true)
                }
            )
            .catch(
                (err) => {
                    const error = err.response
                    console.log(`<${error.status}> ${error.data.error}`)
                    notify("error", error.data.error)
                }
            )
    }

    const handleUnloadImage = (e) => {
        e.target.src = DEFAULT_IMAGE
    }

    const fetchCondition = async (id) => {
        await listCondition(sessionStorage.getItem("token"), id)
            .then(async (res) => {
                const data = res.data
                // console.log("DATA: ", data)
                setConditionData(data);
                isPassCondition(data)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchCalendar = async () => {
        await getCalendarByCourseId(sessionStorage.getItem("token"), params.id)
            .then(
                (res) => {
                    const data = res.data
                    if (!data?.start) return
                    setEven(() => [data])
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            );
    }

    const fetchUser = async () => {
        await getUser(sessionStorage.getItem("token"), sessionStorage.getItem("user_id"), `?fetch=plant,-_id&field=plant`)
            .then(
                (res) => {
                    const data = res.data.data
                    console.log(data)
                    setPlant(data?.plant?.name)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const fetchCourse = async () => {
        // console.log("id: ", params.id)
        await getCourse(
            sessionStorage.getItem("token"),
            params.id,
            `?fetch=name,detail,image,condition,teacher,type&pops=path:condition$populate:plant$select:plant maximum current,path:teacher$select:firstname lastname -_id`
        )
            .then(
                (res) => {
                    const data = res.data.data
                    // console.log(data)
                    setCourse(data)
                    fetchCondition(data?._id);
                    handleFetchImage(data?.image?.name)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const goToDate = () => {
        const calendarAPI = calendarRef?.current?.getApi()
        if (!Array.isArray(even)) return
        if (calendarAPI && even[0]?.start) calendarAPI.gotoDate(even[0].start)
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
                    // console.log(err)
                }
            )

        const objectUrl = URL.createObjectURL(response.data);
        setImageData(objectUrl)
    }

    useEffect(() => {
        fetchUser()
        fetchCourse()
        fetchCalendar()
        goToDate()
    }, [pageChange])

    const registerCourseTitlePc = () => {
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
                    <Button onClick={() => handleNavigate("/student/page/home", { tabIndex: 4 })}>
                        Back
                    </Button>
                    {/* </Link> */}
                </Col>
            </Row>
        )
    }

    const registerCourseTitleMobile = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >

                <Col>
                    <Breadcrumb
                        separator={<Title level={5} style={{ marginTop: "10px" }}> {">"} </Title>}
                        items={[
                            {
                                // title: <Title level={5} style={{ marginTop: "10px" }}><p>{course?.name}</p></Title>,
                                key: "courses_create",
                            },
                        ]}
                    />
                </Col>
                <Col style={{ paddingTop: "1px", paddingBottom: "1px", }}>
                    <Button onClick={() => {
                        handleNavigate("/student/page/home")
                        setCurrentPage(3)
                    }}>
                        Back
                    </Button>
                </Col>
            </Row>
        )
    }

    const rerenderCalendarPc = () => {
        return (
            <Col>
                <Card>
                    <Row justify={"center"}>
                        <Col style={{ width: "700px", maxWidth: "2000px", }}>
                            <FullCalendar
                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                    bootstrap5Plugin,
                                ]}
                                headerToolbar={{
                                    left: null,//"prev today",
                                    center: "title",
                                    right: null//"next",
                                }}
                                height={500}
                                themeSystem="bootstrap5"
                                events={even}
                                defaultTimedEventDuration={even}
                                ref={calendarRef}
                            />
                        </Col>

                    </Row>
                </Card>
            </Col>
        )
    }

    const rerenderCalendarMobile = () => {
        return (
            <Col flex={'auto'}>
                {/* <Card style={{ width: 270 }}> */}
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        bootstrap5Plugin,
                    ]}
                    headerToolbar={{
                        left: null,//"prev today",
                        center: "title",
                        right: null//"next",
                    }}
                    height={400}
                    themeSystem="bootstrap5"
                    events={even}
                    defaultTimedEventDuration={even}
                    ref={calendarRef}
                />
                {/* </Card> */}
            </Col>
        )
    }

    const renderConditionPc = () => {
        return (
            <Row style={{ paddingTop: "1%" }}>
                <Col flex={"auto"}>
                    <Card >
                        <Row justify={"space-between"}>
                            <Col flex={"auto"} style={{ width: "20%", marginRight: "20px" }}>
                                {
                                    course?.condition && course?.condition.map(
                                        (item) => (
                                            <Row >
                                                <Col flex={"auto"}>
                                                    <Row>
                                                        <Title level={4}>
                                                            Plant: {item.plant.name}
                                                        </Title>
                                                    </Row>
                                                    <Row>
                                                        <Title level={5}>
                                                            Amount: {item.current} / {item.maximum}
                                                        </Title>
                                                    </Row>
                                                    <Row>
                                                        <Progress percent={item.current * 100 / item.maximum} />
                                                    </Row>
                                                </Col>
                                            </Row>
                                        )
                                    )
                                }
                            </Col>
                            {
                                even ? rerenderCalendarPc() : null
                            }
                        </Row>
                    </Card>
                </Col>
            </Row>
        )
    }

    const renderConditionMobile = () => {
        return (
            <Row style={{ paddingTop: "1%" }}>
                <Col flex={"auto"} style={{ paddingTop: 15 }}>
                    <Card style={{ marginInline: -10 }}>
                        <Row justify={"space-between"}>
                            <Col flex={"auto"} style={{ width: "20%" }}>
                                <Row>
                                    <Col flex={'auto'}>
                                        {
                                            course?.condition && course?.condition.map(
                                                (item) => (
                                                    <Row >
                                                        <Col flex={"auto"}>
                                                            <Row>
                                                                <Title level={4}>
                                                                    Plant: {item.plant.name}
                                                                </Title>
                                                            </Row>
                                                            <Row>
                                                                <Title level={5}>
                                                                    Amount: {item.current} / {item.maximum}
                                                                </Title>
                                                            </Row>
                                                            <Row>
                                                                <Progress percent={item.current * 100 / item.maximum} />
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                )
                                            )
                                        }
                                    </Col>
                                </Row>
                                {
                                    even ? <Divider /> : null
                                }
                                <Row>
                                    {
                                        even ? rerenderCalendarMobile() : null
                                    }
                                </Row>
                            </Col>

                        </Row>
                    </Card>
                </Col>
            </Row>
        )
    }

    const registerCoursePc = () => {
        return (
            <div>
                {notifyContextHolder}
                <div style={{ width: "100%", marginTop: "20px", marginBottom: "50px" }}>
                    <Row justify={"center"} >
                        <Col flex={"auto"} >
                            <Card title={registerCourseTitlePc()}>
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
                                                                src={course?.image?.name ? `${process.env.REACT_APP_IMG}/course/${course?.image?.name}` : DEFAULT_IMAGE}
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
                                                                    <Text strong>By {course?.teacher?.firstname} {course?.teacher?.lastname}</Text>
                                                                </Col>
                                                            </Row>
                                                            <Row justify={"start"} align={"middle"}>
                                                                <Col style={{ paddingTop: "1%" }}>
                                                                    <Text strong>
                                                                        {
                                                                            course?.type === true ?
                                                                                "Public Course"
                                                                                :
                                                                                "Private Course"
                                                                        }
                                                                    </Text>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col style={{ paddingTop: "15px" }}>
                                                                    <Text >{course?.detail}</Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>

                                                    <Row style={{ paddingTop: "2%", }}>
                                                        <Col style={{ width: "100%" }}>
                                                            <Button
                                                                disabled={!passedCondition}
                                                                type="primary"
                                                                size="large"
                                                                block
                                                                onClick={
                                                                    () => registered ? handleOpenCourse() : handleAddCourse()
                                                                }
                                                            >
                                                                {
                                                                    registered ?
                                                                        (
                                                                            "Go to Course"
                                                                        )
                                                                        :
                                                                        (
                                                                            "Add Course"
                                                                        )
                                                                }

                                                            </Button>
                                                        </Col>
                                                    </Row>

                                                </Card>
                                            </Col>
                                        </Row>
                                        {
                                            course && course?.type === false ? renderConditionPc() : null
                                        }
                                    </Col>
                                </Row>
                            </Card >
                        </Col >
                    </Row >
                </div>
            </div>
        )
    }

    const registerCourseMobile = () => {
        return (
            <div >
                {notifyContextHolder}
                <div style={{ width: "100%", marginBottom: "50px" }}>
                    <Row justify={"center"} >
                        <Col flex={"auto"} style={{ paddingInline: 5 }}>
                            <Card title={registerCourseTitleMobile()} >
                                <Row justify={"center"}>
                                    <Col flex={"auto"}>
                                        <Row>
                                            <Col flex={"auto"}>
                                                {/* <Card > */}

                                                <Row justify={'center'} style={{ paddingTop: "0.5%", paddingBottom: "1%" }}>
                                                    <Col>
                                                        <Image
                                                            style={{ borderRadius: "5px" }}
                                                            preview={false}
                                                            onError={handleUnloadImage}
                                                            src={course?.image?.name ? `${process.env.REACT_APP_IMG}/course/${course?.image?.name}` : DEFAULT_IMAGE}
                                                        />
                                                    </Col>
                                                    <Col flex={"auto"} style={{ minWidth: "30%", paddingTop: 5 }}>
                                                        <Row>
                                                            <Col flex={"auto"} style={{ width: "80%", paddingTop: 10 }}>
                                                                <h4>{course?.name}</h4>
                                                            </Col>
                                                        </Row>
                                                        <Row justify={"start"} align={"middle"}>
                                                            <Col style={{ paddingTop: 10 }}>
                                                                <Text strong>By {course?.teacher?.firstname} {course?.teacher?.lastname}</Text>
                                                            </Col>
                                                        </Row>
                                                        <Row justify={"start"} align={"middle"}>
                                                            <Col style={{ paddingTop: 2 }}>
                                                                <Text strong>
                                                                    {
                                                                        course?.type === true ?
                                                                            "Public Course"
                                                                            :
                                                                            "Private Course"
                                                                    }
                                                                </Text>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col style={{ paddingTop: 15, paddingBottom: 10 }}>
                                                                <Text >{course?.detail}</Text>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Row style={{ paddingTop: "2%", }}>
                                                    <Col style={{ width: "100%" }}>
                                                        <Button
                                                            disabled={!passedCondition}
                                                            type="primary"
                                                            size="large"
                                                            block
                                                            onClick={
                                                                () => registered ? handleOpenCourse() : handleAddCourse()
                                                            }
                                                        >
                                                            {
                                                                registered ?
                                                                    (
                                                                        "Go to Course"
                                                                    )
                                                                    :
                                                                    (
                                                                        "Add Course"
                                                                    )
                                                            }

                                                        </Button>
                                                    </Col>
                                                </Row>

                                                {/* </Card> */}
                                            </Col>
                                        </Row>
                                        {
                                            course && course?.type === false ? renderConditionMobile() : null
                                        }
                                    </Col>
                                </Row>
                            </Card >
                        </Col >
                    </Row >
                </div>
            </div>
        )
    }

    const renderRegisterCourse = () => {
        if (isDesktopOrLaptop) return registerCoursePc()
        if (isTabletOrMobile) return registerCourseMobile()
    }

    return renderRegisterCourse()
}

export default RegisterCourse;