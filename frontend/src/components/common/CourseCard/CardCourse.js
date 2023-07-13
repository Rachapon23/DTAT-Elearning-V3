import React from 'react'
import './card.css'
import { Card, Col, Row } from 'antd';

const { Meta } = Card;
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"
const DEBUG = false
const MAXIMUM_TITLE_LENGTH = 37

const CardCourse = ({
  data = { _id: null, image: null, name: 'null', detail: null },
  width = null,
  onClick = null
}) => {

  const handleUnloadedImage = (e) => {
    e.target.src = DEFAULT_IMAGE
  }

  const renderTitle = () => {
    if (!data?.name) return "Course"
    return (
      <Row id={data?._id}>
        {data?.name && data?.name.length <= MAXIMUM_TITLE_LENGTH ? `${data?.name.substring(0, MAXIMUM_TITLE_LENGTH)}` : `${data?.name.substring(0, MAXIMUM_TITLE_LENGTH)}...`}
      </Row>
    )
  }

  return (
    <Card
      id={data?._id}
      onClick={onClick}
      hoverable
      style={{ height: "100%", width: width ? width : 250 }}
      cover={
        <img
          // width={350}
          id={data?._id}
          onError={handleUnloadedImage}
          alt="course"
          src={(data?.image && !DEBUG ? `${process.env.REACT_APP_IMG}/course/${data?.image}` : DEFAULT_IMAGE)}
        />
      }
    >
      <Row id={data?._id}>
        <Col flex={"auto"} id={data?._id}>
          <Meta
            id={data?._id}
            title={renderTitle()}
            description={data?.detail ? <Row id={data?._id}> {data?.detail} </Row> : "Detail for course"}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default CardCourse