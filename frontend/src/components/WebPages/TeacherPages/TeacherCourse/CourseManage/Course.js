import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ReadOutlined,
  ScheduleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Col,
  Divider,
  Layout,
  Menu,
  Popover,
  Row,
  Typography,
  theme,
} from "antd";
import "../../teach.css";
import { CourseProvider } from "./CourseContext";
import Course_main from "./Course_main";
import { useParams, useNavigate } from "react-router-dom";
// for haeder or navbar
import Navbar from "../../../Navbar/Navbar";
import { NavbarProvider } from "../../../Navbar/NavbarContext";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography
const Course = () => {

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Home", "home", <HomeOutlined />),
    // getItem('Course', 'list-course', <ReadOutlined />),
    getItem("Course", "course", <ReadOutlined />, [
      getItem("Create Course", "create"),
      getItem("List Course", "list-course"),
      getItem("Evaluate Student", "evaluate-student"),
    ]),
    getItem("Exam", "exam", <ScheduleOutlined />, [
      getItem("List Exam", "list-exam"),
      getItem("Create Exam", "create-exam"),
    ]),
    getItem("Calendar", "calendar", <CalendarOutlined />),
  ];

  const redirect = (e) => {
    console.log(e)
    if (e !== "create") {
      navigate(`/teacher/page/${e}`)
    }
  }

  return (
    <CourseProvider>
      <Course_main />
    </CourseProvider>
  );
};

export default Course;
