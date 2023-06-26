import React, { Suspense } from "react";
import { LinkOutlined } from "@ant-design/icons";
import { Col, Row, Spin } from "antd";

const StudentCourse_link = ({ item }) => {
  const renderLinkContent = (item, index) => {
    if (!item?.link) return null
    if (item?.link?.includes("youtube.com/")) {
      const actualLink = (item?.link.split("&"))[0]
      return (
        <Row justify={"center"}>
          <Col flex={"auto"} style={{ paddingTop: "15px" }}>
            <Suspense
              fallback={
                <Spin tip="Loading" size="large" />
              }
            >
              <div key={index} className="mb-2 d-flex justify-content-center">
                <iframe
                  width="400"
                  height="270"
                  src={actualLink.replace("watch?v=", "embed/")}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Suspense>
          </Col>
        </Row>
      )
    }
    if (item?.link?.includes("youtu.be")) {
      return (
        <Row justify={"center"}>
          <Col flex={"auto"} style={{ paddingTop: "15px" }}>
            <div key={index}>
              <iframe
                width="400"
                height="270"
                src={item?.link.replace(".be/", "be.com/embed/")}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Col>
        </Row>

      )
    }
    return (
      <Row justify={"center"}>
        <Col flex={"auto"} style={{ paddingTop: "15px" }}>
          <a key={index} href={item?.link}>
            <LinkOutlined />
            {"  "}
            {item?.name}
          </a>
        </Col>
      </Row>

    )

  }
  return (
    <div>
      {item.link.map((ttem, ddex) => (
        renderLinkContent(ttem, ddex)
      ))}
    </div>
  );
};

export default StudentCourse_link;
