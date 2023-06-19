import { Avatar, Breadcrumb, Button, Card, Col, Image, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createActivity, getActivity, getCourse, getUser } from "../../../../function/Student/course";
import { listCondition } from "../../../../function/Student/condition";
import "./studentcourse.css";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";
import { getPrivateFieldImage } from "../../../../function/Student/topic";

const { Text, Title } = Typography
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"

const RegisterCourse = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState()
    const [plant, setPlant] = useState()
    const [registered, setRegistered] = useState(false)
    const [passedCondition, setPassedCondition] = useState(false)
    const [pageChange, setPageChange] = useState(false)
    const [conditionData, setConditionData] = useState([]);
    const [imageData, setImageData] = useState(null);

    const handleNavigate = (navStr, dataStage) => {
        console.log(dataStage)
        navigate(navStr, { state: dataStage })
    }

    const isPassCondition = async () => {
        // check registered
        await checkRegistered()
        // console.log(conditionData)

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
        await getActivity(sessionStorage.getItem("token"), null, `?search=user:${sessionStorage.getItem("user_id")},course:${params.id}&fetch=_id`)
            .then(
                (res) => {
                    const data = res.data.data
                    if (data) setRegistered(true)
                    console.log("check: ", data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const handleOpenCourse = () => {
        navigate(`/student/page/course/${params.id}`)
    }

    const handleAddCourse = async () => {

        if (!isPassCondition()) {
            // alert user or something
            console.log("????")
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
                    console.log(data)
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
                console.log("DATA: ", data)
                setConditionData(data);
                isPassCondition()
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
        await getCourse(sessionStorage.getItem("token"), params.id, `?fetch=name,detail,image,condition,teacher&pops=path:condition$populate:plant$select:plant maximum current,path:teacher$select:firstname lastname -_id`)
            .then(
                (res) => {
                    const data = res.data.data
                    console.log("Course", data)
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
        fetchUser()
        fetchCourse()
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
            <NavBarHome />
            <div style={{ width: "100%", marginTop: "100px", marginBottom: "50px" }}>
                <Row justify={"center"} >
                    <NavBarHome />
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
                                                            src={imageData ? imageData : DEFAULT_IMAGE}
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

                                    <Row style={{ paddingTop: "1%" }}>
                                        <Col flex={"auto"}>
                                            <Card >
                                                {
                                                    course?.condition && course?.condition.map(
                                                        (item) => (
                                                            <Row >
                                                                <Col style={{ paddingRight: "2%" }}>
                                                                    Plant: {item.plant.name}

                                                                </Col>
                                                                <Col>
                                                                    Amount:  {item.current} / {item.maximum}
                                                                </Col>
                                                            </Row>
                                                        )
                                                    )
                                                }
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
            </div>
        </div>
    )
}

export default RegisterCourse;