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
} from "antd";
import {
  InfoCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

// function get
import { getCourse } from "../../../../../function/Teacher/course";

const { TextArea } = Input;

const CourseInfo = ({
  courseType,
  setCourseType,
  setCourseInfo,
  courseInfo,
}) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const { course_id } = useParams();
  const [courseData, setCourseData] = useState({});

  const loadDataCourse = () => {
    getCourse(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        console.log(res);
        setCourseData(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  // for load data
  useEffect(() => {
    loadDataCourse();
  }, []);

  const handleChangeType = (type) => {
    setCourseType(type);
    setCourseInfo((courseInfo) => ({
      ...courseInfo,
      "type": type,
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

  const handleChangeInfo = (e) => {
    setCourseInfo((courseInfo) => ({
      ...courseInfo,
      [e.target.name]: e.target.value,
    }));
  };
// console.log(courseData.type,courseType)
  return (
    <Form style={{ paddingTop: "2%" }} layout="vertical"
    fields={[
      {
        name: ["fieldName"],
        value: courseData?.name,
      },
      {
        name: ["fieldDetail"],
        value: courseData?.detail,
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
              // defaultValue={courseData?.name}
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
              // defaultValue={courseData?.detail}
            />
          </Form.Item>

          <Form.Item label="Course Type" required>
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
