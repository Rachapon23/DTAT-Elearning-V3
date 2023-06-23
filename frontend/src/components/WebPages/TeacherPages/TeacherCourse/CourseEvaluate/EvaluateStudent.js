import { Breadcrumb, Button, Card, Col, Layout, Row, Select, Table, Typography, message } from "antd";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { listActivity } from "../../../../../function/Teacher/course";
import { updateActivityResult } from "../../../../../function/Teacher/course";
import "../../teach.css";
const { Title } = Typography

const EvaluateStudent = () => {
    const navigate = useNavigate()
    const param = useParams()

    const [activity, setActivity] = useState([])
    const [selectedEvaluate, setSelectedEvaluate] = useState(0)
    const [pageChange, setPageChange] = useState(false)


    const handleNavigate = (navStr, dataStage) => {
        navigate(navStr, { state: dataStage })
    }

    const handleEvaluate = async (activityIndex, value, user_id) => {
        message.info(`Evaluate as ${value}`);

        if (!user_id) return
        if (value === undefined) return

        await updateActivityResult(
            sessionStorage.getItem("token"),
            activity[activityIndex]._id,
            {
                user: user_id,
                result: value,
            }
        )
            .then(
                (res) => {
                    const data = res.data.data
                    setPageChange(true)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    };

    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
        setSelectedEvaluate(e?.key)
    };

    const columns = [
        {
            title: `Employee ID`,
            render: (data) => data?.user?.employee
        },
        {
            title: "Nmae",
            render: (data) => `${data?.user?.firstname} ${data?.user?.lastname}`
        },
        {
            title: `score`,
            align: "center",
            render: (data) => data?.score_value ? data?.score_value : "waiting for test"
        },

        {
            title: `max score`,
            align: "center",
            render: (data) => data?.score_max ? data?.score_max : "waiting for test"
        },
        {
            title: `Evaluate`,
            align: "center",
            width: "13%",
            render: (data) => {
                const user_id = data?.user?._id
                const activityIndex = activity.indexOf(data)
                return (
                    <Select
                        // defaultValue={0}
                        value={data?.result}
                        style={{
                            width: "100%",
                        }}
                        onChange={(value) => handleEvaluate(activityIndex, value, user_id)}
                        options={[
                            {
                                value: 0,
                                label: 'Not evaluate',
                            },
                            {
                                value: 1,
                                label: 'Not pass',
                            },
                            {
                                value: 2,
                                label: 'Pass',
                            },
                            {
                                value: 'disabled',
                                label: 'Disabled',
                                disabled: true,
                            },
                        ]}
                    />

                )
            }
        },
        {
            title: `Action`,
            align: "center",
            render: (data) => {
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


    ];

    const CourseEvaluateTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"}>
                <Col>
                    {/* <p style={{ marginTop: "10px" }}>List Course</p> */}
                    <Breadcrumb
                        separator={
                            <Title level={5} style={{ marginTop: "10px" }}>
                                {" "}
                                {">"}
                                {" "}
                            </Title>
                        }
                        items={[
                            {
                                title: (
                                    <Title level={5} style={{ marginTop: "10px" }}>
                                        <p>Course</p>
                                    </Title>
                                ),
                                key: "course",
                            },
                            {
                                title: (
                                    <Title level={5} style={{ marginTop: "10px" }}>
                                        <p>Evaluate Student</p>
                                    </Title>
                                ),
                                key: "evaluate student",
                            },
                        ]}
                    />
                </Col>
                <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
                    <Button onClick={() => navigate(-1)}>Back</Button>
                </Col>
            </Row>
        );
    };

    const fetchActivity = async () => {
        // search=user:${sessionStorage.getItem("user_id")}&
        // do not forget to add pops allowed field in activity backend
        await listActivity(sessionStorage.getItem("token"), `?search=course:${param.id}&fetch=-ans,-__v&pops=path:course$select:name exam,path:user$select:employee firstname lastname`)
            .then(
                (res) => {
                    const data = res.data.data
                    setActivity(data)
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
        return () => {
            setPageChange(false)
        }
    }, [pageChange])

    return (
        <Layout >
            <Row>
                <Col flex="auto" style={{ display: "flex", justifyContent: "center" }}>
                    <Card
                        title={CourseEvaluateTitle()}
                        style={{ maxWidth: "100%" }}>
                        <Row justify="center">
                            <Col flex={"auto"} style={{ width: "2000px" }}>
                                <Table
                                    columns={columns}
                                    dataSource={activity}
                                    pagination={{
                                        defaultPageSize: 20,
                                        showSizeChanger: true,
                                        pageSizeOptions: ["10", "20", "30"],
                                    }}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Layout>
    )
}

export default EvaluateStudent;




