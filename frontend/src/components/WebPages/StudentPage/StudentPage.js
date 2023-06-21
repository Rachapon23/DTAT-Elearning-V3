import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ReadOutlined,
  ScheduleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import StudentHomePage from "./StudentHome/StudentHomePage";
import DoExam from "./StudentExam/DoExam";
import StudentCourse from "./StudentCourse/StudentCourse";
import BrowesCourse from "./StudentCourse/BrowesCourse";
import RegisterCourse from "./StudentCourse/RegisterCourse";
import { StudentProvider } from "./StudentCourse/StudentCourseContext";

// for haeder or navbar
import Navbar from "../Navbar/Navbar";
import { NavbarProvider } from "../Navbar/NavbarContext";

const { Header, Sider, Content } = Layout;

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

  const items = [
    getItem("Home", "home", <HomeOutlined />),
    getItem("Course", "list-course", <ReadOutlined />),
    // getItem('Course', 'course', <ReadOutlined />, [
    //   getItem('List Course', 'list-course'),
    //   // getItem('Create Course', 'create-course'),
    // ]),
    getItem("Exam", "exam", <ScheduleOutlined />, [
      getItem("List Exam", "list-exam"),
      getItem("Create Exam", "create-exam"),
    ]),
    getItem("Calendar", "calendar", <CalendarOutlined />),
  ];

  const items2 = [
    getItem("Home", "/"),
    getItem("Public Course", "/student/page/home"),
    getItem("Private Course", "/student/page/home"),
    // getItem('Contact', '#',),
  ];

  const renderContent = React.useCallback(() => {
    switch (params) {
      case "home":
        return <StudentHomePage />;
      case "exam":
        return <DoExam />;
      case "course":
        return <StudentCourse />;
      case "browes-course":
        return;
        <StudentProvider>
          <BrowesCourse />;
        </StudentProvider>;
      case "register-course":
        return <RegisterCourse />;
      // case 'preview-exam':
      //   return <ExamCreate mode={"Preview"}/>;
      case "calendar":
        return <p className="success">Calendar</p>;
      default:
        return <p className="success">404 not found ... </p>;
    }
  }, [params]);

  return (
    <Layout className="layout-home">
      <NavbarProvider>
        <Navbar />
      </NavbarProvider>
      <Content>{renderContent()}</Content>
    </Layout>
  );
};
export default App;
