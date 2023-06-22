import React, { useEffect, useCallback, useMemo } from "react";
import { Card, Col, Layout, Row, Button, Typography, Breadcrumb, Steps, } from 'antd';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../teach.css"
import { createExam, getExam, updateExam } from "../../../../function/Teacher/exam";

import ExamInfo from "./ExamInfo";
import ExamSelectCourse from "./ExamSelectCourse";
import ExamContent from "./ExamContent";
import ExamCreateFinished from "./ExamCreateFinished";
import { debounce } from "lodash";

const { Title } = Typography;

const ExamCreate = ({ mode = null, resetData = false }) => {

    const location = useLocation()
    const [managementMode, setManagementMode] = useState(mode ? mode : location?.state?.mode)
    const [mainManagementMode] = useState(managementMode)
    const [examEditName] = useState(location?.state?.exam_name)
    const [editExamLoaeded, setEditExamLoaeded] = useState(false)
    const [validContent, setValidContent] = useState(false)

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
        enable: false,
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

    const submmitUpdateExam = useCallback(async () => {
        let status;
        const examData = {
            head: inputInfoData,
            body: inputContentData,
        }
        const id = mainManagementMode === "Edit" ? examEditId :
            mainManagementMode === "Create" ? examId : null

        if (!id) return

        await updateExam(sessionStorage.getItem("token"), id, examData)
            .then(
                (res) => {
                    // console.log(res.data.data)
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
    }, [examEditId, examId, inputContentData, inputInfoData, mainManagementMode])


    const onUpdateExam = useCallback(async (id, examData) => {
        // this function use in auto save operation
        if (!id) id = examEditId
        if (!id) return
        // if(!validContent) return

        await updateExam(sessionStorage.getItem("token"), id, examData)
            .then(
                (res) => {
                    const data = res.data.data
                    // console.log(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }, [])

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
                null,
            ],
        }
        const nextCard = inputContentData.slice(card_index + 1, inputContentData.length)
        setInputContentData(() => ([
            ...prevCard,
            currentCard,
            ...nextCard
        ]))
        setValidContent(false)

        setHasChanged(true)
    }, [inputContentData])

    const onRemoveCardChoice = useCallback((card_index, choice_index) => {
        // const { [key]: removedProperty, ...updateData } = inputContentData;
        // const { [choice_uuid]: removedChoice, ...updatedChoice } = inputContentData[card_uuid].choices
        // const { [card_uuid]: removedCard, ...updatedCard } = inputContentData
        // console.log("delete:", choice_index)
        // console.log(inputContentData[card_index].choices.slice(0, choice_index), " to ", inputContentData[card_index].choices.slice(choice_index + 1, inputContentData[card_index].choices.length))
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

    const handleChangeChoiceAnswer = useCallback((card_id, card_index, data) => {
        // console.log(inputContentData, card_index)
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
        // console.log(inputContentData, card_index)
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
        await getExam(sessionStorage.getItem("token"), examEditId, `?field=quiz`)
            .then(
                (res) => {
                    const data = res.data.data
                    setInputInfoData(() => ({
                        enable: data?.enable,
                        course: data?.course,
                        detail: data?.detail,
                        name: data?.name,
                    }))
                    // console.log(data)
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
                            onSetInputContentData={setInputContentData}
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
        let id = null
        const examData = {
            head: inputInfoData,
        }
        // console.log("exam data: ",examData)
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
        return id
    }, [inputInfoData])

    const debounceOnChange = useCallback(debounce(onUpdateExam, 500), [])

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

                // noraml condition is Exam Info
                if (createMode && createSteps[currentPage].title === "Select Course" && !examCreated) {
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
                // un-comment line below to return to the normal mode
                // let success = submmitUpdateExam()
                // setKeyword("")
                // if (success) {
                setCurrentPage(pageStepLength - 1)
                // }
            }
            setHasChanged(true)
        }

        // remove if below to return to normal mode
        if (
            createSteps[currentPage]?.title === "Content" ||
            editSteps[currentPage]?.title === "Content" ||
            createSteps[currentPage]?.title === "Exam Info" ||
            editSteps[currentPage]?.title === "Exam Info"
        ) {
            debounceOnChange(
                examId,
                {
                    head: inputInfoData,
                    body: inputContentData,
                }
            )
        }

    }, [createSteps, currentPage, debounceOnChange, editSteps, examCreated, examId, inputContentData, inputInfoData, managementMode, pageStepLength, submmitCreateExam])

    useEffect(() => {
        // console.log("re render")
        handleDisplay()
        if (examEditId && !editExamLoaeded) fetchExam()

        return () => {
            setHasChanged(false)
            setCreatedCard(false)
        }

        // remove inputInfoData to return to the normal mode
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasChanged, currentPage, managementMode, examEditId, editMode, editExamLoaeded, inputInfoData])


    // in the future may use this
    // const isExamValid = useCallback(() => {
    //     let result = true
    //     result &&= (currentSelectedRadio !== null)

    //     return result
    // }, [])

    // console.log(managementMode)
    const handleRenderPagebyMode = () => {
        // console.log(managementMode, mainManagementMode)
        switch (managementMode) {
            case "Edit":
                // console.log("set to preview")
                return setManagementMode("Preview")
            case "Create":
                // console.log("set to preview")
                return setManagementMode("Preview")
            case "Preview":
                // console.log("set to",mainManagementMode)
                return setManagementMode(mainManagementMode)
            default:
        }
    }

    const pageValidation = (pageNumber) => {
        switch (pageNumber) {
            case 0:
                if (currentSelectedRadio === null || currentSelectedRadio === undefined) return false
                return true
            case 1:
                if (inputInfoData.name.length <= 0) return false
                return true
            case 2:
                return true
            default: return false
        }
    }

    const renderPageNav = () => {
        return (
            <Row justify={"space-between"} style={{ height: "10%", marginBottom: "1%" }} >
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

                                {/* <Col>
                                    <Button
                                        onClick={() => console.log(inputInfoData, inputContentData)}
                                    >
                                        Debug
                                    </Button>
                                </Col> */}

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
                                                            disabled={!pageValidation(currentPage)}
                                                            onClick={handleDisplay}
                                                        >
                                                            {/* Exam Info */}
                                                            {
                                                                currentPage === pageStepLength - 2 ?
                                                                    "Done" : createSteps[currentPage].title === "Select Course" && !examId ?
                                                                        "Create" : "Next"
                                                            }
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
        <Layout className="layout-content-card">
            <Row className="content">

                <Col flex="auto" style={{ justifyContent: "center" }}>
                    <Card title={examCreateTitle()} className="card-shadow">
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