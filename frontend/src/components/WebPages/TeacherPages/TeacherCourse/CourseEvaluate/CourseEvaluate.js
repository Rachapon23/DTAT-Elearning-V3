import { Breadcrumb, Button, Card, Col, Layout, Row, Table, Typography } from "antd";
import { SolutionOutlined } from '@ant-design/icons';
import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import { TeacherCourseContext } from "../TeacherCourseContext";

const { Title } = Typography

const CourseEvaluate = () => {
    const { courses } = useContext(TeacherCourseContext)

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (data) => courses.indexOf(data) + 1,
        },
        {
            title: "Course",
            dataIndex: "name",
            key: "name",
            width: "50%",
            filters: [
                {
                    text: "Joe",
                    value: "Joe",
                },
                {
                    text: "Jim",
                    value: "Jim",
                },
            ],
            ellipsis: true,
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type) => (type === true ? "Public" : "Private"),
            align: "center",
        },
        {
            title: "Status",
            dataIndex: "enabled",
            key: "enabled",
            render: (enabled) => (enabled === true ? "Open" : "Close"),//"Enable" : "Disable"),
            align: "center",
        },
        {
            title: "Evaluate",
            key: "edit",
            align: "center",
            width: "10%",
            render: (data) => {
                console.log(data)
                return (
                    <Link to={`/teacher/page/evaluate-course/${data._id}` }>
                        <Button>
                            <SolutionOutlined />
                        </Button>
                    </Link>
                );
            },
        },
    ];

    const CourseEvaluateTitle = () => {
        return (
            <Row align={"middle"} justify={"space-between"}>
                <Col>
                    {/* <p style={{ marginTop: "10px" }}>List Course</p> */}
                    <Breadcrumb
                        separator={
                            <Title level={5} style={{ marginTop: "10px" }}>
                                {" "}
                                {">"}
                                {" "}
                            </Title>
                        }
                        items={[
                            {
                                title: (
                                    <Title level={5} style={{ marginTop: "10px" }}>
                                        <p>Course</p>
                                    </Title>
                                ),
                                key: "course",
                            },
                            {
                                title: (
                                    <Title level={5} style={{ marginTop: "10px" }}>
                                        <p>Evaluate Student</p>
                                    </Title>
                                ),
                                key: "evaluate student",
                            },
                        ]}
                    />
                </Col>
                <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
                    {/* <Button onClick={CreateCourseEmpty}>Create</Button> */}
                </Col>
            </Row>
        );
    };

    useEffect(() => {

    }, [])

    return (
        <Layout>
            {/* <NavBar page={"Courses"} /> */}
            <Row>
                {/* <Col sm={2} /> */}
                <Col flex="auto" style={{ display: "flex", justifyContent: "center" }}>
                    <Card title={CourseEvaluateTitle()} style={{ maxWidth: "100%" }}>
                        <Row justify="space-between" style={{ marginBottom: "1%" }}>
                            {/* <Col>
                                <Segmented
                                    defaultValue={"List"}
                                    options={[
                                        {
                                            label: "List",
                                            value: "List",
                                            icon: <BarsOutlined />,
                                        },
                                        {
                                            label: "Kanban",
                                            value: "Kanban",
                                            icon: <AppstoreOutlined />,
                                        },
                                    ]}
                                    // onChange={handleDisplay}
                                />
                            </Col> */}
                            {/* <Col>
                                <Link to="/teacher/courses/create">
                                    <Button>
                                        Create
                                    </Button>
                                </Link>
                            </Col> */}
                        </Row>
                        <Row justify="center">
                            <Col flex={"auto"} style={{ width: "2000px" }}>
                                <Table columns={columns} dataSource={courses} onChange={{}} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Layout>
    )
}

export default CourseEvaluate;




