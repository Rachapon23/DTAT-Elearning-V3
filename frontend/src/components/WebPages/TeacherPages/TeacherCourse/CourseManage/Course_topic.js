import React from "react";
import { useState, useEffect, useContext } from "react";
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
  Tooltip,
  Empty,
} from "antd";
import "./CourseManage.css";
import {
  UserOutlined,
  SearchOutlined,
  BarsOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  PictureOutlined,
  UpOutlined,
  DownOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

//course Context
import { CourseContext } from "./CourseContext";
import Course_topic_children from "./Course_topic_children";

const Course_topic = () => {
  const { course_id, CreateContent, topicData, setTopicData } = useContext(CourseContext);

  return (
    <div style={{ paddingTop: "2%" }}>
      <Row>
        <Col span={24}>
          
          {
            topicData.length === 0 ?
              <Empty />
              :
              null
          }
        </Col>
        <Col className="col-card-add">
          <Card className="card-Add">
            <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
              <Col flex={"auto"}>
                <Row justify={"center"}>
                  <Tooltip title={"Add topic"} placement="left">
                    <Button type="text" onClick={CreateContent}>
                      <PlusSquareOutlined style={{ fontSize: "140%" }} />
                    </Button>
                  </Tooltip>
                </Row>
                <Row justify={"center"}>
                  <Tooltip title={"Go to top page"} placement="left">
                    <Button type="text" onClick={() => window.scrollTo(0, 0)}>
                      <UpOutlined style={{ fontSize: "140%" }} />
                    </Button>
                  </Tooltip>
                </Row>
                <Row justify={"center"}>
                  <Tooltip title={"Go to buttom page"} placement="left">
                    <Button
                      type="text"
                      onClick={() =>
                        window.scrollTo(0, document.body.scrollHeight)
                      }
                    >
                      <DownOutlined style={{ fontSize: "140%" }} />
                    </Button>
                  </Tooltip>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        {/* <div className="col-menu-content">
          <Card className="group-menu-content">
            <div className="menu-content">
              <Button type="primary" shape="circle" onClick={CreateContent}>
                +
              </Button>
              <Button
                type="primary"
                shape="circle"
                onClick={() => console.log(topicData)}
              >
                =
              </Button>
            </div>
          </Card>
        </div> */}
      </Row>
    </div>
  );
};

export default Course_topic;
