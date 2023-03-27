import { Layout, Row, Col, Card, Typography, Button, Table, Segmented, Divider } from "antd";
import { BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import React from "react";
import NavBar from "../../../Layout/NavBar";
import { useState } from "react";
import "./course.css"
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Meta } = Card;


const Courses = () => {

    // Variable-Start
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    // Variable-End -------------------------------------------------------------------------------------------------------------------------------------------------------------



    // Data-Page-Start 
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
            width: '50%',
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
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
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
    // Data-Page-End ------------------------------------------------------------------------------------------------------------------------------------------------------------



    // Data-Mockup-Start 
    const data = [
        {
            key: '1',
            name: 'Introduction of Docker',
            address: 'New York No. 1 Lake Park',
            type: "Public",
            status: "Enable",
            edit: <Button>Edit</Button>,
            delete: <Button>Delete</Button>,
        },
        {
            key: '2',
            name: 'Basic of IoT',
            address: 'London No. 1 Lake Park',
            type: "Private",
            status: "Enable",
            edit: <Button>Edit</Button>,
            delete: <Button>Delete</Button>,
        },
        {
            key: '3',
            name: 'Arduino',
            address: 'Sydney No. 1 Lake Park',
            type: "Private",
            status: "Disable",
            edit: <Button>Edit</Button>,
            delete: <Button>Delete</Button>,
        },
        {
            key: '4',
            name: 'Software Engineer',
            address: 'London No. 2 Lake Park',
            type: "Private",
            status: "Enable",
            edit: <Button>Edit</Button>,
            delete: <Button>Delete</Button>,
        },
    ];
    // Data-Mockup-End ----------------------------------------------------------------------------------------------------------------------------------------------------------


    // Function-Start
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

    const handleDisplay = (mode) => {
        switch (mode) {
            case "List": setCurrentDisplay(listDisplay); break;
            case "Kanban": setCurrentDisplay(kanbanDisplay); break;
            default: setCurrentDisplay(listDisplay);
        }
        console.log(currentDisplay)
    }
    // Function-End -------------------------------------------------------------------------------------------------------------------------------------------------------------



    // Sub-Component-Page-Start 
    const myCoursesTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >
                <Col>
                    <Title level={5} style={{ marginTop: "10px" }}>My Courses</Title>
                </Col>
                <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
                    <Link to="/teacher/courses/create">
                        <Button>
                            Create
                        </Button>
                    </Link>
                </Col>
            </Row>
        )
    }

    const renderDisplay = () => {
        return currentDisplay
    }
    // Sub-Component-Page-End ---------------------------------------------------------------------------------------------------------------------------------------------------



    // Page-Conttoller-Start
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
    const kanbanDisplay = (
        <div className="row">
            {
                arrayCrad.map((card) => card)
            }
        </div>
    );
    const listDisplay = (<Table columns={columns} dataSource={data} onChange={handleChange} />);
    const [currentDisplay, setCurrentDisplay] = useState(listDisplay);
    // Page-Conttoller-End ------------------------------------------------------------------------------------------------------------------------------------------------------



    return (
        <Layout>
            <NavBar page={"Courses"} />
            <Row style={{ backgroundColor: "white" }}>
                <Col sm={2} />
                <Col flex="auto" style={{ paddingTop: "2%", display: "flex", justifyContent: "center" }}>
                    <Card title={myCoursesTitle()} style={{ minHeight: "770px", marginBottom: "2%", maxWidth: "83.3%" }}>
                        <Row justify="space-between" style={{ marginBottom: "1%" }}>
                            <Col>
                                <Segmented
                                    defaultValue={'List'}
                                    options={[
                                        {
                                            label: 'List',
                                            value: 'List',
                                            icon: <BarsOutlined />,
                                        },
                                        {
                                            label: 'Kanban',
                                            value: 'Kanban',
                                            icon: <AppstoreOutlined />,
                                        },
                                    ]}
                                    onChange={handleDisplay}
                                />
                            </Col>
                            {/* <Col>
                                <Link to="/teacher/courses/create">
                                    <Button>
                                        Create
                                    </Button>
                                </Link>
                            </Col> */}
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

export default Courses;