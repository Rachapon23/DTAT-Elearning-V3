import React from "react";
import "./content.css";
import CardCourse from "../../../Card/CardCourse";
import { Col, Row } from "antd";

const HomePublic = () => {
  const Data = {
    img: "",
    title: "",
    description: "",
  };

  return (
    <div>
      <div className="title-content">
        <p className="title-1">Public Course</p>
        <p className="title-2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>
      <div className="card-content">
        <Row  justify="space-between">
          <Col span={8} className="col-card">
            <CardCourse Data={Data} />
          </Col>
          <Col span={8} className="col-card">
            <CardCourse Data={Data} />
          </Col>
          <Col span={8} className="col-card">
            <CardCourse Data={Data} />
          </Col>
        </Row>
        <Row  justify="space-between" style={{marginTop:"20px"}}>
          <Col span={8} className="col-card">
            <CardCourse Data={Data} />
          </Col>
          <Col span={8} className="col-card">
            <CardCourse Data={Data} />
          </Col>
          <Col span={8} className="col-card">
            <CardCourse Data={Data} />
          </Col>
        </Row>
      </div>
      <div className="btn-navigate">
      <button className="btn-show-more">Show More</button>
      </div>
    </div>
  );
};

export default HomePublic;
