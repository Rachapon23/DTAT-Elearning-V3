import React from 'react'
import './card.css'
import { Card } from 'antd';

const { Meta } = Card;

const CardCourse = () => {
  return (
    <Card className='card-content'
    hoverable
    cover={<img alt="example" src="https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  )
}

export default CardCourse