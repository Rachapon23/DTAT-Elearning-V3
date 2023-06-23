import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Col,
  Divider,
  Layout,
  Popover,
  Row,
  Typography,
  Button,
  Modal,
} from "antd";
import "./navbar.css";

import { NavbarContext } from "./NavbarContext";

import Auth from "./Auth";
const { Header } = Layout;
const { Title, Text } = Typography;
const Navbar = () => {
  const navigate = useNavigate();
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
        <Col className="link-navbar-role">
          <a href="/">Home</a>
        </Col>
        <Col className="link-navbar-role">{item1}</Col>
        {item2 === null ? (
          <></>
        ) : (
          <Col className="link-navbar-role">{item2}</Col>
        )}
        {item3 === null ? (
          <></>
        ) : (
          <Col className="link-navbar-role">{item3}</Col>
        )}
        <Col className="link-navbar-role">{renderProfile()}</Col>
      </Row>
    );
  };

  return (
    <Header className="header-home">
      {/* แยก role navbar 20 06 66 */}
      <Row className="row-navbar-role-home">
        <Col>
          <h2 className="logo">Logo</h2>
        </Col>
        {checkLogedin() ? (
          <Col>{renderNavigator()}</Col>
        ) : (
          <Col className="col-login">
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
};

export default Navbar;
