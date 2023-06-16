import React from "react";

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Image,
  Row,
  Timeline,
  Typography,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FileOutlined } from "@ant-design/icons";

const StudentCourse_file = ({ item }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {item.file.map((ttem, ddex) => (
        <div key={ddex} className="">
          {ttem?.file_type === "image/jpeg" ||
          ttem?.file_type === "image/png" ? (
            <Row
              justify={"center"}
              align={"middle"}
              style={{ marginBottom: "15px" }}
            >
              <Col>
                <Image
                style={{borderRadius:"10px"}}
                  height={250}
                  src={`http://localhost:5500/uploads/topic/${ttem?.name}`}
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
                    <video width="50%" controls>
                      <source
                        src={`http://localhost:5500/uploads/topic/${ttem?.name}`}
                      />
                    </video>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col style={{ width: "94%" }}>
                    <a style={{textDecoration:"none"}}
                      href={`http://localhost:5500/uploads/topic/${ttem?.name}`}
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
