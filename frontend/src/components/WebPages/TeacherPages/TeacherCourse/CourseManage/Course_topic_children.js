import React, { useCallback } from "react";
import { useState, useEffect, useContext } from "react";
import {
  Row,
  Card,
  Button,
  Col,
  Form,
  Image,
  Input,
  Badge,
  Space,
  Upload,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  VerticalAlignBottomOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash";
// fucntion : POST
import { createFile } from "../../../../../function/Teacher/course_update";
// fucntion : DELETE
import { removeTopic } from "../../../../../function/Teacher/course_topic";
// function Update : PUT
import {
  updateTopic,
  addSubTopic,
  removeSubTopic,
  updateSubTopic,
  addLinkTopic,
  removeLinkTopic,
  updateLinkTopic,
  removeFileTopic,
} from "../../../../../function/Teacher/course_topic";


//course Context
import { CourseContext } from "./CourseContext";
import { getPrivateFieldImage } from "../../../../../function/Teacher/course";

const { Text, Link } = Typography;

const Course_topic_children = ({ item, index, nextState, setNextState }) => {
  const { loadTopic, course_id } = useContext(CourseContext);
  const [loading, setLoading] = useState(false);
  const [fileData, setfileData] = useState([])



  const deleteTopic = () => {
    removeTopic(sessionStorage.getItem("token"), item._id)
      .then((res) => {
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    updateTopic(sessionStorage.getItem("token"), item._id, {
      field: field,
      value: value,
    })
      .then((res) => {
        console.log(res);
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };
  const handleAddSub = () => {
    addSubTopic(sessionStorage.getItem("token"), item._id)
      .then((res) => {
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };
  const handleRemoveSub = (index) => {
    removeSubTopic(sessionStorage.getItem("token"), item._id, {
      index: index,
    })
      .then((res) => {
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };
  const handleAddLink = () => {
    addLinkTopic(sessionStorage.getItem("token"), item._id)
      .then((res) => {
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };
  const handleRemoveLink = (index) => {
    const prevData = fileData.slice(0, index)
    const nextData = fileData.slice(index + 1, fileData.length)
    setfileData(() => [...prevData, ...nextData])
    console.log("fileData update: ", fileData)

    removeLinkTopic(sessionStorage.getItem("token"), item._id, {
      index: index,
    })
      .then((res) => {
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };
  const handleChangeSub = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    updateSubTopic(sessionStorage.getItem("token"), item._id, {
      field: field,
      value: value,
    })
      .then((res) => {
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };
  const handleChangeLink = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    const index = parseInt(e.target.name);

    updateLinkTopic(sessionStorage.getItem("token"), item._id, {
      field: field,
      value: value,
      index: index,
    })
      .then((res) => {
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const debounceOnChange = debounce(handleChange, 500);
  const debounceOnChangeSub = debounce(handleChangeSub, 500);
  const debounceOnChangeLink = debounce(handleChangeLink, 500);

  const createFileField = "topic";
  const handleAddFile = async (image) => {
    let formData = new FormData();
    formData.append("file", image?.file);
    formData.append("original_name", image?.file?.name);
    formData.append("topic_id", item._id);

    await createFile(sessionStorage.getItem("token"), formData, createFileField)
      .then((res) => {
        const data = res.data.data
        if (data.file_type && data.file_type.includes("image")) {
          const objectUrl = URL.createObjectURL(image?.file);
          setfileData((prev) => [...prev, objectUrl])
        }
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
      });

  };
  const handleRemoveFile = (index) => {
    removeFileTopic(sessionStorage.getItem("token"), item._id, {
      index: index,
    })
      .then((res) => {
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const handleFetchImage = async () => {

    if (!item?.file) return
    if (!Array.isArray(item?.file)) return

    for (let i = 0; i < item?.file.length; i++) {
      const image_name = item?.file[i]?.name
      if (!image_name) return

      const createFileField = "topic"
      const createFileParam = "file"

      let response
      await getPrivateFieldImage(sessionStorage.getItem("token"), createFileField, createFileParam, image_name)
        .then(
          (res) => {
            response = res
          }
        )
        .catch(
          (err) => {
            console.log(err)
          }
        )

      const objectUrl = URL.createObjectURL(response.data);
      console.log(objectUrl)
      setfileData((prev) => [...prev, objectUrl])
    }
  }

  useEffect(() => {
    handleFetchImage()
  }, [])



  return (
    <Row className="course-main-for-topic">
      <Card
        className="card-topic"
        type="inner"
        title={`Topic Index ${index + 1}`}
        extra={
          <Button onClick={deleteTopic}>
            <Row justify={"center"} align={"middle"}>
              <Col flex={"auto"} style={{ marginTop: "-5px" }}>
                <DeleteOutlined />
              </Col>
            </Row>
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
            <Input name="title" onChange={debounceOnChange} />
          </Form.Item>
          <Form.Item name="fieldDetail" label="Detail">
            <Input.TextArea name="detail" onChange={debounceOnChange} />
          </Form.Item>
        </Form>
        <div style={{ marginBottom: "20px" }}>
          <label>Sub Content</label>
          <hr />
          {item?.sub_content.map((ttem, ddex) => (
            <Form
              key={ddex}
              layout="vertical"
              fields={[
                {
                  name: ["fieldsub"],
                  value: ttem,
                },
              ]}
            >
              <Row>
                <Col style={{ width: "94%" }}>
                  <Form.Item name="fieldsub">
                    <Input name={`${ddex}`} onChange={debounceOnChangeSub} />
                  </Form.Item>
                </Col>
                <Col
                  style={{
                    width: "5%",
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "1%",
                    paddingTop: "7px",
                    // alignItems: "center",
                    // backgroundColor:"red"
                  }}
                >
                  <MinusCircleOutlined
                    style={{ fontSize: "130%" }}
                    className="dynamic-delete-button"
                    onClick={() => handleRemoveSub(ddex)}
                  />
                </Col>
              </Row>
            </Form>
          ))}
          <Button
            type="dashed"
            onClick={handleAddSub}
            style={{
              width: "100%",
            }}
            icon={<div style={{ fontSize: "150%" }}>+</div>}
          >
            Add Sub Content
          </Button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Link</label>
          <hr />
          {item?.link.map((ttem, ddex) => (
            <Form
              key={ddex}
              layout="vertical"
              fields={[
                {
                  name: ["fieldname"],
                  value: ttem?.name,
                },
                {
                  name: ["fieldlink"],
                  value: ttem?.link,
                },
              ]}
            >
              <Row>
                <Col style={{ width: "30%" }}>
                  <Form.Item name="fieldname">
                    <Input
                      name={`${ddex}`}
                      placeholder="name"
                      onChange={debounceOnChangeLink}
                    />
                  </Form.Item>
                </Col>
                <Col style={{ width: "64%", paddingLeft: "5px" }}>
                  <Form.Item name="fieldlink">
                    <Input
                      name={`${ddex}`}
                      placeholder="link"
                      onChange={debounceOnChangeLink}
                    />
                  </Form.Item>
                </Col>
                <Col
                  style={{
                    width: "5%",
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "1%",
                    paddingTop: "7px",
                    // alignItems: "center",
                    // backgroundColor:"red"
                  }}
                >
                  <MinusCircleOutlined
                    style={{ fontSize: "130%" }}
                    className="dynamic-delete-button"
                    onClick={() => handleRemoveLink(ddex)}
                  />
                </Col>
              </Row>
            </Form>
          ))}
          <Button
            type="dashed"
            onClick={handleAddLink}
            style={{
              width: "100%",
            }}
            icon={<div style={{ fontSize: "150%" }}>+</div>}
          >
            Add Link
          </Button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>File</label>
          <hr />
          {/* {JSON.stringify(item)} */}
          {
            item?.file.map((ttem, ddex) => (
              <div style={{ marginBottom: "10px" }} key={ddex}>
                {
                  ttem?.file_type && ttem?.file_type.includes("image")
                    ? (
                      <Row justify={"center"} align={"middle"}>
                        <Col>
                          <Badge
                            count={
                              <Row justify={"center"} align={"middle"}>
                                <DeleteOutlined
                                  onClick={() => handleRemoveFile(ddex)}
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
                              src={fileData[ddex]}
                            />
                          </Badge>
                        </Col>
                      </Row>
                    )
                    :
                    (
                      ttem?.file_type && ttem?.file_type.includes("video") ?
                        (
                          <Row justify={"center"} align={"middle"}>
                            <Col>
                              <Badge
                                count={
                                  <Row justify={"center"} align={"middle"}>
                                    <DeleteOutlined
                                      onClick={() => handleRemoveFile(ddex)}
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
                                <video controls src={fileData[ddex]} width={500} />
                              </Badge>
                            </Col>
                          </Row>
                        )
                        :
                        (
                          <Row>
                            <Col style={{ width: "94%" }}>
                              <Link
                                href={process.env.REACT_APP_IMG + `/topic/${ttem?.name}`}
                                target="_blank">{ttem?.original_name}</Link>
                            </Col>
                            <Col
                              style={{
                                width: "5%",
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "1%",
                                // alignItems: "center",
                                // backgroundColor:"red"
                              }}
                            >
                              <MinusCircleOutlined
                                style={{ fontSize: "130%" }}
                                className="dynamic-delete-button"
                                onClick={() => handleRemoveFile(ddex)}
                              />
                            </Col>
                          </Row>
                        )
                    )

                }
              </div>
            ))
          }
          <Upload showUploadList={false} customRequest={handleAddFile}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>

        </div>
      </Card>
    </Row >
  );
};

export default Course_topic_children;
