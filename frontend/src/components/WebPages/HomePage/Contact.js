import React from "react";
import { Col, Layout, Row, Typography } from "antd";
import "./content.css";
import GoogleMapReact from "google-map-react";
import Navbar from "../Navbar/Navbar";
import { NavbarProvider } from "../Navbar/NavbarContext";
import { Content } from "antd/es/layout/layout";
import { useMediaQuery } from "react-responsive";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const { Text, Title } = Typography

const Contact = () => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const contactPc = () => {
    return (
      <Layout className="layout-home">
        <NavbarProvider>
          <Navbar />
        </NavbarProvider>
        <Content style={{ paddingTop: 80, paddingBottom: 70, paddingInline: 20 }}>
          <Row justify={'center'}>
            <Col flex={'auto'}>
              <Row justify={'center'}>
                <Title style={{ color: "#14347d" }}>
                  CONTACT
                </Title>
              </Row>
              <Row justify={'center'}>
                <Col flex={'auto'}>
                  <Row justify={'center'}>
                    <Title style={{ color: "#14347d" }}>
                      DENSO Training Academy Thailand (DTAT)
                    </Title>
                  </Row>
                  <Row justify={'center'}>
                    <Title level={3}>
                      Amata Nakorn Industrial Estate
                    </Title>
                  </Row>
                  <Row justify={'center'}>
                    <Title level={3}>
                      700/87 Moo 1, Bangna-Trad Rd., Km.57,
                    </Title>
                  </Row>
                  <Row justify={'center'}>
                    <Title level={3}>
                      T.Bankao, A.Panthong, Chonburi 20160 Thailand
                    </Title>
                  </Row>
                  <Row justify={'center'}>
                    <Title level={3}>
                      Tel: +66(0)-3821-4651 Nice-Net: (5062)-2808
                    </Title>
                  </Row>

                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }

  const contactMobile = () => {
    return (
      <Layout className="layout-home">
        <NavbarProvider>
          <Navbar />
        </NavbarProvider>
        <Content style={{ paddingTop: 80, paddingBottom: 70, paddingInline: 20 }}>
          <Row justify={'center'}>
            <Col flex={'auto'}>
              <Row justify={'center'}>
                <Title style={{ color: "#14347d" }}>
                  CONTACT
                </Title>
              </Row>
              <Row justify={'center'}>
                <Col flex={'auto'}>
                  <Row justify={'center'} align={'middle'}>
                    <Col >
                      <Title level={3} style={{marginTop: -10, color: "#14347d" }}>
                        DENSO
                      </Title>
                    </Col>
                    &nbsp;
                    <Col>
                      <Title level={3} style={{ marginTop: -10, color: "#14347d" }}>
                        Training Academy Thailand
                      </Title>
                    </Col>
                    &nbsp;
                    <Col>
                      <Title level={3} style={{ marginTop: -10, color: "#14347d" }}>
                        (DTAT)
                      </Title>
                    </Col>
                  </Row>
                  <Row justify={'center'}>
                    <Text strong>
                      Amata Nakorn Industrial Estate
                    </Text>
                  </Row>
                  <Row justify={'center'}>
                    <Text strong>
                      700/87 Moo 1, Bangna-Trad Rd., Km.57,
                    </Text>
                  </Row>
                  <Row justify={'center'}>
                    <Text strong>
                      T.Bankao, A.Panthong, Chonburi 20160 Thailand
                    </Text>
                  </Row>
                  <Row justify={'center'}>
                    <Text strong>
                      Tel: +66(0)-3821-4651 Nice-Net: (5062)-2808
                    </Text>
                  </Row>

                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }

  const renderContact = () => {
    if (isDesktopOrLaptop) return contactPc()
    if (isTabletOrMobile) return contactMobile()
  }

  return renderContact()
};

export default Contact;
