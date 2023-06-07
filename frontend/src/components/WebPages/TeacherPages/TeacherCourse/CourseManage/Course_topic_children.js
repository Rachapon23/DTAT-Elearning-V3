import React from "react";
import { useState, useEffect, useContext } from "react";
import { Row, Card, Button, Col, Form, Input, Space } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";

// fucntion : DELETE
import { removeTopic } from "../../../../../function/Teacher/course_topic";

//course Context
import { CourseContext } from "./CourseContext";

const Course_topic_children = ({ item, index, nextState, setNextState }) => {
  const { loadTopic, topicData, setTopicData } = useContext(CourseContext);

  const deleteTopic = () => {
    // removeTopic(sessionStorage.getItem("token"), item._id)
    //   .then((res) => {
    //     loadTopic();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // alert for user
    //     alert(err.response.data.error);
    //   });
    topicData.splice(index, 1);
    setNextState([...nextState]);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name)
    setTopicData((topicData) =>
      topicData.map((topic) => {
        if (topic._id === item._id) {
          return { ...topic, [name]: value };
        } else {
          return topic;
        }
      })
    );
  };

  return (
    <Row className="course-main-for-topic">
      <Card
        className="card-topic"
        type="inner"
        title={`Topic Index ${index + 1}`}
        extra={
          <Button onClick={deleteTopic}>
            <DeleteOutlined />
          </Button>
        }
      >
        <Form
          // onFinish={onFinish}
          layout="vertical"
          fields={[
            {
              name: ["fieldTitle"],
              value: item?.title,
            },
            {
              name: ["fieldDetail"],
              value: item?.detail,
            },
          ]}
        >
          <Form.Item name="fieldTitle" label="Title">
            <Input name="title" onChange={handleChange} />
          </Form.Item>
          <Form.Item name="fieldDetail" label="Detail">
            <Input.TextArea name="detail" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Sub Topic"></Form.Item>
          <Form.Item label="Link"></Form.Item>
          <Form.Item label="File"></Form.Item>
        </Form>
      </Card>
    </Row>
  );
};

export default Course_topic_children;
