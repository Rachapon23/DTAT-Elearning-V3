import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ReadOutlined,
  ScheduleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Row, Col, Alert, Card, Avatar, Divider, Popover, Typography, } from "antd";
import React, { useState, useEffect } from "react";
import "./adminpage.css";
import { useParams, useNavigate } from "react-router-dom";
import AdminHomePage from "./AdminHome/AdminHomePage";
import AdminManageHome from "./AdminManageHome/AdminManageHome";
import AdminListUser from "./AdminListUser/AdminListUser";
import AdminManageTeacher from "./AdminManageTeacher/AdminManageTeacher";
import AdminManageStudent from "./AdminManageStudent/AdminManageStudent";

import { AdminProvider } from "./AdminManageHome/AdminManageContext";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography

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
        return <AdminManageHome />;
      case 'acnounce':
        return (
          <AdminProvider>
            <AdminManageHome manage={"Acnounce"} initAction={"Preview"} />
          </AdminProvider>
        );
      case 'public-course':
        return (
          <AdminProvider>
            <AdminManageHome manage={"Public Course"} initAction={"Preview"} />
          </AdminProvider>
        );
      case 'private-course':
        return (
          <AdminProvider>
            <AdminManageHome manage={"Private Course"} initAction={"Preview"} />
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
          <Row justify={"end"}>
            {/* <Col flex={"auto"}>
              <Menu className="header-menu"
                onClick={(e) => navigate(`${e.key}`)}
                mode="horizontal" items={items2}
              />
            </Col> */}
            <Col style={{ paddingRight: "50px" }}>
              {
                renderProfile()
              }
            </Col>
          </Row>
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
