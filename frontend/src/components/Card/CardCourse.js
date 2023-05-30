import React from 'react'
import './card.css'
import { Card } from 'antd';

const { Meta } = Card;
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"

const CardCourse = ({ data = null }) => {
  
  const handleUnloadedImage = (e) => {
    e.target.src = DEFAULT_IMAGE
  }

  console.log(data)

  return (
    <Card className='card-content'
      hoverable
      cover={
        <img
          onError={handleUnloadedImage}
          alt="private course"
          src={data?.image ? data?.image : DEFAULT_IMAGE}
        />
      }
    >
      <Meta
        title={data?.name ? data?.name : "Course"}
        description={data?.detail ? data?.detail : "Detail for course"}
      />
    </Card>
  )
}

export default CardCourse