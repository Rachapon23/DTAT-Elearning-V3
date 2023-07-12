import React, { useEffect, useState } from "react";
import CardContent from "../../../common/ExamCard/CardContent";
import { getExam, sendExam } from "../../../../function/Student/exam";
import { Button, Card, Col, Empty, Form, Modal, Row, Typography } from "antd";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getActivity } from "../../../../function/Student/course";
import "../StudentCourse/studentcourse.css";

const { Title, Text } = Typography

const DoExam = () => {
    const [exam, setExam] = useState({})
    const [infoData, setInfoData] = useState({})
    const [answer, setAnswer] = useState({})
    const [openConfirmSubmit, setOpenConfirmSubmit] = useState(false)
    const [result, setResult] = useState(null)
    const actionMode = "Preview"
    const navigate = useNavigate();

    const [currentPage] = useState(0);
    const [pageStepLength, setPageStepLength] = useState(0)
    const params = useParams()
    const location = useLocation()
    const [error, setError] = useState(null)

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };


    const handleChangeChoiceAnswer = (quiz_id, card_index, data) => {
        console.log(card_index, data)
        // const prevCard = answer.slice(0, card_index)
        // const currentCard = data?.answer
        // const nextCard = answer.slice(card_index + 1, answer.length)

        setAnswer((prev) => ({ ...prev, [`${quiz_id}`]: data?.answer }))
        // setHasChanged(true)
    }

    const submitExam = async () => {
        await sendExam(sessionStorage.getItem("token"), location?.state?.activity, { answer: answer })
            .then(
                (res) => {
                    const data = res.data.data
                    console.log(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
        navigate(`/student/page/home`, { tabIndex: 1 })
    }

    const renderPageNav = () => {
        return (
            <Row justify={"end"} style={{ height: "10%", marginBottom: "1%" }} >
                {
                    currentPage > -1 ?
                        (
                            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Row>
                                    <Col>

                                        {
                                            exam?.quiz ?
                                                (
                                                    <>
                                                        <Button type="primary" onClick={() => setOpenConfirmSubmit(true)}>
                                                            Submit
                                                        </Button>
                                                        <Modal title="Notification" open={openConfirmSubmit} onOk={submitExam} onCancel={() => setOpenConfirmSubmit(false)} closable={false} >
                                                            Are you sure to submit this exam
                                                        </Modal>
                                                    </>
                                                )
                                                :
                                                (
                                                    null
                                                )
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        )
                        :
                        (
                            null
                        )
                }
            </Row >
        )
    }

    const fetchActivity = async (course_id) => {
        await getActivity(
            sessionStorage.getItem("token"),
            null,
            `?search=user:${sessionStorage.getItem("user_id")},course:${course_id}&fetch=completed,score_value,score_max`
        )
            .then(
                (res) => {
                    const data = res.data.data
                    setResult(data)
                    console.log("da dadadadadad: ", data)
                }
            )
            .catch(
                (err) => {
                    const errorMsg = err.response.data.error
                    setError(errorMsg)
                    console.log(err)
                    // console.log(err)
                }
            )
    }

    const fetchExam = async () => {
        // fetch from activity instead
        //&fetch=-answer
        await getExam(sessionStorage.getItem("token"), params?.id, `?field=quiz&check=enable`)
            .then(
                (res) => {
                    const data = res.data.data
                    // console.log(res)
                    setExam(data)
                    setInfoData({
                        name: data.name,
                        detail: data.detail,
                    })
                    // setPageStepLength(data.quiz.length)
                    if (data.course) fetchActivity(data.course)
                }
            )
            .catch(
                (err) => {
                    const errorMsg = err.response.data.error
                    setError(errorMsg)
                    console.log(err)
                    // console.log(err)
                }
            )
    }

    const renderContentPc = () => {
        // if (!result) return <>Please wait...</>
        if (!result?.completed) {
            return (
                <Col flex="auto">
                    {
                        exam?.quiz && exam?.quiz.length > 0 ?
                            (
                                exam.quiz.map((item, index) => (
                                    <CardContent
                                        key={item._id}
                                        index={index}
                                        head={infoData}
                                        actionMode={actionMode}
                                        data={{ ...item, answer: answer[`${item._id}`] }}
                                        examID={exam._id}
                                        onChangeChoiceAnswer={handleChangeChoiceAnswer}
                                    />
                                ))
                            )
                            :
                            (
                                <Card>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </Card>
                            )
                    }
                </Col>
            )
        }
        else {
            return (
                <Col flex={"auto"}>
                    <Card>
                        <Row justify={"center"}>
                            <Title level={4}>You already done this exam</Title>
                        </Row>
                        <Row justify={"center"}>
                            <Text>Your scoure is {result.score_value} / {result.score_max}</Text>
                        </Row>
                        <Row justify={"center"} style={{ paddingTop: "20px" }}>
                            <Button type="primary" onClick={() => navigate("/student/page/home")}>Back to My Course</Button>
                        </Row>
                    </Card>
                </Col>
            )
        }
    }

    const renderContentMobile = () => {
        if (!result) return <>Please wait...</>
        if (result?.completed) {
            return (
                <Col flex={"auto"}>
                    <Card>
                        <Row justify={"center"}>
                            <Title level={4}>You already done this exam</Title>
                        </Row>
                        <Row justify={"center"}>
                            <Text>Your scoure is {result.score_value} / {result.score_max}</Text>
                        </Row>
                        <Row justify={"center"} style={{ paddingTop: "20px" }}>
                            <Button type="primary" onClick={() => navigate(-1)}>Back to Course</Button>
                        </Row>
                    </Card>
                </Col>
            )
        }
        else {
            return (
                <Col flex="auto">
                    {
                        exam?.quiz && exam?.quiz.length > 0 ?
                            (
                                exam.quiz.map((item, index) => (
                                    <Col style={{ paddingTop: 5 }}>
                                        <CardContent
                                            key={item._id}
                                            index={index}
                                            head={infoData}
                                            actionMode={actionMode}
                                            data={{ ...item, answer: answer[`${item._id}`] }}
                                            examID={exam._id}
                                            onChangeChoiceAnswer={handleChangeChoiceAnswer}
                                        />
                                    </Col>
                                ))
                            )
                            :
                            (
                                <Card>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </Card>
                            )
                    }
                </Col>
            )
        }
    }

    useEffect(() => {
        if (params?.id) fetchExam()
    }, [])

    const doExamPc = () => {
        return (
            <div className="bg-st-course">
                {/* <NavBarHome /> */}
                <div className="content-home">
                    <Row>
                        <Col flex={"auto"}>
                            <Row justify={"center"}>
                                <Col flex={"auto"} style={{ paddingLeft: "2.5%", paddingRight: "2.5%", paddingTop: "2%" }}>
                                    <Card >
                                        {
                                            infoData?.name && infoData?.detail ?
                                                (
                                                    <>
                                                        <p><h5>{infoData?.name}</h5></p>
                                                        <br></br>
                                                        {infoData?.detail}
                                                    </>
                                                )
                                                :
                                                (
                                                    <Row justify={"center"}>
                                                        <Col >
                                                            {
                                                                error ?
                                                                    (
                                                                        <h4>{error}</h4>
                                                                    ) :
                                                                    (
                                                                        <h4>No Exam Info</h4>
                                                                    )
                                                            }
                                                        </Col>
                                                    </Row>
                                                )
                                        }
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col flex={"auto"}>
                                    <Form
                                        style={{ paddingTop: "1%" }}
                                        form={form}
                                        layout="vertical"
                                        initialValues={{
                                            requiredMarkValue: requiredMark,
                                        }}
                                        onValuesChange={onRequiredTypeChange}
                                        requiredMark={requiredMark}
                                    >
                                        <Row justify={"center"}>
                                            <Col style={{ width: "95%" }} >
                                                <Row style={{ paddingTop: "1%" }}>
                                                    {
                                                        renderContentPc()
                                                    }
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                            <Row justify={"space-between"} style={{ paddingTop: "0.5%", paddingLeft: "2.5%", paddingRight: "2.5%", paddingBottom: "0.5%" }}>
                                <Col flex={"auto"}>
                                    {
                                        !result?.completed && exam?.quiz && exam?.quiz.length > 0 ?
                                            (
                                                renderPageNav()
                                            )
                                            :
                                            (
                                                null
                                            )
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>

        )
    }

    const doExamMobile = () => {
        return (
            <div style={{ width: '100%' }}>
                <Row style={{ width: 350 }}>
                    <Col flex={"auto"}>
                        <Row justify={"center"}>
                            <Col flex={"auto"} >
                                <Card style={{ width: '100%' }}>
                                    {
                                        infoData?.name && infoData?.detail ?
                                            (
                                                <>
                                                    <p><h5>{infoData?.name}</h5></p>
                                                    <br></br>
                                                    {infoData?.detail}
                                                </>
                                            )
                                            :
                                            (
                                                <Row justify={"center"}>
                                                    <Col >
                                                        {
                                                            error ?
                                                                (
                                                                    <h4>{error}</h4>
                                                                ) :
                                                                (
                                                                    <h4>No Exam Info</h4>
                                                                )
                                                        }
                                                    </Col>
                                                </Row>
                                            )
                                    }
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col flex={"auto"}>
                                <Form
                                    style={{ paddingTop: "1%" }}
                                    form={form}
                                    layout="vertical"
                                    initialValues={{
                                        requiredMarkValue: requiredMark,
                                    }}
                                    onValuesChange={onRequiredTypeChange}
                                    requiredMark={requiredMark}
                                >
                                    <Row justify={"center"}>
                                        <Col style={{ width: "100%" }} >
                                            <Row style={{ paddingTop: "1%" }}>
                                                {
                                                    renderContentMobile()
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                        <Row justify={"space-between"} >
                            <Col flex={"auto"} style={{ paddingTop: 5 }}>
                                {
                                    !result?.completed && exam?.quiz && exam?.quiz.length > 0 ?
                                        (
                                            renderPageNav()
                                        )
                                        :
                                        (
                                            null
                                        )
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        )
    }

    const renderDoExam = () => {
        if (false) return doExamPc()
        if (true) return doExamMobile()
    }

    return renderDoExam()

}

export default DoExam;