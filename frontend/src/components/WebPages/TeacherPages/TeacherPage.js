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
  Card,
  Layout,
  Menu,
  Popover,
  Row,
  Typography,
  theme,
} from "antd";
import React, { useState, useEffect } from "react";
import "./teach.css";
import { useParams, useNavigate } from "react-router-dom";

import Courses from "./TeacherCourse/Courses";
// import CourseCreate from "./TeacherCourse/CourseCreate"
import Exames from "./TeacherExam/Exams";
import ExamCreate from "./TeacherExam/ExamCreate";
import TeacherHome from "./TeacherHome/TeacherHome";

import { TeacherHomeProvider } from "./TeacherHome/TeacherHomeContext";
import CourseEvaluate from "./TeacherCourse/CourseEvaluate/CourseEvaluate";
import { TeacherCourseProvider } from "./TeacherCourse/TeacherCourseContext";
import EvaluateStudent from "./TeacherCourse/CourseEvaluate/EvaluateStudent";
import Calendar from "./TeacherCalendar/Calendar";

// for haeder or navbar
import Navbar from "../Navbar/Navbar";
import { NavbarProvider } from "../Navbar/NavbarContext";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick = (e) => {
    console.log("click ", e);
    setKeyMenu(e.key);
  };
  const [keyMenu, setKeyMenu] = useState("1");
  const { params } = useParams();
  const navigate = useNavigate();
  // console.log(params);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const renderProfile = () => {
    const rowOffset = { paddingInlineStart: "6%" };

    const handleMouseOverandOut = (e) => {
      if (!e?.type) return;

      switch (e?.type) {
        case "mouseover":
          e.target.style.backgroundColor = "rgba(230, 230, 230, 0.9)";
          break;
        case "mouseleave":
          e.target.style.backgroundColor = "rgba(230, 230, 230, 0)";
          break;
        default:
          return;
      }
    };

    return (
      <Popover
        placement="bottomRight"
        content={
          <Row style={{ width: "150px" }}>
            <Col flex={"auto"}>
              <Row style={{ ...rowOffset }}>
                <Text strong={false}>Signed in as</Text>
              </Row>
              <Row style={{ ...rowOffset }}>
                <Title level={5}>{sessionStorage.getItem("firstname")}</Title>
              </Row>

              <Divider style={{ marginTop: "5%", marginBottom: "5%" }} />
              <Row style={{ ...rowOffset }}>Role as</Row>
              <Row style={{ ...rowOffset }}>
                <Title level={5}>
                  {sessionStorage.getItem("role")
                    ? sessionStorage.getItem("role").charAt(0).toUpperCase() +
                      sessionStorage.getItem("role").slice(1)
                    : null}
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
                  touchAction: "inherit",
                }}
                onClick={() => {
                  sessionStorage.clear();
                  navigate("/");
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
            verticalAlign: "middle",
          }}
          size="large"
        >
          <Text strong style={{ color: "white" }}>
            {sessionStorage.getItem("firstname")
              ? sessionStorage.getItem("firstname").substring(0, 1)
              : null}
          </Text>
        </Avatar>
      </Popover>
    );
  };

  const items = [
    getItem("Home", "home", <HomeOutlined />),
    // getItem('Course', 'list-course', <ReadOutlined />),
    getItem("Course", "course", <ReadOutlined />, [
      getItem("List Course", "list-course"),
      getItem("Evaluate Student", "evaluate-student"),
    ]),
    getItem("Exam", "exam", <ScheduleOutlined />, [
      getItem("List Exam", "list-exam"),
      getItem("Create Exam", "create-exam"),
    ]),
    getItem("Calendar", "calendar", <CalendarOutlined />),
  ];

  const items2 = [
    getItem("Home", "/"),
    getItem("Public Course", "/student/page/browes-course"),
    getItem("Private Course", "/student/page/browes-course"),
  ];

  const renderContent = React.useCallback(() => {
    switch (params) {
      case "home":
        return (
          <TeacherHomeProvider>
            <TeacherHome />
          </TeacherHomeProvider>
        );
      case "list-course":
        return (
          <TeacherCourseProvider>
            <Courses />
          </TeacherCourseProvider>
        );
      case "list-exam":
        return <Exames />;
      case "create-exam":
        return <ExamCreate mode={"Create"} />;
      case "edit-exam":
        return <ExamCreate mode={"Edit"} />;
      case "evaluate-student":
        return (
          <TeacherCourseProvider>
            <CourseEvaluate />
          </TeacherCourseProvider>
        );
      case "evaluate-course":
        return <EvaluateStudent />;
      case "calendar":
        return <Calendar />;
      default:
        return <p className="success">404 not found ... </p>;
    }
  }, [params]);

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
          onClick={(e) => navigate(`/teacher/page/${e.key}`)}
          className="menu-teacher"
          mode="inline"
          //   defaultSelectedKeys={["create"]}
          // selectedKeys={[`${params}`]}
          items={items}
        />
      </Sider>
      <Layout className="site-layout-teacher">
        <NavbarProvider>
          <Navbar />
        </NavbarProvider>
        <Content className="contentTeacher">{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};
export default App;
