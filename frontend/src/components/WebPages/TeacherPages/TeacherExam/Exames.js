import React, { useEffect } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined, BarsOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Table, Segmented, Badge, Alert } from 'antd';
import NavBar from "../../../Layout/NavBar"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

const Quizes = () => {
    const myQuizesTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >
                <Col>
                    <Title level={5} style={{ marginTop: "10px" }}>My Quizes</Title>
                </Col>
                <Col style={{ paddingTop: "1px", paddingBottom: "1px", }}>
                    <Link to="/teacher/exams/create">
                        <Button>
                            Create
                        </Button>
                    </Link>
                </Col>
            </Row>
        )
    }

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };

    const data = [
        {
            key: '1',
            name: 'Introduction of Docker',
            // age: 32,
            address: 'New York No. 1 Lake Park',
            exam: "Introduction of Docker Final test",
            edit: <Button>Edit</Button>,
            delete: <Button>Delete</Button>,
        },
        {
            key: '2',
            name: 'Basic of IoT',
            // age: 42,
            address: 'London No. 1 Lake Park',
            exam: "Basic of IoT Final test",
            edit: <Button>Edit</Button>,
            delete: <Button>Delete</Button>,
        },
        {
            key: '3',
            name: 'Arduino',
            // age: 32,
            address: 'Sydney No. 1 Lake Park',
            exam: "Arduino Final test",
            edit: <Button>Edit</Button>,
            delete: <Button>Delete</Button>,
        },
        {
            key: '4',
            name: 'Software Engineer',
            // age: 32,
            address: 'London No. 2 Lake Park',
            exam: "Software Engineer Final test",
            status: "Enable",
            edit: <Button>Edit</Button>,
            delete: <Button>Delete</Button>,
        },
    ];

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.key - b.key,
            sortOrder: sortedInfo.columnKey === 'key' ? sortedInfo.order : null,
            ellipsis: true,
            width: '10%',

        },
        {
            title: 'Course',
            dataIndex: 'name',
            key: 'name',
            width: '35%',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        // {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     key: 'age',
        //     sorter: (a, b) => a.age - b.age,
        //     sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
        //     ellipsis: true,
        // },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        //     filters: [
        //         {
        //             text: 'London',
        //             value: 'London',
        //         },
        //         {
        //             text: 'New York',
        //             value: 'New York',
        //         },
        //     ],
        //     filteredValue: filteredInfo.address || null,
        //     onFilter: (value, record) => record.address.includes(value),
        //     sorter: (a, b) => a.address.length - b.address.length,
        //     sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
        //     ellipsis: true,
        // },
        {
            title: 'Exam',
            dataIndex: 'exam',
            key: 'exam',
            width: '35%',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            align: 'center',
            width: '10%',
        }
    ];




    const cardData = (
        <div style={{ paddingTop: "1%" }}>
            <Card
                hoverable
                style={{
                    width: "450px",
                }}
                cover={<img alt="example" src="/book-main-img-3.png" />}
            >
                <Meta title="Course" description="This is a description of a course" />
            </Card>
        </div>
    )
    const arrayCrad = [cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData]
    const listDisplay = (<Table columns={columns} dataSource={data} onChange={handleChange} />);
    const kanbanDisplay = (
        <div className="row">
            {
                arrayCrad.map((card) => card)
            }
        </div>
    );

    const [currentDisplay, setCurrentDisplay] = useState(listDisplay);
    const [displayMode, setDisplayMode] = useState("List");

    const handleDisplay = (mode) => {

        if (!mode) {
            mode = displayMode;
        }
        else {
            setDisplayMode(mode);
        }
        switch (mode) {
            case "List": setCurrentDisplay(listDisplay); break;
            case "Kanban": setCurrentDisplay(kanbanDisplay); break;
            default: setCurrentDisplay(listDisplay);
        }
        // console.log(currentDisplay)
    }

    useEffect(() => {
        handleDisplay()
    }, [displayMode])

    const renderDisplay = () => {
        return currentDisplay
    }

    return (
        <Layout>
            <NavBar page={"Exams"} />
            <Row style={{ backgroundColor: "white" }}>
                <Col sm={2} />
                <Col flex="auto" style={{ paddingTop: "2%", display: "flex", justifyContent: "center" }}>
                    <Card title={myQuizesTitle()} style={{ minHeight: "770px", marginBottom: "2%", maxWidth: "83.3%", }}>
                        <Row justify="space-between" style={{ marginBottom: "1%" }}>
                            <Col>
                                <Segmented
                                    defaultValue={'List'}
                                    disabled={true}
                                    options={[
                                        {
                                            label: 'List',
                                            value: 'List',
                                            icon: <BarsOutlined />,
                                        },
                                        // {
                                        //     label: 'Kanban',
                                        //     value: 'Kanban',
                                        //     icon: <AppstoreOutlined />,
                                        // },
                                    ]}
                                    onChange={handleDisplay}
                                />
                            </Col>
                            <Col style={{marginBottom: "-1%"}}>
                                <Alert style={{height: "70%"}} message="6  exams avialiable to create" type="info" showIcon />
                            </Col>
                        </Row>
                        <Row justify="center" >
                            <Col flex={"auto"} style={{ width: "2000px" }}>
                                {renderDisplay()}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col sm={2} />

            </Row>
        </Layout>
    )
}

export default Quizes;