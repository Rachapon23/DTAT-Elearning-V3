import {
  HomeOutlined,
  ReadOutlined,
  ScheduleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Col, Layout, Row, theme } from "antd";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentHomePage from "./StudentHome/StudentHomePage";
import DoExam from "./StudentExam/DoExam";
import StudentCourse from "./StudentCourse/StudentCourse"
import RegisterCourse from "./StudentCourse/RegisterCourse";
// import "../HomePage/home.css";

// for haeder or navbar
import Navbar from "../Navbar/Navbar";
import { NavbarProvider } from "../Navbar/NavbarContext";
import { useMediaQuery } from "react-responsive";
import { StudentPageProvider } from "./StudentPageContext";

const { Content } = Layout;

const App = () => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

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
      case 'home':
        return <StudentHomePage />
      case 'exam':
        return <DoExam />
      case 'course':
        return <StudentCourse />
      case 'register-course':
        return (
          <RegisterCourse />
        )
      case "calendar":
        return <p className="success">Calendar</p>;
      default:
        return <p className="success">404 not found ... </p>;
    }
  }, [params]);

  const stylePc = () => {
    return { paddingTop: 60, paddingLeft: 50, paddingRight: 50 }
  }

  const styleMobile = () => {
    return { paddingTop: 80, paddingBottom: 70 }
  }

  const renderStyle = () => {
    if (isDesktopOrLaptop) return stylePc()
    if (isTabletOrMobile) return styleMobile()
  }

  return (
    <Layout className="layout-home">
      <NavbarProvider>
        <Navbar />
      </NavbarProvider>
      <Content style={renderStyle()}>
        <StudentPageProvider>
          {renderContent()}
        </StudentPageProvider>
      </Content>
    </Layout>

  );
};
export default App;
