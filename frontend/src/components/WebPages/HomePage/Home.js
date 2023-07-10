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
import { Grid } from 'antd-mobile'
import HomeMobile from "./HomeMobile";
const { Header, Sider, Content } = Layout;
const Home = () => {
  const renderContent = () => {
    if (false) {
      return (
        <Layout className="layout-home">
          <HomeProvider>
            <NavbarProvider>
              <Navbar />
            </NavbarProvider>
            <NavbarProvider>
              <Content>
                <div>
                  <div className="home-container">
                    <div className="home-sub">
                      <div className="top-content">
                        <div className="left-content">
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
                        </div>

                        <div className="right-content">
                          <img
                            alt="iconHome"
                            className="iconHome"
                            src="/iconHome.png"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <HomeAnnounce />
                    </div>
                    <div className="content">
                      <HomePublic />
                    </div>
                    <div className="content">
                      <HomePrivate />
                    </div>
                  </div>
                </div>
              </Content>
            </NavbarProvider>
          </HomeProvider>
        </Layout>
      );
    }
    if (true) {
      return (
        <div className="layout-home">
          <NavbarProvider>
            <Navbar />
          </NavbarProvider>
          <Grid columns={1} >
            <Grid.Item>
              <Grid columns={1}>
                <Row justify={'center'} align={'middle'}>
                  <Grid.Item >
                    <Col flex={'auto'} style={{padding: 30}}>
                      <p className="title-1-mobile">
                        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of
                        the printing and typesetting industry. Lorem Ipsum
                      </p>
                      <p className="title-2-mobile">
                        has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived
                        not only five
                      </p>
                    </Col>
                  </Grid.Item>
                  <button className="btn-aboutme-mobile">About Me</button>
                </Row>

                <Grid.Item>
                  <div className="right-content-mobile">
                    <img
                      alt="iconHome"
                      className="iconHome"
                      src="/iconHome.png"
                    />
                  </div>
                </Grid.Item>

                <Grid.Item>

                </Grid.Item>
              </Grid>
            </Grid.Item>
          </Grid>
        </div>
      )
    }
  }
  return renderContent()
};

export default Home;
