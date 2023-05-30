import React from 'react'
import './card.css'
import { Button, Card, Image } from 'antd';

const { Meta } = Card;
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"
const DEBUG = true

const CardCourse = ({
  data = { _id: null, image: null, name: null, detail: null },
  onClick = null
}) => {

  const handleUnloadedImage = (e) => {
    e.target.src = DEFAULT_IMAGE
  }

  console.log(data._id)

  return (
    <Card
      id={data?._id}
      onClick={onClick}
      className='card-content'
      hoverable
      cover={
        <img
          // width={350}
          id={data?._id}
          onError={handleUnloadedImage}
          alt="course"
          src={(data?.image && !DEBUG ? (process.env.REACT_APP_IMG + data?.image) : DEFAULT_IMAGE)}
        />
      }
    >
      <Meta
        id={data?._id}
        title={data?.name ? data?.name : "Course"}
        description={data?.detail ? data?.detail : "Detail for course"}
      />
    </Card>
  )
}

export default CardCourse