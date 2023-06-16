import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Image,
  Row,
  Timeline,
  Typography,
} from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
const StudentCourse_link = ({ item }) => {
  return (
    <div>
      {item.link.map((ttem, ddex) => (
        <a key={ddex} href={ttem?.link}>
          <LinkOutlined />
          {"  "}
          {ttem.name}
        </a>
      ))}
    </div>
  );
};

export default StudentCourse_link;
