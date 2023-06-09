import React, { useEffect, useState } from "react";
import "./studenthome.css";
import { Button, Card, Image, Table } from "antd";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";
import CalendarShow from "../../CalendarPage/CalendarShow";

import DoExam from "../StudentExam/DoExam";

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { listActivity, listCourse } from "../../../../function/Student/course";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"

const StudentHomePage = () => {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    const handleNavigate = (navStr, dataStage) => {
        navigate(navStr, { state: dataStage })
    }

    const handleUnloadImage = (e) => {
        e.target.src = DEFAULT_IMAGE
    }

    const columns = (table) => {
        switch (table) {
            case "Course":
                return ([
                    {
                        title: "Image",
                        align: "center",
                        width: "20%",
                        render: (data) => {
                            return (
                                <Image
                                    preview={false}
                                    width={150}
                                    onError={handleUnloadImage}
                                    src={data?.course?.image?.url ? (process.env.REACT_APP_IMG + data?.course?.image?.url) : DEFAULT_IMAGE}
                                />
                            )
                        }
                    },
                    {
                        title: `course`,
                        render: (data) => data?.course?.name
                    },

                    {
                        title: `score`,
                        align: "center",
                        render: (data) => {
                            if (!data?.score_value && data?.result === 0) return "waiting for test"
                            if (!data?.score_value && data?.result !== 0) return "No examination"
                            return data?.score_value
                        }
                    },

                    {
                        title: `max score`,
                        align: "center",
                        render: (data) => {
                            if (!data?.score_max && data?.result === 0) return "waiting for test"
                            if (!data?.score_max && data?.result !== 0) return "No examination"
                            return data?.score_max

                        }
                    },
                    {
                        title: `Action`,
                        align: "center",
                        width: "10%",
                        render: (data) => {
                            // console.log(data?.course?._id)
                            return (
                                <Link to={`/student/page/course/${data?.course?._id}`} state={{ mode: "Preview", exam_name: data?.name }}><Button onClick={null}> Course </Button></Link>
                            )
                        }
                    },
                    {
                        title: `Action`,
                        align: "center",
                        width: "10%",
                        render: (data) => {
                            console.log(data?.course?.exam)
                            return (
                                <Button
                                    disabled={!data?.course?.exam}
                                    onClick={() => handleNavigate(`/student/page/exam/${data?.course?.exam}`, { activity: data?._id })}
                                >
                                    Exam
                                </Button>

                            )
                        }
                    },
                ])
            case "History":
                return ([
                    {
                        title: "Image",
                        align: "center",
                        width: "20%",
                        render: (data) => {
                            return (
                                <Image
                                    preview={false}
                                    width={150}
                                    onError={handleUnloadImage}
                                    src={data?.course?.image?.url ? (process.env.REACT_APP_IMG + data?.course?.image?.url) : DEFAULT_IMAGE}
                                />
                            )
                        }
                    },
                    {
                        title: `course`,
                        render: (data) => data?.course?.name
                    },

                    {
                        title: `score`,
                        align: "center",
                        render: (data) => {
                            if (!data?.score_value && data?.result === 0) return "waiting for test"
                            if (!data?.score_value && data?.result !== 0) return "No examination"
                            return data?.score_value
                        }
                    },

                    {
                        title: `max score`,
                        align: "center",
                        render: (data) => {
                            if (!data?.score_max && data?.result === 0) return "waiting for test"
                            if (!data?.score_max && data?.result !== 0) return "No examination"
                            return data?.score_max

                        }
                    },
                    {
                        title: `result`,
                        align: "center",
                        // dataIndex: "result",
                        width: "10%",
                        render: (data) => {
                            if (data?.result === 0) return "Not evaluate"
                            if (data?.result === 1) return "Not pass"
                            if (data?.result === 2) return "Pass"
                        }
                    },
                    {
                        title: `Action`,
                        align: "center",
                        width: "10%",
                        render: (data) => {
                            // console.log(data?.course?._id)
                            return (
                                <Link to={`/student/page/course/${data?.course?._id}`} state={{ mode: "Preview", exam_name: data?.name }}><Button onClick={null}> Course </Button></Link>
                            )
                        }
                    },
                    {
                        title: `Action`,
                        align: "center",
                        width: "10%",
                        render: (data) => {
                            console.log(data?.course?.exam)
                            return (
                                <Button
                                    disabled={!data?.course?.exam}
                                    onClick={() => handleNavigate(`/student/page/exam/${data?.course?.exam}`, { activity: data?._id })}
                                >
                                    Exam
                                </Button>

                            )
                        }
                    },
                ])
            default: return null
        }
    }

    const fetchActivity = async () => {
        // search=user:${sessionStorage.getItem("user_id")}&
        // do not forget to add pops allowed field in activity backend
        await listActivity(sessionStorage.getItem("token"), `?search=user:${sessionStorage.getItem("user_id")}&fetch=-ans,-__v&pops=path:course$select:name exam image`)
            .then(
                (res) => {
                    const data = res.data.data
                    setCourses(data)
                    console.log(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(() => {
        fetchActivity()
    }, [])

    return (
        <div className="bg-st-home">
            <NavBarHome />
            <div className="content-home">
                <div className="">
                    <p className="label-home-st" htmlFor="">My Course</p>
                    <Button onClick={() => handleNavigate(`/student/page/browes-course`)}>Browes Course</Button>
                    <Table
                        columns={columns("Course")}
                        dataSource={courses.filter((item) => item.result === 0)}
                        className="table-student"
                        pagination={{
                            defaultPageSize: 20,
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "30"],
                        }}
                    />
                </div>
                <div className="">
                    <p htmlFor="" className="label-home-st">My History</p>
                    <Table
                        columns={columns("History")}
                        dataSource={courses.filter((item) => item.result !== 0)}
                        className="table-student"
                        pagination={{
                            defaultPageSize: 20,
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "30"],
                        }}
                    />
                </div>
                <div className="">
                    <p htmlFor="" className="label-home-st">Calendar</p>
                    <Card>
                        <CalendarShow />
                    </Card>
                </div>
            </div>

        </div>
    );
};

export default StudentHomePage;
