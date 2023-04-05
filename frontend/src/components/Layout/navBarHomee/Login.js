import React, { useState }  from 'react'
import { Button, Checkbox, Form, Input, Space } from "antd";
import "./logandre.css";
import { Col, Row } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const Login = ({layout,setLayout}) => {
  return (
    <Form
    name="normal_login"
    className="login-form"
    initialValues={{
      remember: true,
    }}

  >
    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your Username!',
        },
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
      ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <a className="login-form-forgot" href="">
        Forgot password
      </a>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="form-button">
        Log in
      </Button>
      {/* Or <a href="">register now!</a> */}
    </Form.Item>
    <Form.Item>
    <p className="register-link">
              Don't have an account ?
              <a onClick={()=>setLayout(!layout)} className="register-link-a">
                Register
              </a>
            </p>
    </Form.Item>
  </Form>
  )
}

export default Login