import React, { useCallback } from "react";
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
  UploadOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash";

//crop
import ImgCrop from "antd-img-crop";

//course Context
import { CourseContext } from "./CourseContext";
// fucntion : POST
import {
  createFile,
  createFilePublic,
} from "../../../../../function/Teacher/course_update";
// fucntion : DELETE
import {
  deleteFileCourse,
  getPrivateFieldImage,
} from "../../../../../function/Teacher/course";
// function Update : PUT
import {
  updateCourseStatus,
  updateCourseInfo,
} from "../../../../../function/Teacher/course_update";

const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"
const { TextArea } = Input;

const Course_info = () => {
  const { courseData, course_id, loadDataCourse, setUpdateInfo } = useContext(CourseContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const createFileField = "course";
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);

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
        console.log("we got:", res.data);
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

    await createFilePublic(
      sessionStorage.getItem("token"),
      formData,
      createFileField
    )
      .then((res) => {
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

  const handleUnloadImage = (e) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillText('Cannot Get Image', 30, 85);
    const dataUrl = canvas.toDataURL();
    e.target.src = dataUrl
  }

  const debounceOnChange = debounce(handleChangeInfo, 500);

  const renderUploadButton = () => {
    return (
      <ImgCrop showReset aspect={1.68 / 1}>
        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={handleAddImage}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
        >
          {uploadButton}
        </Upload>
      </ImgCrop>
    );
  };

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
                {courseData?.image?.name === null && courseData?.image?.name === "" ?
                  (
                    <>{renderUploadButton()}</>
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
                        onError={handleUnloadImage}
                        src={courseData?.image?.name ? `${process.env.REACT_APP_IMG}/course/${courseData?.image?.name}` : DEFAULT_IMAGE}
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
            // require
            tooltip="Name of the course will display correctly when name has length under 38 character"
            name="fieldName"
          >
            <Input
              showCount
              placeholder="Course name"
              name="name"
              onChange={debounceOnChange}
            />
          </Form.Item>

          <Form.Item
            label="Detail"
            name="fieldDetail"
            // required
            tooltip={{
              title: "Describe the information about course",
              icon: <InfoCircleOutlined />,
            }}
          >
            <TextArea
              // showCount
              // maxLength={250}
              style={{ height: 120 }}
              placeholder="Detail"
              name="detail"
              onChange={debounceOnChange}
            />
          </Form.Item>

          <Form.Item
            label="Course Type"
          // required
          >
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
