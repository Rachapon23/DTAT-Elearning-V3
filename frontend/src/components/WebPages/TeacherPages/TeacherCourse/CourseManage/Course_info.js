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

const { TextArea } = Input;
const Course_info = () => {
  const { courseData, course_id, loadDataCourse } = useContext(CourseContext);
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

  const handleFetchImage = useCallback(async () => {
    const image_name = courseData?.image?.name;
    if (!image_name) return;

    const createFileField = "course";
    const createFileParam = "file";

    let response;
    await getPrivateFieldImage(
      sessionStorage.getItem("token"),
      createFileField,
      createFileParam,
      image_name
    )
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        console.log(err);
      });

    const objectUrl = URL.createObjectURL(response.data);
    // console.log(objectUrl)
    setImageData(objectUrl);
  }, [courseData?.image?.name]);

  const debounceOnChange = debounce(handleChangeInfo, 500);

  const renderButton = () => {
    return (
      <ImgCrop showReset aspect={2.63 / 1}>
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
                {courseData?.image?.name === null ? (
                  // <Upload
                  //   name="avatar"
                  //   listType="picture-card"
                  //   className="avatar-uploader"
                  //   showUploadList={false}
                  //   customRequest={handleAddImage}
                  // >
                  //   {uploadButton}
                  // </Upload>
                  <>{renderButton()}</>
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
                      // src={imageData}
                      src={`${process.env.REACT_APP_IMG}/course/${courseData?.image?.name}`}
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
