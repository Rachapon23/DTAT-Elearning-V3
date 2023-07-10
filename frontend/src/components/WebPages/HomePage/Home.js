import React from "react";
import HomePrivate from "./HomePrivate";
import HomePublic from "./HomePublic";
import Navbar from "../Navbar/Navbar";
import Contact from "./Contact";
import "./home.css";
import HomeAnnounce from "./HomeAnnounce";
import { HomeProvider } from "./HomeContext";
import { NavbarProvider } from "../Navbar/NavbarContext";
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
const { Header, Sider, Content } = Layout;
const Home = () => {
  return (
    <Layout className="layout-home">
      <HomeProvider>
        <NavbarProvider>
          <Navbar />
        </NavbarProvider>
        <NavbarProvider>
          <Content>
            <Row>
              <Col >
                <Row >
                  <Col >

                    <Row align={'middle'}>
                      <Col lg={14}>
                        <p className="title-1">
                          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of
                          the printing and typesetting industry. Lorem Ipsum
                        </p>
                        <p className="title-2">
                          has been the industry's standard dummy text ever since the
                          1500s, when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has survived
                          not only five
                        </p>
                        <button className="btn-aboutme">About Me</button>
                      </Col>

                      <Col lg={10}>
                        <img
                          alt="iconHome"
                          className="iconHome"
                          src="/iconHome.png"
                        />
                      </Col>
                    </Row>

                  </Col>
                </Row>

                <Row justify={'center'}>
                  <HomeAnnounce />
                </Row>
                <Row className="content">
                  <HomePublic />
                </Row>
                <Row className="content">
                  <HomePrivate />
                </Row>
              </Col>
            </Row>
          </Content>
        </NavbarProvider>
      </HomeProvider>
    </Layout>
  );
};

export default Home;
