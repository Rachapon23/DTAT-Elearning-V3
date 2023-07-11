import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Col, Divider, Layout, Popover, Row, Typography, Button, Modal, Drawer, Space, } from "antd";
import "./navbar.css";
import { MenuOutlined } from "@ant-design/icons"
import { NavbarContext } from "./NavbarContext";
import Auth from "./Auth";
const { Header } = Layout;
const { Title, Text } = Typography;

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const {
    isModalOpenAuth,
    setIsModalOpenAuth,
    showModalAuth,
    handleOkAuth,
    handleCancelAuth,
  } = useContext(NavbarContext);

  const checkLogedin = () => {
    if (sessionStorage.getItem("token")) return true;
    return false;
  };

  const renderProfile = () => {
    const rowOffset = { paddingInlineStart: "6%" };

    const handleMouseOverandOut = (e) => {
      if (!e?.type) return;

      console.log(e?.type)

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
                  window.location.reload();
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
          {sessionStorage.getItem("firstname").substring(0, 1)}
        </Avatar>
      </Popover>
    );
  };

  const renderNavigator = () => {
    let item1 = null;
    let item2 = null;
    let item3 = null;

    if (sessionStorage.getItem("role") === "admin") {
      item1 = <a href="/admin/page/home">Manage</a>;
      item2 = <a href="/teacher/page/home">Teacher page</a>;
      item3 = <a href="/student/page/home">Student Page</a>;
    } else if (sessionStorage.getItem("role") === "teacher") {
      item1 = <a href="/teacher/page/home">Teaching</a>;
      item3 = <a href={`/student/page/home`}>Student Page</a>;
    } else if (sessionStorage.getItem("role") === "student") {
      item1 = <a href="/student/page/home">Learning</a>;
    }
    return (
      <Row>
        <Col>
          <Row style={{ paddingBottom: 10 }}>
            <Text strong style={{ fontSize: '120%' }}><a href="/">Home</a></Text>
          </Row>
          <Row style={{ paddingBottom: 10 }}>
            <Text strong style={{ fontSize: '120%' }}>{item1}</Text>
          </Row>
          {
            item2 === null ?
              (
                <></>
              )
              :
              (
                <Row style={{ paddingBottom: 10 }}>
                  <Text strong style={{ fontSize: '120%' }}>{item2}</Text>
                </Row>
              )
          }
          {
            item3 === null ?
              (
                <></>
              )
              :
              (
                <Row style={{ paddingBottom: 10 }}>
                  <Text strong style={{ fontSize: '120%' }}>{item3}</Text>
                </Row>
              )
          }
        </Col>
        {/* <Col className="link-navbar-role">{renderProfile()}</Col> */}
      </Row>
    );
  };

  const navBarPc = () => {
    return (
      <Header className="header-home">
        <Row className="row-navbar-role-home">
          <Col>
            <h2 className="logo">Logo</h2>
          </Col>
          {checkLogedin() ? (
            <Col>{renderNavigator()}</Col>
          ) : (
            <Col>
              <Button ghost size="large" onClick={showModalAuth}>
                Login
              </Button>
            </Col>
          )}
        </Row>
        <Modal
          open={isModalOpenAuth}
          onOk={handleOkAuth}
          onCancel={handleCancelAuth}
          footer={[]}
          bodyStyle={{
            paddingTop: "50px",
          }}
          className="modal-auth"
          style={{
            top: 20,
          }}
        >
          <Auth />
        </Modal>
      </Header>
    );
  }

  const navBarMobile = () => {
    return (
      <Header className="header-home">
        {
          checkLogedin() ?
            (
              <Drawer
                title={<Row style={{ fontSize: '120%' }}>Menu</Row>}
                placement={'left'}
                width={'70%'}
                onClose={() => setOpen(false)}
                open={open}
              >
                {renderNavigator()}
              </Drawer>
            )
            :
            (null)
        }
        <Row justify={'space-between'}>
          {
            checkLogedin() ?
              (
                <Col onClick={() => setOpen(true)}>
                  <MenuOutlined style={{ fontSize: '170%', color: 'white', }} />
                </Col>
              )
              :
              (null)
          }
          <Col>
            <h2 className="logo">Logo</h2>
          </Col>
          {
            checkLogedin() ?
              (
                <Row>
                  <Col>
                    {renderProfile()}
                  </Col>
                </Row>
              )
              :
              (
                <Row>
                  <Col>
                    <Button ghost size="large" onClick={showModalAuth}>
                      Login
                    </Button>
                  </Col>
                </Row>
              )
          }
        </Row>
        <Modal
          open={isModalOpenAuth}
          onOk={handleOkAuth}
          onCancel={handleCancelAuth}
          footer={[]}
          bodyStyle={{
            paddingTop: "50px",
          }}
          className="modal-auth"
          style={{
            top: 20,
          }}
        >
          <Auth />
        </Modal>
      </Header>
    );
  }

  const renderNavBar = () => {
    if (false) {
      return navBarPc()
    }
    if (true) {
      return navBarMobile()
    }
  }

  return renderNavBar()
};

export default Navbar;
