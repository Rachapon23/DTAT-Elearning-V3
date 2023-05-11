import React, { useEffect, useCallback, useMemo } from "react";
import { Card, Col, Layout, Row, Button, Typography, Breadcrumb, Steps, Form, } from 'antd';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../teach.css"
import { createExam, getExam, updateExam } from "../../../../function/Teacher/exame";

import ExamInfo from "./ExamInfo";
import ExamSelectCourse from "./ExamSelectCourse";
import ExamContent from "./ExamContent";
import ExamCreateFinished from "./ExamCreateFinished";

const { Title } = Typography;

const ExamCreate = ({ mode = null }) => {
    const location = useLocation()
    const [managementMode, setManagementMode] = useState(mode ? mode : location?.state?.mode)
    const examEditName = location?.state?.exam_name

    const [editExamLoaeded, setEditExamLoaeded] = useState(false)

    // do not use these variable to check before change mode, it may cause to mode cannot change 
    const createMode = mode && mode === "Create"
    const editMode = mode && mode === "Edit"
    const previewMode = mode && mode === "Preview"

    const examEditId = editMode ? location.pathname.split("/")[location.pathname.split("/").length - 1] : null
    const createSteps = useMemo(() => [
        {
            title: 'Select Course',
            content: 'First-content',
        },
        {
            title: 'Exam Info',
            content: 'Second-content',
        },
        {
            title: 'Content',
            content: 'Last-content',
        },
    ], [])
    const editSteps = useMemo(() => [
        {
            title: 'Exam Info',
            content: 'Second-content',
        },
        {
            title: 'Content',
            content: 'Last-content',
        },
    ], [])
    const pageStepLength = createMode ? createSteps.length + 1 : editMode ? editSteps.length + 1 : 0


    const [currentSelectedRadio, setCurentSelectedRadio] = useState(null)

    const [cousreWithOutQuiz, setCourseWithOutQuiz] = useState(null | {
        enabled: null,
        name: "",
        teacher: "",
        image: null,
        type: null,
        _id: "",
    })


    const [inputInfoData, setInputInfoData] = useState({
        name: "",
        course: "",
        detail: "",
        // teacher: "",  teacher data will add in backend
    })

    const inputContentTemplate = useMemo(() => (
        {
            question: "",
            answer: null,
            image: null,
            choices: [],
        }
    ), [])
    const [inputContentData, setInputContentData] = useState([])


    const [hasChanged, setHasChanged] = useState(false);

    const [createdCard, setCreatedCard] = useState(false);
    const [examCreated, setExamCreated] = useState(false);
    const [examId, setExamId] = useState(null);

    const examCreateTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >
                <Col>
                    <Breadcrumb
                        separator={<Title level={5} style={{ marginTop: "10px" }}> {">"} </Title>}
                        items={editMode || previewMode ?
                            [
                                {
                                    title: <Title level={5} style={{ marginTop: "10px" }}><p >Exam</p></Title>,
                                    key: "courses"
                                },
                                {
                                    title: <Title level={5} style={{ marginTop: "10px" }}><p>{managementMode} Exam</p></Title>,
                                    key: "courses_action",
                                },
                                {
                                    title: <Title level={5} style={{ marginTop: "10px" }}><p>{examEditName}</p></Title>,
                                    key: "courses_param",
                                }
                            ]
                            :
                            [
                                {
                                    title: <Title level={5} style={{ marginTop: "10px" }}><p >Exam</p></Title>,
                                    key: "courses"
                                },
                                {
                                    title: <Title level={5} style={{ marginTop: "10px" }}><p>{managementMode} Exam</p></Title>,
                                    key: "courses_action",
                                },
                            ]
                        }
                    />
                </Col>
                <Col style={{ paddingTop: "1px", paddingBottom: "1px", }}>
                    <Link to="/teacher/page/list-exam">
                        <Button>
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
        )
    }


    const handleAddCardContent = useCallback(() => {
        setInputContentData((prev) => [...prev, inputContentTemplate])
        // console.log(inputContentData)
        // setHasChanged(true)
        setCreatedCard(true)
    }, [inputContentTemplate])

    const onDeleteCardContent = useCallback((card_index) => {
        // const { [key]: removedProperty, ...updateData } = inputContentData;
        // setInputContentData(() => updateData)
        const prevCard = inputContentData.slice(0, card_index)
        const nextCard = inputContentData.slice(card_index + 1, inputContentData.length)

        setInputContentData(() => ([
            ...prevCard,
            ...nextCard
        ]))
        setHasChanged(true)
        setCreatedCard(false)
        // setCardContentList(cardContentList => cardContentList.filter(card => card.key !== String(index)))

    }, [inputContentData])

    const onChangeCardContent = useCallback((card_index, data) => {
        const prevCard = inputContentData.slice(0, card_index)
        const currentCard = {
            question: data.question !== undefined ? data.question : inputContentData[card_index]?.question,
            answer: data?.answer !== undefined ? data?.answer : inputContentData[card_index]?.answer,
            image: data?.image !== undefined ? data?.image : inputContentData[card_index]?.image,
            choices: data?.choices !== undefined ? data?.choices : inputContentData[card_index]?.choices,
        }
        const nextCard = inputContentData.slice(card_index + 1, inputContentData.length)
        setInputContentData(() => [
            ...prevCard,
            currentCard,
            ...nextCard,
        ])
        setHasChanged(true)
    }, [inputContentData])

    const onAddCardChoice = useCallback(async (card_index) => {

        const prevCard = inputContentData.slice(0, card_index)
        const currentCard = {
            question: inputContentData[card_index]?.question,
            answer: inputContentData[card_index]?.answer,
            image: inputContentData[card_index]?.image,
            choices: [
                ...inputContentData[card_index].choices,
                "",
            ],
        }
        const nextCard = inputContentData.slice(card_index + 1, inputContentData.length)
        setInputContentData(() => ([
            ...prevCard,
            currentCard,
            ...nextCard
        ]))

        setHasChanged(true)
    }, [inputContentData])

    const onRemoveCardChoice = useCallback((card_index, choice_index) => {
        // const { [key]: removedProperty, ...updateData } = inputContentData;
        // const { [choice_uuid]: removedChoice, ...updatedChoice } = inputContentData[card_uuid].choices
        // const { [card_uuid]: removedCard, ...updatedCard } = inputContentData
        // console.log("delete:", choice_index)
        console.log(inputContentData[card_index].choices.slice(0, choice_index), " to ", inputContentData[card_index].choices.slice(choice_index + 1, inputContentData[card_index].choices.length))
        const prevCard = inputContentData.slice(0, card_index)
        const currentCard = {
            question: inputContentData[card_index]?.question,
            answer: choice_index === inputContentData[card_index]?.answer ? null : inputContentData[card_index]?.answer,
            image: inputContentData[card_index]?.image,
            choices: [
                ...inputContentData[card_index].choices.slice(0, choice_index),
                ...inputContentData[card_index].choices.slice(choice_index + 1, inputContentData[card_index].choices.length),
            ],
        }
        const nextCard = inputContentData.slice(card_index + 1, inputContentData.length)

        setInputContentData(() => ([
            ...prevCard,
            currentCard,
            ...nextCard
        ]))
        setHasChanged(true)
    }, [inputContentData])

    const handleChangeChoiceAnswer = useCallback((card_index, data) => {
        const prevCard = inputContentData.slice(0, card_index)
        const currentCard = {
            question: inputContentData[card_index]?.question,
            answer: data?.answer !== undefined ? data?.answer : inputContentData[card_index]?.answer,
            image: inputContentData[card_index]?.image,
            choices: [
                ...inputContentData[card_index].choices
            ],
        }
        const nextCard = inputContentData.slice(card_index + 1, inputContentData.length)

        setInputContentData(() => ([
            ...prevCard,
            currentCard,
            ...nextCard
        ]))
        setHasChanged(true)
    }, [inputContentData])

    const handleChangeChoiceQuestion = useCallback((card_index, choice_index, data) => {
        const prevCard = inputContentData.slice(0, card_index)
        const currentCard = {
            question: inputContentData[card_index]?.question,
            answer: inputContentData[card_index]?.answer,
            image: inputContentData[card_index]?.image,
            choices: [
                ...inputContentData[card_index].choices.slice(0, choice_index),
                data,
                ...inputContentData[card_index].choices.slice(choice_index + 1, inputContentData[card_index].choices.length),
            ],
        }
        const nextCard = inputContentData.slice(card_index + 1, inputContentData.length)

        setInputContentData(() => ([
            ...prevCard,
            currentCard,
            ...nextCard
        ]))
        setHasChanged(true)
    }, [inputContentData])



    const handleUploadImage = useCallback((card_index, data) => {
        const prevCard = inputContentData.slice(0, card_index)
        const currentCard = {
            question: inputContentData[card_index]?.question,
            answer: inputContentData[card_index]?.answer,
            image: data,
            choices: inputContentData[card_index].choices,
        }
        const nextCard = inputContentData.slice(card_index + 1, inputContentData.length)
        setInputContentData(() => [
            ...prevCard,
            currentCard,
            ...nextCard,
        ])
        setHasChanged(true)
    }, [inputContentData])



    // const handleInputInfoData = (e) => {
    //     setInputInfoData((inputInfoData) => ({ ...inputInfoData, [e.target.id]: e.target.value }))
    // }


    // const filterCourse = (data) => {
    //     if(!data) return
    //     console.log(data)
    // }


    const [currentPage, setCurrentPage] = useState(0);

    const steps = useMemo(() => {
        const createMode = mode && mode === "Create"
        const editMode = mode && mode === "Edit"
        const previewMode = mode && mode === "Preview"

        if (createMode) return createSteps
        if (editMode) return editSteps
    }, [mode, createSteps, editSteps])

    const items = steps ? steps.map((item) => ({
        key: item.title,
        title: item.title,
    })) : null



    // const [displayMode, setDisplayMode] = useState("List");


    const fetchExam = useCallback(async () => {
        await getExam(sessionStorage.getItem("token"), examEditId)
            .then(
                (res) => {
                    const data = res.data.data
                    setInputInfoData(() => ({
                        course: data?.course,
                        detail: data?.detail,
                        name: data?.name,
                    }))
                    // console.log(data?.quiz)
                    setInputContentData(data?.quiz ? data?.quiz : [])
                    setEditExamLoaeded(true)

                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }, [examEditId])

    const renderDisplay = useCallback(() => {
        const createMode = mode && mode === "Create"
        const editMode = mode && mode === "Edit"
        const previewMode = mode && mode === "Preview"
        const actioModeNotFound = <>Action mode does not exit</>
        switch (currentPage) {
            case 0:
                if (createMode) {
                    return (
                        <ExamSelectCourse
                            inputInfoData={inputInfoData}
                            onSetCousreWithOutQuiz={setCourseWithOutQuiz}
                            // onSetInputInfoData={handleInputInfoData}
                            onSetInputInfoData={setInputInfoData}
                            onSetCurentSelectedRadio={setCurentSelectedRadio}
                        />
                    );
                }
                else if (editMode || previewMode) {
                    // console.log("dispaly: ", managementMode)
                    return (
                        <ExamInfo
                            actionMode={managementMode}
                            cousreWithOutQuiz={cousreWithOutQuiz}
                            onSetInputInfoData={setInputInfoData}
                            inputInfoData={inputInfoData}
                            currentSelectedRadio={currentSelectedRadio}
                        />
                    );
                }
                else return actioModeNotFound
            case 1:
                if (createMode) {
                    return (
                        <ExamInfo
                            actionMode={managementMode}
                            cousreWithOutQuiz={cousreWithOutQuiz}
                            onSetInputInfoData={setInputInfoData}
                            inputInfoData={inputInfoData}
                            currentSelectedRadio={currentSelectedRadio}
                        />
                    );
                }
                else if (editMode || previewMode) {
                    return (
                        <ExamContent
                            examId={examEditId}
                            actionMode={managementMode}
                            onCreatedCard={createdCard}
                            inputInfoData={inputInfoData}
                            inputContentData={inputContentData}
                            onAddCardContent={handleAddCardContent}
                            onDeleteCardContent={onDeleteCardContent}
                            onChangeCardContent={onChangeCardContent}
                            onAddCardChoice={onAddCardChoice}
                            onRemoveCardChoice={onRemoveCardChoice}
                            handleChangeChoiceAnswer={handleChangeChoiceAnswer}
                            handleChangeChoiceQuestion={handleChangeChoiceQuestion}
                            handleUploadImage={handleUploadImage}
                            inputContentTemplate={inputContentTemplate}
                        />
                    );
                }
                else return actioModeNotFound
            case 2:
                if (createMode) {
                    return (
                        <ExamContent
                            examId={examId}
                            actionMode={managementMode}
                            onCreatedCard={createdCard}
                            inputInfoData={inputInfoData}
                            inputContentData={inputContentData}
                            onAddCardContent={handleAddCardContent}
                            onDeleteCardContent={onDeleteCardContent}
                            onChangeCardContent={onChangeCardContent}
                            onAddCardChoice={onAddCardChoice}
                            onRemoveCardChoice={onRemoveCardChoice}
                            handleChangeChoiceAnswer={handleChangeChoiceAnswer}
                            handleChangeChoiceQuestion={handleChangeChoiceQuestion}
                            handleUploadImage={handleUploadImage}
                            inputContentTemplate={inputContentTemplate}
                        />
                    )
                }
                else if (editMode) return <ExamCreateFinished setCurrentPage={setCurrentPage} />
                else return actioModeNotFound
            case 3:
                if (createMode) return (<ExamCreateFinished setCurrentPage={setCurrentPage} />)
                else return
            default: return (<>404 Not Found...</>);
        }
    }, [mode, currentPage, inputInfoData, managementMode, cousreWithOutQuiz, currentSelectedRadio, examEditId, createdCard, inputContentData, handleAddCardContent, onDeleteCardContent, onChangeCardContent, onAddCardChoice, onRemoveCardChoice, handleChangeChoiceAnswer, handleChangeChoiceQuestion, handleUploadImage, inputContentTemplate, examId])

    const submmitCreateExam = useCallback(async () => {
        const examData = {
            head: inputInfoData,
        }
        // console.log(examData)
        await createExam(sessionStorage.getItem("token"), examData)
            .then(
                (res) => {
                    // console.log(res.data.data._id)
                    setExamId(res.data.data._id)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }, [inputInfoData])

    const submmitUpdateExam = useCallback(async () => {
        let status;
        const examData = {
            head: inputInfoData,
            body: inputContentData,
        }
        // console.log(examId)
        await updateExam(sessionStorage.getItem("token"), examEditId, examData)
            .then(
                (res) => {
                    console.log(res.data.data)
                    status = true
                    // setExamId(res.data.data._id)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
        return status
    }, [examEditId, examId, inputContentData, inputInfoData])

    const handleDisplay = useCallback((e) => {
        const createMode = managementMode === "Create"
        const editMode = managementMode === "Edit"
        const previewMode = managementMode === "Preview"

        if (e) {
            const action = e.target.innerText

            if (action === "Next" || action === "Create") {
                if (currentPage + 1 <= pageStepLength) {
                    setCurrentPage(currentPage + 1);
                }
                if (createMode && createSteps[currentPage].title === "Exam Info" && !examCreated) {
                    submmitCreateExam()
                    setExamCreated(true)
                }
                // setKeyword("")

            }
            else if (action === "Previous") {
                if (currentPage - 1 >= 0) {
                    // console.log(pageList[currentPage - 1])
                    setCurrentPage(currentPage - 1);
                }
                // setKeyword("")

            }
            else if ((createMode || editMode) && action === "Done") {
                let success = submmitUpdateExam()
                // setKeyword("")
                if (success) {
                    setCurrentPage(pageStepLength - 1)
                }

            }
            setHasChanged(true)
        }
        // console.log("HEY UPDATED")
        // setCurrentDisplay(pageList[currentPage]);

    }, [createSteps, currentPage, examCreated, managementMode, pageStepLength, submmitCreateExam, submmitUpdateExam])

    // console.log(currentPage, examCreated, pageList)

    useEffect(() => {
        // console.log("re render")
        handleDisplay()
        if (examEditId && !editExamLoaeded) fetchExam()

        return () => {
            setHasChanged(false)
            setCreatedCard(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasChanged, currentPage, managementMode, examEditId, editMode, editExamLoaeded])

    // in the future may use this
    // const isExamValid = useCallback(() => {
    //     let result = true
    //     result &&= (currentSelectedRadio !== null)

    //     return result
    // }, [])

    console.log(managementMode)
    const handleRenderPagebyMode = () => {
        // console.log(managementMode)

        console.log(inputContentData, inputInfoData)
        if (managementMode === "Preview") return setManagementMode(() => "Edit")
        if (managementMode === "Edit") return setManagementMode(() => "Preview")
    }

    const renderPageNav = () => {
        return (
            <Row justify={"space-between"} style={{ height: "10%", marginBottom: "1%" }} >
                {/* {JSON.stringify(currentPage)} */}
                {
                    currentPage !== pageStepLength - 1 ?
                        (
                            <>
                                <Col>
                                    <Button onClick={handleRenderPagebyMode}>
                                        {
                                            managementMode === "Edit" ? "Preview" :
                                                managementMode === "Preview" ? "Edit" :
                                                    "Preview"
                                        }
                                    </Button>
                                </Col>

                                <Col>
                                    <Row>
                                        <Col style={{ paddingRight: "10px", }}>
                                            {
                                                currentPage > 0 ? <Button onClick={handleDisplay}>Previous</Button> : null
                                            }
                                        </Col>
                                        <Col>
                                            {
                                                createMode ?
                                                    (
                                                        <Button type="primary"
                                                            disabled={currentSelectedRadio === null}
                                                            onClick={handleDisplay}
                                                        >
                                                            {currentPage === pageStepLength - 2 ? "Done" : createSteps[currentPage].title === "Exam Info" ? "Create" : "Next"}
                                                        </Button>
                                                    )
                                                    :
                                                    (
                                                        editMode ?
                                                            (
                                                                <Button
                                                                    type="primary"
                                                                    onClick={handleDisplay}
                                                                >
                                                                    {currentPage === pageStepLength - 2 ? "Done" : "Next"}
                                                                </Button>
                                                            )
                                                            :
                                                            ("Action mode not found")
                                                    )
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </>
                        )
                        :
                        (
                            null
                        )
                }
            </Row >
        )
    }


    return (
        <Layout className="layout-content-create">
            <Row className="content">

                <Col flex="auto" style={{ justifyContent: "center" }}>
                    <Card title={examCreateTitle()} className="card-create">
                        {
                            editMode || createMode ?
                                (
                                    <Row>
                                        <Steps items={items} current={currentPage} />
                                    </Row>
                                )
                                :
                                (null)
                        }
                        <Row
                            className="row-con"
                            justify="center"
                        // style={{ paddingTop: "0.5%" }}
                        >
                            <Col flex={"auto"} className="col-con">
                                {renderDisplay()}
                            </Col>
                        </Row>
                    </Card>
                </Col>

            </Row>
            <Row className="btn-bottom">
                <Col flex={"auto"}>
                    {currentPage < pageStepLength ? renderPageNav() : null}
                </Col>
            </Row>

        </Layout>
    )
}

export default ExamCreate;