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
    <div className="content-course">
      <div className="title-content">
        <p className="title-1">Public Course</p>
        <p className="title-2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>
      <div className="">
        <div className="row-content">
          <div className="col-content">
            <CardCourse Data={Data} />
          </div>
          <div className="col-content">
            <CardCourse Data={Data} />
          </div>
          <div className="col-content">
            <CardCourse Data={Data} />
          </div>
        </div>
        <div className="row-content">
          <div className="col-content none-dis">
            <CardCourse Data={Data} />
          </div>
          <div className="col-content none-dis">
            <CardCourse Data={Data} />
          </div>
          <div className="col-content none-dis">
            <CardCourse Data={Data} />
          </div>
        </div>
      </div>
      <div className="btn-navigate">
        <button className="btn-show-more">Show More</button>
      </div>
    </div>
  );
};

export default HomePublic;
