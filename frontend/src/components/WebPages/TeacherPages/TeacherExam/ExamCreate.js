import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined, BarsOutlined, AppstoreOutlined, InfoCircleOutlined, CloseOutlined, PictureOutlined, UpOutlined, DownOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Table, Segmented, Badge, Alert, Breadcrumb, Steps, Form, Radio, Image, Empty, Affix, Result } from 'antd';
import NavBar from "../../../Layout/NavBar"
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import CardContent from "./CardContent";
import "../teach.css"
import { createExam, getCourseWoQuiz, getExam, updateExam } from "../../../../function/Teacher/exame";

import ExamInfo from "./ExamInfo";
import ExamSelectCourse from "./ExamSelectCourse";
import ExamContent from "./ExamContent";
import ExamCreateFinished from "./ExamCreateFinished";


const { Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;



const ExamCreate = ({ mode = null }) => {
    const location = useLocation()
    const managementMode = mode ? mode : location?.state?.mode
    const exam_edit_name = location?.state?.exam_name
    const [examEditId, setExamEditId] = useState(null)

    const [currentSelectedRadio, setCurentSelectedRadio] = useState(null)

    const [cousreWithOutQuiz, setCourseWithOutQuiz] = useState(null | {
        enabled: null,
        name: "",
        teacher: "",
        image: null,
        type: null,
        _id: "",
    })


    // const [exam, setExam] = useState({
    //     _id: null,
    //     course: null,
    //     name: null,
    //     detail: null,
    //     quiz: [],
    //     teacher: null,
    // })


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

    // const [image, setImage] = useState([{
    //     uid: '0',
    //     name: 'xxx.png',
    //     status: "done",//'uploading',
    //     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     // percent: 33,
    // }])


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
                        items={managementMode === "Edit" ?
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
                                    title: <Title level={5} style={{ marginTop: "10px" }}><p>{exam_edit_name}</p></Title>,
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

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };







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
        // console.log("add", inputContentData)
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
        // console.log(data)
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



    const handleInputData = (e) => {
        setInputInfoData((inputInfoData) => ({ ...inputInfoData, [e.target.id]: e.target.value }))
    }


    // const filterCourse = (data) => {
    //     if(!data) return
    //     console.log(data)
    // }

    // const selectCourse = useMemo(() => (

    // ), [form, requiredMark])

    const [currentPage, setCurrentPage] = useState(0);
    const [pageList, setPageList] = useState([
        <ExamSelectCourse
            onSetCousreWithOutQuiz={setCourseWithOutQuiz}
            onSetInputInfoData={setInputInfoData}
            onSetCurentSelectedRadio={setCurentSelectedRadio}

        />,
        <ExamInfo
            actionMode={"Create"}
            cousreWithOutQuiz={cousreWithOutQuiz}
            onSetInputInfoData={setInputInfoData}
            currentSelectedRadio={currentSelectedRadio}
        />,
        <ExamContent />,
        <ExamCreateFinished />
    ])
    const [currentDisplay, setCurrentDisplay] = useState(pageList[0]);

    const steps = useMemo(() => {
        if (managementMode === "Create") {
            return [
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
            ];
        }
        if (managementMode === "Edit") {
            return [
                {
                    title: 'Exam Info',
                    content: 'Second-content',
                },
                {
                    title: 'Content',
                    content: 'Last-content',
                },
            ];
        }
    }, [managementMode])
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));



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
                    setInputContentData(data?.quiz)

                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }, [examEditId])

    const renderDisplay = () => {
        switch (currentPage) {
            case 0: return (
                <ExamSelectCourse
                    inputInfoData={inputInfoData}
                    onSetCousreWithOutQuiz={setCourseWithOutQuiz}
                    onSetInputInfoData={setInputInfoData}
                    onSetCurentSelectedRadio={setCurentSelectedRadio}
                />
            );
            case 1: return (
                <ExamInfo
                    actionMode={"Create"}
                    cousreWithOutQuiz={cousreWithOutQuiz}
                    onSetInputInfoData={setInputInfoData}
                    inputInfoData={inputInfoData}
                    currentSelectedRadio={currentSelectedRadio}
                />
            );
            case 2: return (< ExamContent />);
            case 3: return (<ExamCreateFinished />);
            default: return (<>404 Not Found...</>);
        }
    }

    const submmitCreateExam = useCallback(async () => {
        const examData = {
            head: inputInfoData,
        }
        console.log(examData)
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
        console.log(examId)
        await updateExam(sessionStorage.getItem("token"), examId, examData)
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
    }, [examId, inputContentData, inputInfoData])

    const handleDisplay = useCallback((mode) => {
        if (mode) {
            if (mode.target.innerText === "Next") {
                if (currentPage + 1 <= pageList.length) {
                    setCurrentPage(currentPage + 1);
                    console.log("mext")
                }
                // if (currentPage === 1 && currentPage + 1 === 2 && !examCreated) {
                //     submmitCreateExam()
                //     setExamCreated(true)
                // }
                // setKeyword("")

            }
            else if (mode.target.innerText === "Previous") {
                if (currentPage - 1 >= 0) {
                    // console.log(pageList[currentPage - 1])
                    setCurrentPage(currentPage - 1);
                }
                // setKeyword("")

            }
            else if (mode.target.innerText === "Done") {
                let success = submmitUpdateExam()
                // setKeyword("")
                if (success) {
                    setCurrentPage(pageList.length - 1)
                }

            }
            setHasChanged(true)
        }
        // console.log("HEY UPDATED")
        // setCurrentDisplay(pageList[currentPage]);

    }, [currentPage, pageList, submmitUpdateExam])

    // console.log(currentPage, examCreated, pageList)

    useEffect(() => {
        handleDisplay()
        // if (currentPage === 0 && currentDisplay === pageList[0]) {
        //     if (managementMode === "Create") {
        // fetchCourseWoQuiz()
        // setPageList(() => [selectCourse, examInfo, examContent, examCreateFinished])

        //     }
        //     if (managementMode === "Edit" ) {
        if (examEditId) fetchExam()
        //         
        // setPageList(() => [examInfo, examContent, examCreateFinished])
        //     }
        //     setCurrentDisplay(pageList[0])
        // }

        return () => {
            setHasChanged(false)
            setCreatedCard(false)
        }
    }, [hasChanged, currentPage, managementMode, handleDisplay, fetchExam, examEditId])


    const renderPageNav = () => {
        return (
            <Row justify={"space-between"} style={{ height: "10%", marginBottom: "1%" }} >
                {
                    currentPage !== pageList.length - 1 ?
                        (
                            <>
                                <Col>
                                    <Button onClick={() => console.log(cousreWithOutQuiz, inputInfoData, inputContentData)}> Preview</Button>
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
                                                managementMode === "Create" ?
                                                    (
                                                        <Button type="primary" //disabled={!selected} 
                                                            onClick={handleDisplay}>{currentPage === pageList.length - 2 ? "Done" : "Next"}</Button>
                                                    )
                                                    :
                                                    (
                                                        managementMode === "Edit" ?
                                                            (
                                                                <Button type="primary" onClick={handleDisplay}>{currentPage === pageList.length - 2 ? "Done" : "Next"}</Button>
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
            </Row>
        )
    }


    return (
        <Layout className="layout-content-create">
            {/* <NavBar page={"Exams"} /> */}
            {JSON.stringify(managementMode)}
            <Row className="content">

                <Col flex="auto" style={{ justifyContent: "center" }}>
                    <Card title={examCreateTitle()} className="card-create">
                        <Row justify="space-between">
                        </Row>
                        <Row>
                            <Steps items={items} current={currentPage} />
                        </Row>
                        <Row
                            className="row-con"
                            justify="center" style={{ paddingTop: "1%" }}>
                            <Col flex={"auto"} className="col-con">
                                {renderDisplay()}
                            </Col>
                        </Row>
                    </Card>
                </Col>

            </Row>
            <Row className="btn-bottom">
                <Col flex={"auto"}>
                    {currentPage < pageList.length ? renderPageNav() : null}
                </Col>
            </Row>

        </Layout>
    )
}

export default ExamCreate;