import React, { useEffect, useState } from "react";

import {
  Col,
  Image,
  Row,
} from "antd";
import { FileOutlined } from "@ant-design/icons";
import { getPrivateFieldImage } from "../../../../function/Student/topic";

const StudentCourse_file = ({ item }) => {

  const [fileData, setfileData] = useState([])

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
      setfileData((prev) => [...prev, objectUrl])
    }
  }

  useEffect(() => {
    handleFetchImage()
  }, [])

  return (
    <div style={{ marginTop: "20px" }}>
      {item.file.map((ttem, ddex) => (
        <div key={ddex} className="">
          {
            ttem?.file_type && ttem?.file_type.includes("image") ? (
              <Row
                justify={"center"}
                align={"middle"}
                style={{ marginBottom: "15px" }}
              >
                <Col>
                  <Image
                    style={{ borderRadius: "10px" }}
                    height={250}
                    src={fileData[ddex]}
                  />
                </Col>
              </Row>
            ) : (
              <div className="">
                {ttem?.file_type === "video/mp4" ? (
                  <Row
                    justify={"center"}
                    align={"middle"}
                    style={{ marginBottom: "15px" }}
                  >
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                      <video width="50%" controls src={fileData[ddex]} />
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col style={{ width: "94%" }}>
                      <a style={{ textDecoration: "none" }}
                        href={fileData[ddex]}
                      >
                        <FileOutlined />{"  "}
                        {ttem?.original_name}
                      </a>
                    </Col>
                  </Row>
                )}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default StudentCourse_file;
