import React from "react";
import HomePrivate from "./HomePrivate";
import HomePublic from "./HomePublic";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";
import Contact from "./Contact";

import "./home.css";
const Home = () => {
  return (
    // <div className="bg-test">
    <div className="body-home">
      <NavBarHome />
      <div className="home">
        <div className="home-container">
          <div className="home-sub">
            <div className="top-content">
              <div className="left-content">
                <p className="title-1">
                  What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum
                </p>
                <p className="title-2">
                  has been the industry's standard dummy text ever since the
                  1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not
                  only five
                </p>
                <button className="btn-aboutme">About Me</button>
              </div>
              <div className="right-content">
                <img alt="iconHome" className="iconHome" src="/iconHome.png" />
              </div>
            </div>
          </div>
          <div className="content"></div>
          <div className="content">
            <HomePublic />
          </div>
          <div className="content">
            <HomePrivate />
          </div>
          {/* <div className="contact" id="contact">
          <Contact />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
