import React from 'react'
import './card.css'
import { Button, Card, Col, Image, Row } from 'antd';

const { Meta } = Card;
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"
const DEBUG = false

const CardCourse = ({
  data = { _id: null, image: null, name: null, detail: null },
  onClick = null
}) => {

  const handleUnloadedImage = (e) => {
    e.target.src = DEFAULT_IMAGE
  }

  console.log("data card: ", data.image)

  return (
    <Card
      id={data?._id}
      onClick={onClick}
      className='card-content'
      hoverable
      style={{height: "100%"}}
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
      <Row  id={data?._id}>
        <Col flex={"auto"} id={data?._id}>
          <Meta
            id={data?._id}
            title={data?.name ? <div id={data?._id}> {data?.name} </div> : "Course"}
            description={data?.detail ? <div id={data?._id}> {data?.detail} </div> : "Detail for course"}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default CardCourse