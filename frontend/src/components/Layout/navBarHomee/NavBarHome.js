import React, { useState } from "react";
import "./navbarhome.css";
import LogAndRe from "./LogAndRe";
import { Button, Modal } from "antd";
import { BarsOutlined } from "@ant-design/icons";
const NavBarHome = () => {
  const [openDrop, setOpenDrop] = useState(false);
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

  return (
    <div className={"nav-home"}>
      <h2 className="logo">Logo</h2>
      <nav className={"navigation"}>
        <a href="#">Home</a>
        <a href="#">Public Course</a>
        <a href="#">Private Course</a>
        <a href="#">Contact</a>
        <button className={"btn-login"} onClick={showModal}>
          Login
        </button>
        <div className="toggle_btn">
          <span onClick={() => setOpenDrop(!openDrop)}>
            <BarsOutlined />
          </span>
        </div>
      </nav>
      <div className={`dropdown_menu ${openDrop}`}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Public Course</a>
        </li>
        <li>
          <a href="#">Private Course</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          {" "}
          <button className={"btn-login"} onClick={showModal}>
            Login
          </button>
        </li>
      </div>

      <Modal
        open={open}
        // title="login"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        mask={false}
      >
     <LogAndRe/>
      </Modal>
    </div>
  );
};

export default NavBarHome;
