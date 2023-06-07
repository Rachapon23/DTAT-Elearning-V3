import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Button,
  Input,
  Form,
  Radio,
  Upload,
  Image,
  Empty
} from "antd";
import "./ContentCourse.css";
// import { createContent } from "../../../../../function/Teacher/course_topic";

const ContentCourse = () => {

  const {course_id} = useParams()
  
  const CreateContent = () =>{
    // createContent(sessionStorage.getItem("token"), course_id)
    // .then((res) => {
    //  console.log(res.data)
    // })
    // .catch((err) => {
    //   console.log(err);
    //   // alert for user
    //   alert(err.response.data.error);
    // });
  }
  return (
    <div>
      <Row>
        <Col span={24}>
        <Empty />;
        </Col>
        <div className="col-menu-content">
          <Card className="group-menu-content">
            <div className="menu-content">
              <Button type="primary" shape="circle"
              onClick={CreateContent}
              >
                +
              </Button>
            </div>
            <div className="menu-content">
              <Button type="primary" shape="circle">
                A
              </Button>
            </div>
            <div className="menu-content">
              <Button type="primary" shape="circle">
                A
              </Button>
            </div>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default ContentCourse;
