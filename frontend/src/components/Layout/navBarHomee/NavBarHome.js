import React, { useEffect, useState } from "react";
import "./navbarhome.css";
import LogAndRe from "./LogAndRe";
import { Button, Modal } from "antd";
import { BarsOutlined } from "@ant-design/icons";
const NavBarHome = () => {
  const [openDrop, setOpenDrop] = useState(false);
  const [nextState, setNextState] = useState([]);
  const [bg, setBg] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
    setOpenDrop(!openDrop);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const changeBG = () => {
    const scrollTop = this.myRef.current.scrollTop;
    console.log(scrollTop);
    if (window.screenY >= 90) {
      setBg("");
      setNextState([...nextState]);
    } else {
      console.log(window.screenY);
      setBg("dark");
      setNextState([...nextState]);
    }
  };

  // window.addEventListener("scroll", changeBG);

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlechange = () => {
    if (scrollTop >= 90) {
      // setNextState([...nextState])
      setBg("dark");
    } else {
      setBg("");
      // setNextState([...nextState])
    }
  };
  window.addEventListener("scroll", handlechange);

  return (
    <div className="nav-home">
      <div className={`full-screen ${bg}`}>
        <h2 className="logo">Logo</h2>
        <nav className="navigation">
          <a className="a-nav" href="/">
            Home
          </a>
          <a className="a-nav" href="/student/home">
            Public Course
          </a>
          <a className="a-nav" href="/teacher/page/home">
            Private Course
          </a>
          <a className="a-nav" href="/admin/page/home">
            Contact
          </a>
          <button className={"btn-login"} onClick={showModal}>
            Login
          </button>
          <div className="toggle_btn">
            <span onClick={() => setOpenDrop(!openDrop)}>
              <BarsOutlined />
            </span>
          </div>
        </nav>
      </div>

      <div className={`dropdown_menu ${openDrop}`}>
        <li>
          <a className="a-nav" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="a-nav" href="/student/home">
            Public Course
          </a>
        </li>
        <li>
          <a className="a-nav" href="/teacher/page/home">
            Private Course
          </a>
        </li>
        <li>
          <a className="a-nav" href="/admin/page/home">
            Contact
          </a>
        </li>
        <li>
          {" "}
          <button className={"btn-login"} onClick={showModal}>
            Login
          </button>
        </li>
      </div>

      <Modal
        className="modal-ant"
        style={{
          top:100,
          left:0,
          right:0,
        }}
        open={open}
        // width={1500}
        // title="login"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        mask={false}
      >
        <LogAndRe />
      </Modal>
    </div>
  );
};

export default NavBarHome;