import React, { useEffect, useState } from "react";
import CardContent from "../../../ExamComponent/CardContent";
import { getExam, sendExam } from "../../../../function/Student/exam";
import { Button, Card, Col, Empty, Form, Row } from "antd";
import { useParams, useLocation } from "react-router-dom";

const DoExam = () => {
    const [exam, setExam] = useState({})
    const [infoData, setInfoData] = useState({})
    const [answer, setAnswer] = useState({})
    const actionMode = "Preview"

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
    console.log(answer)

    const submitExam = async () => {
        console.log(answer)
        await sendExam(sessionStorage.getItem("token"), location.state.activity, { answer: answer })
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
    }

    const renderPageNav = () => {
        return (
            <Row justify={"end"} style={{ height: "10%", marginBottom: "1%" }} >
                {/* {console.log("----> ",exam?.quiz)} */}
                {
                    currentPage > -1 ?
                        (
                            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Row>
                                    <Col>

                                        {
                                            exam?.quiz ?
                                                (
                                                    (
                                                        <Button type="primary" onClick={submitExam}>
                                                            Submit
                                                        </Button>
                                                    )
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

    const fetchExam = async () => {
        //&fetch=-answer
        await getExam(sessionStorage.getItem("token"), params?.id, `?field=quiz&check=enable`)
            .then(
                (res) => {
                    const data = res.data.data
                    console.log(res)
                    setExam(data)
                    setInfoData({
                        name: data.name,
                        detail: data.detail,
                    })
                    setPageStepLength(data.quiz.length)
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

    useEffect(() => {
        if (params?.id) fetchExam()
    }, [])
    return (
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
                            style={{ paddingTop: "2%" }}
                            form={form}
                            layout="vertical"
                            initialValues={{
                                requiredMarkValue: requiredMark,
                            }}
                            onValuesChange={onRequiredTypeChange}
                            requiredMark={requiredMark}
                        >
                            {/* {JSON.stringify(Object.keys(inputContentData).length)} */}
                            <Row justify={"center"}>
                                {/* <Col style={{ width: "5%" }} /> */}
                                {/* {console.log(selectedCard)} */}
                                <Col style={{ width: "95%" }} >
                                    <Row style={{ paddingTop: "1%" }}>
                                        <Col
                                            flex="auto"
                                        // style={{ height: "570px", }}
                                        >
                                            {console.log(exam)}
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
                                                        // null
                                                    )
                                                    :
                                                    (
                                                        <Card>
                                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                        </Card>
                                                    )

                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row justify={"space-between"} style={{ paddingTop: "0.5%", paddingLeft: "2.5%", paddingRight: "2.5%", paddingBottom: "0.5%" }}>
                    <Col flex={"auto"}>
                        {
                            exam?.quiz && exam?.quiz.length > 0 ?
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
    )
}

export default DoExam;