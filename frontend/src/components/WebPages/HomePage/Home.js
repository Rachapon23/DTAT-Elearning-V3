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
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography

const Home = () => {
  const navigate = useNavigate()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const isIphoneSe = useMediaQuery({ query: '(min-width: 375px)' })
  const isIpad = useMediaQuery({ query: '(min-width: 820px)' })

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
                          <Title level={1} style={{ marginTop: -10, color: "#14347d" }}>DENSO Training Academy Thailand</Title>
                        </p>
                        <p className="title-2" style={{ marginBottom: -15 }}>
                          <Row>
                            <Title level={3}>"Unlock Konwledge Anytime, Anywhere"</Title>
                          </Row>
                          <Row>
                            <Title level={3}>"ปลดล็อกความรู้ ทุกที่ ทุกเวลา"</Title>
                          </Row>
                        </p>
                        <button className="btn-aboutme" onClick={() => navigate('/about-us')}>About Me</button>
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
    let titleLevel2 = 5
    let titleLevel1 = 2
    let marginButton = -10
    if (isIphoneSe) {
      titleLevel2 = 5
      titleLevel1 = 2
    }
    if (isIpad) {
      titleLevel2 = 2
      titleLevel1 = 1
      marginButton = -50
    }
    return (
      <div className="layout-home">
        <NavbarProvider>
          <Navbar />

          <HomeProvider>
            <Grid columns={1} style={{ paddingTop: 50, }}>
              <Grid.Item>
                <Grid columns={1}>
                  <Row justify={'center'} align={'middle'}>
                    <Col flex={'auto'}>
                      <Row justify={'center'}>
                        <Grid.Item >
                          <Col flex={'auto'} style={{ padding: 30, marginBottom: -30 }}>
                            <p className="title-1-mobile">
                              <Title level={titleLevel1} style={{ color: "#14347d" }}>DENSO</Title>
                              <Title level={titleLevel1} style={{ marginTop: -10, color: "#14347d" }}>Training Academy Thailand</Title>
                            </p>
                            <Row>
                              <Title level={titleLevel2}>"Unlock Konwledge Anytime, Anywhere"</Title>
                            </Row>
                            <Row>
                              <Title level={titleLevel2}>"ปลดล็อกความรู้ ทุกที่ ทุกเวลา"</Title>
                            </Row>
                          </Col>
                        </Grid.Item>
                      </Row>
                      <Row justify={'center'} style={{ paddingTop: 20, marginBottom: marginButton }}>
                        <button className="btn-aboutme-mobile" onClick={() => navigate('/about-us')}>About Us</button>
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
    if (isDesktopOrLaptop) {
      return homePc()
    }
    if (isTabletOrMobile) {
      return homeMobile()
    }
  }
  return renderContent()
};

export default Home;
