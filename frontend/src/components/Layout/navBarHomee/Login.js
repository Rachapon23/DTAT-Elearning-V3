import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Space } from "antd";
import "./logandre.css";
import { Col, Row } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '../../../function/auth';

const Login = ({ layout, setLayout }) => {

  const [inputData, setInputData] = useState({
    employee: "",
    password: "",
  })

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    await login(inputData)
      .then((res) => {
        console.log(res.data)
        const user = res.data?.payload?.user
        sessionStorage.setItem("token", res.data?.token)
        sessionStorage.setItem("firstname", user?.firstname)
        sessionStorage.setItem("user_id", user?.user_id)
        sessionStorage.setItem("role", user?.role)
      })
      .catch((err) => {
        console.log(err.response?.data)
      })
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}

    >
      <Form.Item
        name="employee"
        rules={[
          {
            required: true,
            message: 'Please input your Employee ID!',
          },
        ]}
      >
        <Input name="employee" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Employee ID" onChange={handleInput} />
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
          name="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={handleInput}
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
        <Button type="primary" htmlType="submit" className="form-button" onClick={handleLogin}>
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
      <Form.Item>
        <p className="register-link">
          Don't have an account ?
          <a onClick={() => setLayout(!layout)} className="register-link-a">
            Register
          </a>
        </p>
      </Form.Item>
    </Form>
  )
}

export default Login