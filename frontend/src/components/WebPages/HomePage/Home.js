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
};

export default Home;
