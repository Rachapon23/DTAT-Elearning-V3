import { Avatar, Breadcrumb, Button, Card, Col, Image, Progress, Row, Typography } from "antd";
import React, { createRef, useEffect, useState } from "react";
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

const { Text, Title } = Typography
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"

const RegisterCourse = () => {

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

    const handleNavigate = (navStr, dataStage) => {
        navigate(navStr, { state: dataStage })
    }

    const isPassCondition = async () => {
        // check registered
        await checkRegistered()
        console.log("conditionData: ", conditionData)
        if (
            Array.isArray(conditionData) &&
            conditionData.length === 0 &&
            course?.type === true
        ) return setPassedCondition(true)

        // check plant
        let inPlant = false
        for (let i = 0; i < conditionData.length; i++) {
            // console.log("condition: ", conditionData[i], " plant: ", plant)
            // console.log("plant: ", conditionData[i].plant.name, " plant: ", plant)
            if (conditionData[i].plant.name === plant) {
                inPlant = true
                break
            }
        }
        //TODO: check course limit
        // console.log("in plant: ", inPlant)
        setPassedCondition(inPlant)
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
            handleNavigate(`/student/page/course/${params.id}`, { tabIndex: 1 })
        }
        else {
            handleNavigate(`/student/page/course/${params.id}`, { tabIndex: 2 })
        }
    }

    const handleAddCourse = async () => {

        if (!isPassCondition()) {
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
                    console.log(err)
                }
            )
    }

    const handleUnloadImage = (e) => {
        e.target.src = DEFAULT_IMAGE
    }

    const fetchCondition = async (id) => {
        await listCondition(sessionStorage.getItem("token"), id)
            .then((res) => {
                const data = res.data
                // console.log("DATA: ", data)
                setConditionData(data);
                isPassCondition()
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
                    // console.log("calendar:  ",data)
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
                    setPlant(data.plant.name)
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
        await getCourse(sessionStorage.getItem("token"), params.id, `?fetch=name,detail,image,condition,teacher,type&pops=path:condition$populate:plant$select:plant maximum current,path:teacher$select:firstname lastname -_id`)
            .then(
                (res) => {
                    const data = res.data.data
                    console.log(data)
                    setCourse(data)
                    fetchCondition(data._id);
                    handleFetchImage(data.image.name)
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
        if (calendarAPI && even?.start) calendarAPI.gotoDate(even[0].start)
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
                    <Button onClick={() => handleNavigate("/student/page/home", { tabIndex: 4 })}>
                        Back
                    </Button>
                    {/* </Link> */}
                </Col>
            </Row>
        )
    }

    return (
        <div className="bg-st-course">
            <div style={{ width: "100%", marginTop: "20px", marginBottom: "50px" }}>
                <Row justify={"center"} >
                    <Col flex={"auto"} >
                        {/* style={{ padding: "2%", paddingTop: "4%" }} */}
                        <Card title={registerCourseTitle()}>
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
                                                    {/* <Col style={{ width: "2%" }} /> */}
                                                    {/* <Col flex={"auto"}>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    block
                                                    onClick={handleAddCourse}
                                                >
                                                    Start
                                                </Button>
                                            </Col> */}

                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>
                                    {
                                        course && course?.type === false ?
                                            (
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
                                                                                            <Progress percent={item.current / item.maximum} />
                                                                                        </Row>
                                                                                    </Col>
                                                                                </Row>
                                                                            )
                                                                        )
                                                                    }
                                                                </Col>
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
                                                            </Row>
                                                        </Card>
                                                    </Col>

                                                </Row>
                                            ) :
                                            (
                                                null
                                            )
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

export default RegisterCourse;