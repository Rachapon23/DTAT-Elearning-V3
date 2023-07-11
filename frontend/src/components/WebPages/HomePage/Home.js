import React from "react";
import HomePrivate from "./HomePrivate";
import HomePublic from "./HomePublic";
import Navbar from "../Navbar/Navbar";
import Contact from "./Contact";
import "./home.css";
import HomeAnnounce from "./HomeAnnounce";
import { HomeProvider } from "./HomeContext";
import { NavbarProvider } from "../Navbar/NavbarContext";
import { Avatar, Col, Divider, Card, Layout, Menu, Popover, Row, Typography, theme, } from "antd";
import { AutoCenter, Grid } from 'antd-mobile'
import { useMediaQuery } from 'react-responsive'

const { Header, Sider, Content } = Layout;

const Home = () => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const homePc = () => {
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

  const homeMobile = () => {
    return (
      <div className="layout-home">
        <NavbarProvider>
          <Navbar />
          
          <HomeProvider>
            <Grid columns={1} >
              <Grid.Item>
                <Grid columns={1}>
                  <Row justify={'center'} align={'middle'}>
                    <Col>
                      <Row>
                        <Grid.Item >
                          <Col flex={'auto'} style={{ padding: 30 }}>
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
                      </Row>
                      <Row justify={'center'}>
                        <button className="btn-aboutme-mobile">About Us</button>
                      </Row>
                    </Col>
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

                  <Grid.Item >
                    <HomeAnnounce preview={false} />
                  </Grid.Item>

                  <Grid.Item >
                    <HomePublic />
                  </Grid.Item>

                  <Grid.Item style={{ paddingTop: 30, paddingBottom: 30 }}>
                    <HomePrivate />
                  </Grid.Item>
                </Grid>
              </Grid.Item>
            </Grid>
          </HomeProvider>
        </NavbarProvider>
      </div>
    )
  }


  const renderContent = () => {
    if (false) {
      return homePc()
    }
    if (true) {
      return homeMobile()
    }
  }
  return renderContent()
};

export default Home;
