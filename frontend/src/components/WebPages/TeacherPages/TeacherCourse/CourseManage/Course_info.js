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
  Badge,
} from "antd";
import {
  InfoCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash";

//course Context
import { CourseContext } from "./CourseContext";
// fucntion : POST
import { createFile } from "../../../../../function/Teacher/course_update";
// fucntion : DELETE
import { deleteFileCourse } from "../../../../../function/Teacher/course";
// function Update : PUT
import { updateCourseStatus,updateCourseInfo } from "../../../../../function/Teacher/course_update";

const { TextArea } = Input;
const Course_info = () => {
  const {
    courseData,
    course_id,
    loadDataCourse,
  } = useContext(CourseContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const createFileField = "course";
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
    updateCourseStatus(
      sessionStorage.getItem("token"),
      {
        type: type,
      },
      course_id
    )
      .then((res) => {
        console.log(res);
        loadDataCourse();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const handleChangeInfo = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    updateCourseInfo(
      sessionStorage.getItem("token"),
      {
        field: field,
        value: value,
      },
      course_id
    )
      .then((res) => {
        console.log(res);
        loadDataCourse();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const handleAddImage = async (image) => {
    let formData = new FormData();
    formData.append("file", image?.file);
    formData.append("original_name", image?.file?.name);
    formData.append("course_id", course_id);

    await createFile(sessionStorage.getItem("token"), formData, createFileField)
      .then((res) => {
        // console.log(res);
        loadDataCourse();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemoveImage = async () => {
    await deleteFileCourse(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        console.log(res);
        loadDataCourse();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const debounceOnChange = debounce(handleChangeInfo, 500);

  return (
    <Form
      style={{ paddingTop: "2%" }}
      layout="vertical"
      fields={[
        {
          name: ["fieldName"],
          value: courseData?.name,
        },
        {
          name: ["fieldDetail"],
          value: courseData?.detail,
        },
        {
          name: ["fieldType"],
          value: courseData?.detail,
        },
      ]}
    >
      <Row>
        <Col style={{ width: "100%" }}>
          <Form.Item label="Cover Image">
            <Row justify={"center"} align={"middle"}>
              <Col>
                {courseData?.image?.name === null ? (
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={handleAddImage}
                  >
                    {uploadButton}
                  </Upload>
                ) : (
                  <Badge
                    count={
                      <Row justify={"center"} align={"middle"}>
                        <DeleteOutlined
                          onClick={handleRemoveImage}
                          style={{
                            fontSize: "120%",
                            color: "white",
                            backgroundColor: "#f5222d",
                            borderRadius: "50%",
                            padding: "20%",
                          }}
                        />
                      </Row>
                    }
                  >
                    <Image
                      height={250}
                      src={process.env.REACT_APP_IMG + courseData?.image?.name}
                    />
                  </Badge>
                )}
              </Col>
            </Row>
          </Form.Item>
        </Col>
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
              onChange={debounceOnChange}
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
              onChange={debounceOnChange}
            />
          </Form.Item>

          <Form.Item label="Course Type" required>
            <Radio.Group value={courseData?.type} buttonStyle="solid">
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
        </Col>
      </Row>
    </Form>
  );
};

export default Course_info;
