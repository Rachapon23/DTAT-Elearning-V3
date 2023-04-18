import React, { useEffect, useRef } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined, BarsOutlined, AppstoreOutlined, InfoCircleOutlined, CloseOutlined, PictureOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Table, Segmented, Badge, Alert, Breadcrumb, Steps, Form, Radio, Image, Empty, Affix, } from 'antd';
import NavBar from "../../../Layout/NavBar"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CardContent from "./CardContent";
import "../teach.css"

const { Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;



const ExamCreate = () => {
    const examCreateTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >
                <Col>
                    <Breadcrumb
                        separator={<Title level={5} style={{ marginTop: "10px" }}> {">"} </Title>}
                        items={[
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p >My Exam</p></Title>,
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
                    <Link to="/teacher/page/listexam">
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

    const coursesData = [
        {
            key: "A",
            course: "A",
            type: "Public",
            status: "Avialable",
            image: (<Image height={80} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />),
            select: false
        },
        {
            key: "B",
            course: "B",
            type: "Public",
            status: "Avialable",
            image: (<Image height={80} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />),
            select: false
        },
        {
            key: "C",
            course: "C",
            type: "Private",
            status: "Avialable",
            image: (<Image height={80} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />),
            select: false
        },
    ]

    const coursesCol = [
        {
            title: "Image",
            dataIndex: 'image',
            key: 'image',
            align: "center",
            width: "15%",
        },
        {
            title: "Course",
            dataIndex: 'course',
            key: 'course',
            width: "50%"
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            align: "center",
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            align: "center",
        },
        {
            title: "Select",
            dataIndex: 'select',
            key: 'select',
            align: "center",
            width: "10%",
            render: (_, obj) => {
                if (!selected[coursesData.indexOf(obj)] && selected.length < coursesData.length) {
                    selected.push(false)
                }
                // console.log(obj,Number(selected.indexOf(obj)))
                // console.log(selected)
                return <Radio checked={selected[Number(coursesData.indexOf(obj))]} onChange={(e) => handleRadioChange(e, Number(coursesData.indexOf(obj)))}></Radio>
            },
        },

    ]

    const examInfoCol = [
        {
            title: "Image",
            dataIndex: 'image',
            key: 'image',
            align: "center",
            width: "15%",
        },
        {
            title: "Course",
            dataIndex: 'course',
            key: 'course',
            width: "50%"
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            align: "center",
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            align: "center",
        },
    ]

    const [container, setContainer] = useState(null);
    const [cardContentList, setCardContentList] = useState([<CardContent/>, <CardContent/>, <CardContent/>,])
    const handleCreateContent = () => {
        setCardContentList([...cardContentList, <CardContent/>])
    }

  

    const cardEmptyContent = (
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
    )

    const examContent = (
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
            <Row justify={"center"}>
                {/* <Col style={{ width: "5%" }} /> */}
                <Col style={{ width: "95%" }}>
                    <Row style={{ paddingTop: "1%" }} >
                        <Col
                            flex="auto"
                            // style={{ height: "570px", }}

                        >
                            {
                                cardContentList.length === 0 ? (
                                    cardEmptyContent
                                ) :
                                    (
                                        cardContentList.map((card) => (
                                            card
                                        ))
                                    )

                            }
                        </Col>
                        <Col style={{ paddingLeft: "1%" }}>
                            <Affix target={() => container} onChange={(affixed) => console.log(affixed)} >

                                <Card className="card-nlf">
                                    <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
                                        <Col flex={"auto"}>
                                            <Row justify={"center"} >
                                                <Button type="text" onClick={handleCreateContent} >New</Button>
                                            </Row>
                                            <Row justify={"center"}>
                                                <Button type="text" >Link</Button>
                                            </Row>
                                            <Row justify={"center"}>
                                                <Button type="text" >File</Button>
                                            </Row>
                                        </Col>
                                    </Row>

                                </Card>

                            </Affix>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Form>
    )


    const [selected, setSelected] = useState([]);
    const [currentSelected, setCurentSelected] = useState(null)

    const examInfo = (
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
                    {console.log()}
                    <Form.Item label="Selected Course" required tooltip="This is a required field">
                        {/* <Card> */}
                        <Row align={"middle"} justify={"space-between"}>
                            <Col style={{ width: "100%", height: "160px" }}>
                                <Table
                                    dataSource={
                                        currentSelected === null ? null : coursesData.slice(currentSelected, currentSelected + 1)
                                    }
                                    columns={examInfoCol} pagination={false}
                                />
                            </Col>
                        </Row>
                        {/* </Card> */}
                    </Form.Item>

                    <Form.Item label="Exam Name" required tooltip="This is a required field">
                        <Input placeholder="input placeholder" />
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
                            placeholder="can resize"
                        />
                    </Form.Item>

                </Col>
            </Row>

        </Form>
    )


    const handleRadioChange = (e, index) => {
        if (!currentSelected) {
            selected.splice(index, 1, true)
            setCurentSelected(index)
            setSelected([...selected])
        }
        if (currentSelected !== index) {
            selected.splice(currentSelected, 1, false)
            selected.splice(index, 1, true)
            setCurentSelected(index)
            setSelected([...selected])
        }

    }


    const handleRowSelect = (e, index) => {
        if (e.target.innerText === "Preview") return
        handleRadioChange(null, index)
    }

    let courseAmount = coursesData.length;
    let pageSize = 4
    const [currentCoursePage, setCurrentCoursePage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const handleSearch = (e) => {
        setKeyword(`${e.target.value.toLowerCase()}`)
        setCurrentCoursePage(1)
    }

    const filterCourse = (data) => data.filter((item) => {
        return item.course.toLowerCase().indexOf(keyword) >= 0;
    }).slice(pageSize * (currentCoursePage - 1), (pageSize * (currentCoursePage - 1)) + pageSize)


    const selectCourse = (
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
                        <Table style={{ paddingTop: "1%" }} dataSource={filterCourse(coursesData)} columns={coursesCol} onRow={(rec, index) => {
                            return {
                                onClick: (e) => handleRowSelect(e, index),
                            }
                        }} />
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    )

    const pageList = [selectCourse, examInfo, examContent, (<div>HI</div>)]
    const [currentDisplay, setCurrentDisplay] = useState(pageList[0]);
    const [currentPage, setCurrentPage] = useState(0);
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

    const handleDisplay = (mode) => {
        if (mode) {
            if (mode.target.innerText === "Next") {

                // if(currentPage + 1 <= pageList.length) {
                // console.log(pageList[currentPage + 1])
                setCurrentPage(currentPage + 1);
                // }
                setKeyword("")

            }
            else if (mode.target.innerText === "Previous") {
                // if(currentPage - 1 > 1) {
                // console.log(pageList[currentPage - 1])
                setCurrentPage(currentPage - 1);
                // }
                setKeyword("")

            }

        }
        setCurrentDisplay(pageList[currentPage]);
    }

    useEffect(() => {
        handleDisplay()
    }, [currentPage, selected, keyword, cardContentList])

    const renderDisplay = () => {
        return currentDisplay
    }

    const renderPageNav = () => {
        return (
            <Row justify={"space-between"} style={{ height: "10%", }} >
                <Col>
                    <Button> Preview</Button>
                </Col>

                <Col>
                    <Row>
                        <Col style={{ paddingRight: "10px", }}>
                            <Button onClick={handleDisplay}>Previous</Button>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={handleDisplay}>{currentPage === pageList.length - 1 ? "Done" : "Next"}</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }


    return (
        <Layout  className="layout-content-create">
            {/* <NavBar page={"Exams"} /> */}
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
                            <Col flex={"auto"} className="col-con"
                             ref={setContainer}>
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