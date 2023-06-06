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
} from "antd";
import {
  InfoCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

//course Context
import { CourseContext } from "./CourseContext";

const { TextArea } = Input;

const Course_info = () => {
  const { courseInfo, setCourseInfo } = useContext(CourseContext);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleChangeType = (type) => {
    setCourseInfo((courseInfo) => ({
      ...courseInfo,
      type: type,
    }));
  };

  const handleChangeInfo = (e) => {
    setCourseInfo((courseInfo) => ({
      ...courseInfo,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Form
      style={{ paddingTop: "2%" }}
      layout="vertical"
      fields={[
        {
          name: ["fieldName"],
          value: courseInfo?.name,
        },
        {
          name: ["fieldDetail"],
          value: courseInfo?.detail,
        },
        {
          name: ["fieldType"],
          value: courseInfo?.detail,
        },
      ]}
    >
      <Row>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Course Name"
            required
            tooltip="This is a required field"
            name="fieldName"
          >
            <Input
              placeholder="input placeholder"
              name="name"
              onChange={handleChangeInfo}
            />
          </Form.Item>

          <Form.Item
            label="Detail"
            name="fieldDetail"
            required
            tooltip={{
              title: "Tooltip with customize icon",
              icon: <InfoCircleOutlined />,
            }}
          >
            <TextArea
              showCount
              maxLength={250}
              style={{ height: 120 }}
              placeholder="can resize"
              name="detail"
              onChange={handleChangeInfo}
            />
          </Form.Item>

          <Form.Item label="Course Type" required>
            <Radio.Group value={courseInfo?.type} buttonStyle="solid">
              <Radio.Button value={true} onClick={() => handleChangeType(true)}>
                Public
              </Radio.Button>
              <Radio.Button
                value={false}
                onClick={() => handleChangeType(false)}
              >
                Private
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Cover Image">
            <Row justify={"space-between"}>
              <Col style={{ width: "100%" }}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // beforeUpload={beforeUpload}
                  // onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Course_info;
