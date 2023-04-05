import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    ReadOutlined,
    ScheduleOutlined,
    CalendarOutlined,
  } from "@ant-design/icons";
  import { Layout, Menu, theme, Row,Col, Alert,Card, } from "antd";
  import React, { useState, useEffect } from "react";
  import "./adminpage.css";
  import { useParams,useNavigate } from "react-router-dom";


  
  const { Header, Sider, Content } = Layout;
  
  const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    // const {
    //   token: { colorBgContainer },
    // } = theme.useToken();

    const { params } = useParams();
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
    
    const items2 = [
        getItem('Home', '/'),
        getItem('Public Course', '/teacher/page/home'),
        getItem('Private Course', '/admin/page/home'),
        // getItem('Contact', '#',),
      ];

    const items = [
      getItem('Home', '1', <HomeOutlined />),
      getItem('Manage Home', '2', <HomeOutlined />),
      getItem('List User', '3', <HomeOutlined />),
      getItem('List Teacher', '4', <HomeOutlined />),
      getItem('List Student', '5', <CalendarOutlined />),
    ];
  
    // const renderContent = React.useCallback(() => {
    //   switch(params) {
    //     case 'home': 
    //       return <TeacherHome/>;
    //     case 'listcourse': 
    //       return <Courses/>;
    //     case 'createcourse': 
    //       return <CourseCreate/>;
    //     case 'listexam': 
    //       return <Exames/>;
    //     case 'createexam': 
    //       return <ExamCreate/>;
    //     case 'calendar': 
    //       return <p className="success">Calendar</p>;
    //     default: 
    //       return <p className="success">404 not found ... </p>;
        
    //   }
    // }, [params]);
  
    return (
      <Layout className="layout-admin">
        <Sider   className="sider-admin"
             collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo-admin">
            <p>A D M I N</p>
          </div>
          <Menu
            onClick={(e)=>navigate(`/admin/page/${e.key}`)}
            className="menu-admin"
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={[`${params}`]}
            items={items}
  
          />
        </Sider>
        <Layout className="site-layout-admin">
        <Header className="header-admin">
        <Menu className="header-menu"
         onClick={(e)=>navigate(`${e.key}`)}
          mode="horizontal" items={items2} />
        </Header>
          <Content
            className="contentTeacher"
          >
             <Layout  className="layout-content">
            <Row>
                <Col flex="auto" style={{ display: "flex", justifyContent: "center" }}>
                    <h1>ter</h1>
                </Col>
            </Row>
        </Layout>
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default App;
  