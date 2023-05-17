import React from "react";
import { useState } from 'react';
import {
  InfoCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
  BorderOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Layout,
  Row,
  Tooltip,
  Button,
  Input,
  Typography,
  Table,
  Breadcrumb,
  Steps,
  Form,
  Radio,
  Upload,
  message,
  Image,
  Select,
  Calendar,
  Empty,
  Tree,
  Result,
} from "antd";
import AntdImgCrop from "antd-img-crop";


const { Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const CourseInfo = ({
  setCourseType,
  courseType,
  setCourseInfo,
  courseInfo,
}) => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChangeType = (type) => {
    setCourseType(type);
    // console.log(type)
  };
  const hadleChangeInfo = (e) => {
    setCourseInfo((courseInfo) => ({
      ...courseInfo,
      [e.target.name]: e.target.value,
    }));
  };

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

  return (
    <Form
      style={{ paddingTop: "2%" }}
      layout="vertical"
      // form={form}
      // initialValues={{
      //   requiredMarkValue: requiredMark,
      // }}
      // onValuesChange={onRequiredTypeChange}
      // requiredMark={requiredMark}
      // onFinish={OnFF}
    >
      <Row>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Course Name"
            required
            tooltip="This is a required field"
            name={"name"}
          >
            <Input
              placeholder="input placeholder"
              name="name"
              onChange={hadleChangeInfo}
            />
          </Form.Item>

          <Form.Item
            label="Detail"
            name={"detail"}
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
              // onChange={onChange}
              placeholder="can resize"
              name="detail"
              onChange={hadleChangeInfo}
            />
          </Form.Item>

          <Form.Item
            label="Course Type"
            required
            // tooltip={tooltipCourseType()}
          >
            <Radio.Group defaultValue={courseType} buttonStyle="solid">
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

export default CourseInfo;
