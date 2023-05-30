import React, { useContext } from "react";
import "./content.css";
import CardCourse from "../../../Card/CardCourse";
import { Col, Row, Image } from "antd";
import { HomeContext } from './HomeContext';

const GROUP_NUMBER = 3

const HomePublic = () => {

  const { coursePublic } = useContext(HomeContext)

  const Data = {
    img: "",
    title: "",
    description: "",
  };

  const renderContent = (index) => {

    if(index % GROUP_NUMBER !== 0) return null

    return (
      <div className="row-content">
        {
          coursePublic.slice(index, index + 3).map((data) => (
            <div className="col-content">
              <CardCourse data={data} />
            </div>
          ))
        }
      </div>
    )

  }

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
          {
            coursePublic.map((_, index) => (
              renderContent(index)
            ))
          }
        </div>
      </div>
      <div className="btn-navigate">
        <button className="btn-show-more">Show More</button>
      </div>
    </div>
  );
};

export default HomePublic;
