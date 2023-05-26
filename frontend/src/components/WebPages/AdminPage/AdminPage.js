import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ReadOutlined,
  ScheduleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Row, Col, Alert, Card, } from "antd";
import React, { useState, useEffect } from "react";
import "./adminpage.css";
import { useParams, useNavigate } from "react-router-dom";
import AdminHomePage from "./AdminHome/AdminHomePage";
import AdminManageAcnounce from "./AdminHome/AdminManageHome/AdminManageAcnounce";
import AdminListUser from "./AdminHome/AdminListUser";
import AdminManageTeacher from "./AdminHome/AdminManageTeacher";
import AdminManageStudent from "./AdminHome/AdminManageStudent";

import { AdminProvider } from "./AdminHome/AdminManageHome/AdminManageContext";
import AdminManageCourse from "./AdminHome/AdminManageHome/AdminManageCourse";

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
    getItem('Home', 'home', <HomeOutlined />),
    getItem('Manage Home', 'managehome', <HomeOutlined />, [
      getItem('Acnounce', 'acnounce'),
      getItem('Public Course', 'public-course'),
      getItem('Private Course', 'private-course'),
    ]),
    getItem('List User', 'listuser', <HomeOutlined />),
    getItem('Manage Teacher', 'manageteacher', <HomeOutlined />),
    getItem('Manage Student', 'managestudent', <CalendarOutlined />),
  ];

  const renderContent = React.useCallback(() => {
    switch (params) {
      case 'home':
        return <AdminHomePage />;
      case 'managehome':
        return <AdminManageAcnounce />;
      case 'acnounce':
        return (
          <AdminProvider>
            <AdminManageAcnounce manage={"Acnounce"} initAction={"Preview"}/>
          </AdminProvider>
        );
      case 'public-course':
        return (
          <AdminProvider>
            <AdminManageAcnounce manage={"Public Course"} initAction={"Preview"}/>
          </AdminProvider>
        );
      case 'private-course':
        return (
          <AdminProvider>
            <AdminManageAcnounce manage={"Private Course"} initAction={"Preview"}/>
          </AdminProvider>
        );
      case 'listuser':
        return <AdminListUser />;
      case 'manageteacher':
        return <AdminManageTeacher />;
      case 'managestudent':
        return <AdminManageStudent />;
      // case 'calendar': 
      //   return <p className="success">Calendar</p>;
      default:
        return <p className="success">404 not found ... </p>;

    }
  }, [params]);

  return (
    <Layout className="layout-admin">
      <Sider className="sider-admin"
        collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo-admin">
          <img alt="iconAdmin" className="w-100" src="/Admin.png" />
        </div>
        <Menu
          onClick={(e) => navigate(`/admin/page/${e.key}`)}
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
            onClick={(e) => navigate(`${e.key}`)}
            mode="horizontal" items={items2} />
        </Header>
        <Content
          className="contentTeacher"
        >
          <Layout className="layout-content">
            <Row className="row-admin">
              <Col className="col-admin">
                {renderContent()}
              </Col>
            </Row>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
