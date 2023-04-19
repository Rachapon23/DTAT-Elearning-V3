import { Layout, Row, Col, Card, Typography, Button, Table, Breadcrumb, Segmented, Divider } from "antd";
import { BarsOutlined, AppstoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import NavBar from "../../../Layout/NavBar";
import { useState } from "react";
import "./course.css"
import "../teach.css"
import { Link } from "react-router-dom";
import { listCourse, removeCourse } from "../../../../function/Teacher/course";
const { Title } = Typography;
const { Meta } = Card;


const Courses = () => {

    // Variable-Start
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [hasChanged, setHasChanged] = useState(false);
    const [courses, setCourses] = useState(null | [{
        image: {
            original_name: "",
            name: ""
        },
        _id: "",
        condition: [],
        createdAt: "",
        detail: "",
        enabled: null,
        name: "",
        room: "",
        topic: [],
        type: null,
        updatedAt: "",
        video: null,
        calendar: "",
        teacher: "",
        exam: ""
    }])
    // Variable-End -------------------------------------------------------------------------------------------------------------------------------------------------------------


    const handleRemoveCourse = async (index) => {
        await removeCourse(sessionStorage.getItem("token"), courses[index]?._id)
            .then(
                (res) => {
                    console.log(res.data.data)
                    setHasChanged(true);
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }


    // Data-Page-Start 
    const columns = [
        {
            title: 'No',
            // dataIndex: 'key',
            // key: 'key',
            // sorter: (a, b) => a.key - b.key,
            // sortOrder: sortedInfo.columnKey === 'key' ? sortedInfo.order : null,
            // ellipsis: true,
            width: '10%',
            render: (data) => courses.indexOf(data) + 1,

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
            render: (type) => type === true ? "Public" : "Private",
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (enabled) => enabled === true ? "Enable" : "Disable",
            align: 'center',
        },
        {
            title: 'Edit',
            key: 'edit',
            align: 'center',
            width: '10%',
            render: (data) => {
                const index = courses.indexOf(data);
                return (
                    <Button onClick={() => null}>
                        <EditOutlined />
                    </Button>
                )
            },


        },
        {
            title: 'Delete',
            key: 'delete',
            align: 'center',
            width: '10%',
            render: (data) => {
                const index = courses.indexOf(data);
                return (
                    <Button onClick={() => handleRemoveCourse(index)}>
                        <DeleteOutlined />
                    </Button>
                )
            },
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



    // const [displayMode, setDisplayMode] = useState("List");
    const handleDisplay = (mode) => {
        // if (!mode) {
        //     mode = displayMode;
        // }
        // else {
        //     setDisplayMode(mode);
        // }
        // switch (mode) {
        //     case "List": setCurrentDisplay(<Table columns={columns} dataSource={courses} onChange={handleChange} />); break;
        //     case "Kanban": setCurrentDisplay(kanbanDisplay); break;
        //     default: setCurrentDisplay(<Table columns={columns} dataSource={courses} onChange={handleChange} />);
        // }
    }
    // Function-End -------------------------------------------------------------------------------------------------------------------------------------------------------------



    // Sub-Component-Page-Start 
    const myCoursesTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"} >
                <Col>
                    <Breadcrumb
                        separator={<Title level={5} style={{ marginTop: "15px" }}> {">"} </Title>}
                        items={[
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p >Courses</p></Title>,
                                key: "courses"
                            },
                            {
                                title: <Title level={5} style={{ marginTop: "10px" }}><p>List Course</p></Title>,
                                key: "courses_create",
                            },
                        ]}
                    />
                </Col>
                <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
                    <Link to="/teacher/page/createcourse">
                        <Button>
                            Create
                        </Button>
                    </Link>
                </Col>
            </Row>
        )
    }

    const renderDisplay = () => {
        return <Table columns={columns} dataSource={courses} onChange={handleChange} />
    }
    // Sub-Component-Page-End ---------------------------------------------------------------------------------------------------------------------------------------------------



    // Page-Conttoller-Start
    // const cardData = (
    //     <div style={{ paddingTop: "1%" }}>
    //         <Card
    //             hoverable
    //             style={{
    //                 width: "450px",
    //             }}
    //             cover={<img alt="example" src="/book-main-img-3.png" />}
    //         >
    //             <Meta title="Course" description="This is a description of a course" />
    //         </Card>
    //     </div>
    // )
    // const arrayCrad = [cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData, cardData]
    // const kanbanDisplay = (
    //     <div className="row">
    //         {
    //             arrayCrad.map((card) => card)
    //         }
    //     </div>
    // );

    // Page-Conttoller-End ------------------------------------------------------------------------------------------------------------------------------------------------------

    const fetchCourse = async () => {
        await listCourse(sessionStorage.getItem("token"))
            .then(
                (res) => {
                    const data = res.data.data;
                    console.log(data);
                    setCourses(data);
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(() => {
        fetchCourse()
        // renderDisplay()
        return () => {
            setHasChanged(false)
        }
    }, [hasChanged])

    return (
        <Layout className="layout-content">
            {/* <NavBar page={"Courses"} /> */}
            <Row>
                {/* <Col sm={2} /> */}
                <Col flex="auto" style={{ display: "flex", justifyContent: "center" }}>
                    <Card title={myCoursesTitle()} style={{ maxWidth: "100%" }}>
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
                {/* <Col sm={2} /> */}

            </Row>
        </Layout>
    )
}

export default Courses;