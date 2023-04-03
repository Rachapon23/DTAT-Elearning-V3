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
import { useParams,useNavigate } from "react-router-dom";

import Courses from "./TeacherCourse/Courses";
import CourseCreate from "./TeacherCourse/CourseCreate"
import Exames from "./TeacherExam/Exames";
import ExamCreate from "./TeacherExam/ExamCreate"
import TeacherHome from "./TeacherHome/TeacherHome";

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
    getItem('Course', 'course', <ReadOutlined />, [
      getItem('List Course', 'listcourse'),
      getItem('Create Course', 'createcourse'),
    ]),
    getItem('Exam', 'exam', <ScheduleOutlined />, [
      getItem('List Exam', 'listexam'),
      getItem('Create Exam', 'createexam'),
    ]),
    getItem('Calendar', 'calendar', <CalendarOutlined />),
  ];

  const renderContent = React.useCallback(() => {
    switch(params) {
      case 'home': 
        return <TeacherHome/>;
      case 'listcourse': 
        return <Courses/>;
      case 'createcourse': 
        return <CourseCreate/>;
      case 'listexam': 
        return <Exames/>;
      case 'createexam': 
        return <ExamCreate/>;
      case 'calendar': 
        return <p className="success">Calendar</p>;
      default: 
        return <p className="success">404 not found ... </p>;
      
    }
  }, [params]);

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu
          onClick={(e)=>navigate(`/teacher/page/${e.key}`)}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[`${params}`]}
          items={items}

        />
      </Sider>
      <Layout className="site-layout">
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header> */}
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
