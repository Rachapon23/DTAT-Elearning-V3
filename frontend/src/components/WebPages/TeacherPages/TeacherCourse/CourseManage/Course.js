import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ReadOutlined,
  ScheduleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Col,
  Divider,
  Layout,
  Menu,
  Popover,
  Row,
  Typography,
  theme,
} from "antd";
import "../../teach.css";
import { CourseProvider } from "./CourseContext";
import Course_main from "./Course_main";
import { useParams, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography
const Course = () => {
  
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Home", "home", <HomeOutlined />),
    // getItem('Course', 'list-course', <ReadOutlined />),
    getItem("Course", "course", <ReadOutlined />, [
      getItem("Create Course", "create"),
      getItem("List Course", "list-course"),
      getItem("Evaluate Student", "evaluate-student"),
    ]),
    getItem("Exam", "exam", <ScheduleOutlined />, [
      getItem("List Exam", "list-exam"),
      getItem("Create Exam", "create-exam"),
    ]),
    getItem("Calendar", "calendar", <CalendarOutlined />),
  ];

  const redirect = (e) =>{
    console.log(e)
    if(e !== "create"){
      navigate(`/teacher/page/${e}`)
    }
  }
  const renderProfile = () => {
    const rowOffset = { paddingInlineStart: "6%" }

    const handleMouseOverandOut = (e) => {
        if (!e?.type) return

        switch (e?.type) {
            case "mouseover":
                e.target.style.backgroundColor = "rgba(230, 230, 230, 0.9)";
                break
            case "mouseleave":
                e.target.style.backgroundColor = "rgba(230, 230, 230, 0)";
                break
            default:
                return
        }
    }

    return (
        <Popover
            placement="bottomRight"
            content={
                <Row style={{ width: "150px", }}>
                    <Col flex={"auto"}>

                        <Row style={{ ...rowOffset }}>
                            <Text strong={false}>
                                Signed in as
                            </Text>
                        </Row>
                        <Row style={{ ...rowOffset }}>
                            <Title level={5}>
                                {sessionStorage.getItem("firstname")}
                            </Title>
                        </Row>

                        <Divider style={{ marginTop: "5%", marginBottom: "5%" }} />
                        <Row style={{ ...rowOffset }}>
                            Role as
                        </Row>
                        <Row style={{ ...rowOffset }}>
                            <Title level={5}>
                                {
                                    sessionStorage.getItem("role") ?
                                        sessionStorage.getItem("role").charAt(0).toUpperCase() +
                                        sessionStorage.getItem("role").slice(1) : null
                                }
                            </Title>
                        </Row>
                        <Divider style={{ marginTop: "5%", marginBottom: "5%" }} />

                        <Row
                            onMouseOver={handleMouseOverandOut}
                            onMouseLeave={handleMouseOverandOut}
                            style={{
                                ...rowOffset,
                                borderRadius: "4px",
                                cursor: "pointer",
                                touchAction: "inherit"
                            }}
                            onClick={() => {
                                sessionStorage.clear()
                                navigate("/")
                                // window.location.reload()
                            }}
                        >
                            Log out
                        </Row>

                    </Col>
                </Row>
            }
            trigger="click"
        >
            <Avatar
                style={{
                    cursor: "pointer",
                    paddingBottom: "0.5%",
                    verticalAlign: 'middle',
                }}
                size="large"
            >
                <Text strong style={{ color: "white" }}>
                    {
                        sessionStorage.getItem("firstname") ?
                            sessionStorage.getItem("firstname").substring(0, 1) : null
                    }
                </Text>
            </Avatar>
        </Popover>

    )
}

  return (
    <Layout className="layout-teacher">
      <Sider
        className="sider-teacher"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo-teacher d-flex justify-content-center my-3">
          <img alt="iconTeacher" style={{ width: "75%" }} src="/Teacher.png" />
        </div>
        <Menu
          onClick={(e) => redirect(e.key)}
          className="menu-teacher"
          mode="inline"
          defaultSelectedKeys={["create"]}
          // selectedKeys={[`${params}`]}
          items={items}
        />
      </Sider>
      <Layout className="site-layout-teacher">
        <Header className="header-teacher">
          <Row justify={"end"}>
            <Col style={{ paddingRight: "50px" }}>
              {
                renderProfile()
                // nav Bar
              }
            </Col>
          </Row>
        </Header>
        <Content className="contentTeacher">
          <CourseProvider>
            <Course_main />
          </CourseProvider>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Course;
