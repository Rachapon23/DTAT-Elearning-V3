import React from 'react'
import { Button, Result, Typography, } from 'antd';
const { Text, Link } = Typography;
const Course_finished = () => {
  return (
    <Result
      status="success"
      title="Successfully Created Course!"
      // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Link href='/teacher/page/list-course' type="primary" key="console">
          <Button type="primary">
            Go to List Course
          </Button>
        </Link>,
      ]}
    />
  )
}

export default Course_finished