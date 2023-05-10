import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined, BarsOutlined, AppstoreOutlined, InfoCircleOutlined, CloseOutlined, PictureOutlined, UpOutlined, DownOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Table, Segmented, Badge, Alert, Breadcrumb, Steps, Form, Radio, Image, Empty, Affix, Result } from 'antd';
import NavBar from "../../../Layout/NavBar"
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import CardContent from "./CardContent";
import "../teach.css"
import { createExam, getCourseWoQuiz, updateExam } from "../../../../function/Teacher/exame";


const { Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;



const ExamCreate = ({ mode = null }) => {
    const location = useLocation()
    const managementMode = mode ? mode : location?.state?.mode
    const pageSize = 4

    const [cousresWithOutQuiz, setCousresWithOutQuiz] = useState(null | [{
        enabled: null,
        name: "",
        teacher: "",
        image: null,
        type: null,
        _id: "",
    }])
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
    const [firstLoad, setFirstLoad] = useState(false);
    const [createdCard, setCreatedCard] = useState(false);
    const [examCreated, setExamCreated] = useState(false);
    const [examId, setExamId] = useState(null);

    const examCreateTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >
                <Col>
                    <Breadcrumb
                        separator={<Title level={5} style={{ marginTop: "10px" }}> {">"} </Title>}
                        items={[
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p >Exam</p></Title>,
                                key: "courses"
                            },
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p>Create Exam</p></Title>,
                                key: "courses_create",
                            },
                        ]}
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

    const [selected, setSelected] = useState("");
    const [currentSelected, setCurentSelected] = useState(null)

    const handleRadioChange = (data) => {
        setCurentSelected(data?.index)
        setSelected(data?._id) // may remove later
        setInputInfoData(prev => ({ ...prev, course: data?._id }))
    }



    const coursesCol = useMemo(() => ([
        {
            title: "Image",
            dataIndex: 'image',
            key: 'image',
            align: "center",
            width: "15%",
        },
        {
            title: "Course",
            dataIndex: 'name',
            key: 'name',
            width: "50%",
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            align: "center",
            render: (type) => type === true ? "Public" : "Private",
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (status) => status === true ? "Disable" : "Eanble",
        },
        {
            title: "Select",
            align: "center",
            width: "10%",
            render: (data) => {
                return <Radio checked={selected === data?._id} onChange={(e) => handleRadioChange({ checked: e?.target?.checked, _id: data?._id, index: cousresWithOutQuiz.indexOf(data) })} />
            },
        },
    ]), [cousresWithOutQuiz, selected])

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

    const handleCreateContent = useCallback(() => {
        setInputContentData((prev) => [...prev, inputContentTemplate])
        // console.log(inputContentData)
        setHasChanged(true)
        setCreatedCard(true)
    }, [inputContentTemplate])

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

    const cardEmptyContent = useMemo(() => (
        <Card>
            <Row justify={"center"}>
                <Col>
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        // style={{height: "100%"}}
                        description={
                            <span>
                                No Content
                            </span>
                        }
                    >
                        <Button type="primary" onClick={handleCreateContent}>Create Now</Button>
                    </Empty>
                </Col>
            </Row>
        </Card >
    ), [handleCreateContent])

    const examContent = useMemo(() => (
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
                            {
                                Object.keys(inputContentData).length === 0 ?
                                    (
                                        cardEmptyContent
                                    ) :
                                    (
                                        Object.keys(inputContentData).map((key, index) => (
                                            <CardContent
                                                key={key}
                                                uuid={key}
                                                index={index}
                                                head={inputInfoData}
                                                data={inputContentData[key]}
                                                examID={examId}
                                                onCreate={createdCard}
                                                onDelete={onDeleteCardContent}
                                                onChange={onChangeCardContent}
                                                onAddChoice={onAddCardChoice}
                                                onRemoveChoice={onRemoveCardChoice}
                                                onChangeChoiceAnswer={handleChangeChoiceAnswer}
                                                onChangeChoiceQuestion={handleChangeChoiceQuestion}
                                                onUploadImage={handleUploadImage}
                                            />
                                        ))
                                    )

                            }
                        </Col>
                        <Col style={{ paddingLeft: "1%" }} >

                            {
                                Object.keys(inputContentData).length !== 0 ?
                                    (
                                        <Card className="card-nlf">
                                            <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
                                                <Col flex={"auto"}>
                                                    <Row justify={"center"} >
                                                        <Tooltip title={"Add topic"} placement="left">
                                                            <Button type="text" onClick={handleCreateContent} >
                                                                <PlusSquareOutlined style={{ fontSize: "140%" }} />
                                                            </Button>
                                                        </Tooltip>
                                                    </Row>
                                                    <Row justify={"center"}>
                                                        <Tooltip title={"Go to top page"} placement="left" >
                                                            <Button type="text" onClick={() => window.scrollTo(0, 0)}>
                                                                <UpOutlined style={{ fontSize: "140%" }} />
                                                            </Button>
                                                        </Tooltip>
                                                    </Row>
                                                    <Row justify={"center"}>
                                                        <Tooltip title={"Go to buttom page"} placement="left">
                                                            <Button type="text" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                                                                <DownOutlined style={{ fontSize: "140%" }} />
                                                            </Button>
                                                        </Tooltip>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card>
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

        </Form>
    ), [cardEmptyContent, createdCard, examId, form, handleChangeChoiceAnswer, handleChangeChoiceQuestion, handleCreateContent, handleUploadImage, inputContentData, inputInfoData, onAddCardChoice, onChangeCardContent, onDeleteCardContent, onRemoveCardChoice, requiredMark])

    const handleInputData = (e) => {
        setInputInfoData((inputInfoData) => ({ ...inputInfoData, [e.target.id]: e.target.value }))
    }

    const examInfo = useMemo(() => (
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
            <Row >
                <Col style={{ width: "100%" }}>
                    <Form.Item label="Selected Course" required tooltip="This is a required field">
                        {/* <Card> */}
                        <Row align={"middle"} justify={"space-between"}>
                            <Col style={{ width: "100%", height: "160px" }}>
                                <Table
                                    dataSource={
                                        currentSelected === null ? null : cousresWithOutQuiz.slice(currentSelected, currentSelected + 1)
                                    }
                                    columns={coursesCol}
                                    pagination={false}
                                />
                            </Col>
                        </Row>
                        {/* </Card> */}
                    </Form.Item>

                    <Form.Item label="Exam Name" required tooltip="This is a required field">
                        <Input
                            placeholder="Exam name"
                            id="name"
                            onChange={handleInputData}
                            defaultValue={inputInfoData?.name}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Detail"
                        tooltip={{
                            title: 'Tooltip with customize icon',
                            icon: <InfoCircleOutlined />,
                        }}
                    >
                        <TextArea
                            showCount
                            maxLength={250}
                            style={{ height: 120 }}
                            id="detail"
                            onChange={handleInputData}
                            placeholder="Detail"
                            defaultValue={inputInfoData?.detail}
                        />
                    </Form.Item>

                </Col>
            </Row>

        </Form>
    ), [coursesCol, cousresWithOutQuiz, currentSelected, form, inputInfoData?.detail, inputInfoData?.name, requiredMark])

    const examCreateFinished = useMemo(() => (
        <Row align={"middle"} justify={"center"} style={{ height: "400px" }}>
            <Col >
                <Result
                    status="success"
                    title="Successfully Purchased Cloud Server ECS!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Link to="/teacher/page/listexam">
                            <Button type="primary" key="console" onClick={() => setCurrentPage(0)}>
                                Back To List Exam
                            </Button>
                        </Link>,
                        // <Button key="buy">Buy Again</Button>,
                    ]}
                />
            </Col>
        </Row>
    ), [])

    const handleRowSelect = useCallback((e, index) => {
        if (e.target.innerText === "Preview") return
        handleRadioChange({ _id: cousresWithOutQuiz[index]._id, index: index })
    }, [cousresWithOutQuiz])


    const [currentCoursePage, setCurrentCoursePage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const handleSearch = (e) => {
        setKeyword(`${e.target.value.toLowerCase()}`)
        setCurrentCoursePage(1)
    }

    const filterCourse = useCallback((data) => {
        if (!data) return
        return data.filter((item) => {
            return item?.name?.toLowerCase().indexOf(keyword) >= 0;
        }).slice(pageSize * (currentCoursePage - 1), (pageSize * (currentCoursePage - 1)) + pageSize)
    }, [currentCoursePage, keyword])

    // const filterCourse = (data) => {
    //     if(!data) return
    //     console.log(data)
    // }

    const selectCourse = useMemo(() => (
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
            <Row >
                <Col style={{ width: "100%" }}>
                    <Form.Item label="Select Course" required tooltip="This is a required field">
                        <Input placeholder="Search course" prefix={<SearchOutlined />} onChange={handleSearch} />
                        <Table style={{ paddingTop: "1%" }} dataSource={filterCourse(cousresWithOutQuiz)} columns={coursesCol} onRow={(_, index) => {
                            // console.log("sdd",rec, index)
                            return {
                                onClick: (e) => handleRowSelect(e, index),
                            }
                        }} />
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    ), [coursesCol, cousresWithOutQuiz, filterCourse, form, handleRowSelect, requiredMark])

    const [currentPage, setCurrentPage] = useState(0);
    const pageList = useMemo(() => [selectCourse, examInfo, examContent, examCreateFinished], [examContent, examCreateFinished, examInfo, selectCourse])
    const [currentDisplay, setCurrentDisplay] = useState(pageList[0]);
    const steps = [
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
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));



    // const [displayMode, setDisplayMode] = useState("List");

    const fetchCourseWoQuiz = async () => {
        await getCourseWoQuiz(sessionStorage.getItem("token"))
            .then(
                (res) => {
                    const data = res.data.data;
                    setCousresWithOutQuiz(data);
                    setFirstLoad(true);
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const renderDisplay = () => {
        return currentDisplay
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
                }
                if (currentPage === 1 && currentPage + 1 === 2 && !examCreated) {
                    submmitCreateExam()
                    setExamCreated(true)
                }
                setKeyword("")

            }
            else if (mode.target.innerText === "Previous") {
                if (currentPage - 1 >= 0) {
                    // console.log(pageList[currentPage - 1])
                    setCurrentPage(currentPage - 1);
                }
                setKeyword("")

            }
            else if (mode.target.innerText === "Done") {
                let success = submmitUpdateExam()
                setKeyword("")
                if (success) {
                    setCurrentPage(pageList.length - 1)
                }

            }
            // setHasChanged(true)
        }
        setCurrentDisplay(pageList[currentPage]);
    }, [currentPage, examCreated, pageList, submmitCreateExam, submmitUpdateExam])

    // console.log(currentPage, examCreated, pageList)

    useEffect(() => {
        if (currentPage === 0 && currentDisplay === pageList[0]) fetchCourseWoQuiz()
        handleDisplay()
        return () => {
            setHasChanged(false)
            setCreatedCard(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasChanged, firstLoad, selected, currentPage, handleDisplay])


    const renderPageNav = () => {
        return (
            <Row justify={"space-between"} style={{ height: "10%", marginBottom: "1%" }} >
                {
                    currentPage !== pageList.length - 1 ?
                        (
                            <>
                                <Col>
                                    <Button onClick={() => console.log(currentSelected, inputInfoData, inputContentData)}> Preview</Button>
                                </Col>

                                <Col>
                                    <Row>
                                        <Col style={{ paddingRight: "10px", }}>
                                            {
                                                currentPage > 0 ? <Button onClick={handleDisplay}>Previous</Button> : null
                                            }
                                        </Col>
                                        <Col>
                                            <Button type="primary" disabled={!selected} onClick={handleDisplay}>{currentPage === pageList.length - 2 ? "Done" : "Next"}</Button>
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