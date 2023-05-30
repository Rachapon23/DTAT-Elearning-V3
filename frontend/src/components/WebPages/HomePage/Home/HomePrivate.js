import React, { useContext } from 'react'
import "./content.css";
import CardCourse from "../../../Card/CardCourse";
import { Col, Row } from "antd";
import { HomeContext } from './HomeContext';

const GROUP_NUMBER = 3
const DEFAULT_DATA = {
  detail: "Waiting for new course...",
  image: null,
  name: "No course available",
}

const arrayTemplate = new Array(6).fill(false)

const HomePrivate = () => {

  const { coursePrivate } = useContext(HomeContext)

  const renderContent = (index) => {
    if (index % GROUP_NUMBER !== 0) return null

    return (
      <div className="row-content">
        {
          coursePrivate.length > 0 ?
            (
              coursePrivate.slice(index, index + GROUP_NUMBER).map((data) => (
                <div className="col-content">
                  <CardCourse data={{
                    name: data?.name,
                    detail: data?.detail,
                    image: data?.image?.url
                  }} />
                </div>
              ))
            )
            :
            (
              arrayTemplate.slice(index, index + GROUP_NUMBER).map(() => (
                <div className="col-content">
                  <CardCourse data={DEFAULT_DATA} />
                </div>
              ))
            )
        }
      </div>
    )

  }

  return (
    <div className="content-course">
      <div className="title-content">
        <p className="title-1">Private Course</p>
        <p className="title-2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>
      <div className="">
        <div className="row-content">
          {
            coursePrivate.length > 0 ?
              (
                coursePrivate.map((_, index) => (
                  renderContent(index)
                ))
              )
              :
              (
                arrayTemplate.map((_, index) => (
                  renderContent(index)
                ))
              )
          }
        </div>
      </div>
      <div className="btn-navigate">
        <button className="btn-show-more">Show More</button>
      </div>
    </div>
  )
}

export default HomePrivate