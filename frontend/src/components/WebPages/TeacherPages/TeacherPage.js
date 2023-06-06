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
import "./teach.css";
import { useParams, useNavigate } from "react-router-dom";

import Courses from "./TeacherCourse/Courses";
// import CourseCreate from "./TeacherCourse/CourseCreate"
import Exames from "./TeacherExam/Exams";
import ExamCreate from "./TeacherExam/ExamCreate"
import TeacherHome from "./TeacherHome/TeacherHome";

import { TeacherHomeProvider } from "./TeacherHome/TeacherHomeContext";

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
  const navigate = useNavigate()
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
    getItem('Home', 'home', <HomeOutlined />),
    getItem('Course', 'list-course', <ReadOutlined />),
    // getItem('Course', 'course', <ReadOutlined />, [
    //   getItem('List Course', 'list-course'),
    //   // getItem('Create Course', 'create-course'),
    // ]),
    getItem('Exam', 'exam', <ScheduleOutlined />, [
      getItem('List Exam', 'list-exam'),
      getItem('Create Exam', 'create-exam'),
    ]),
    getItem('Calendar', 'calendar', <CalendarOutlined />),
  ];

  const items2 = [
    getItem('Home', '/'),
    getItem('Public Course', '/teacher/page/home'),
    getItem('Private Course', '/admin/page/home'),
    // getItem('Contact', '#',),
  ];

  const renderContent = React.useCallback(() => {
    switch (params) {
      case 'home':
        return (
          <TeacherHomeProvider>
            <TeacherHome />
          </TeacherHomeProvider>
        );
      case 'list-course':
        return <Courses  />;
      case 'create-course':
        // return <CourseCreate />;
      case 'list-exam':
        return <Exames />;
      case 'create-exam':
        return <ExamCreate mode={"Create"} />;
      case 'edit-exam':
        return <ExamCreate mode={"Edit"} />;
      // case 'preview-exam':
      //   return <ExamCreate mode={"Preview"}/>;
      case 'calendar':
        return <p className="success">Calendar</p>;
      default:
        return <p className="success">404 not found ... </p>;

    }
  }, [params]);

  return (
    <Layout className="layout-teacher">
      <Sider className="sider-teacher" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo-teacher d-flex justify-content-center my-3">
          <img alt="iconTeacher" className="w-75" src="/Teacher.png" />
        </div>
        <Menu
          onClick={(e) => navigate(`/teacher/page/${e.key}`)}
          className="menu-teacher"
          mode="inline"
          defaultSelectedKeys={[`${params}`]}
          selectedKeys={[`${params}`]}
          items={items}

        />
      </Sider>
      <Layout className="site-layout-teacher">
        <Header className="header-teacher">
          <Menu className="header-menu"
            onClick={(e) => navigate(`${e.key}`)}
            mode="horizontal" items={items2} />
        </Header>
        <Content
          className="contentTeacher"
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
