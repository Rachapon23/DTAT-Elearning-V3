import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Typography,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../../../function/auth";
import { NavbarContext } from "./NavbarContext";

const { Link, Title } = Typography;

const Form_login = ({ setStatus }) => {
  const [inputData, setInputData] = useState({
    employee: "",
    password: "",
  });
  const {
    isModalOpenAuth,
    setIsModalOpenAuth,
    showModalAuth,
    handleOkAuth,
    handleCancelAuth,
  } = useContext(NavbarContext);
  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    await login(inputData)
      .then((res) => {
        console.log(res.data);
        const user = res.data?.payload?.user;
        sessionStorage.setItem("token", res.data?.token);
        sessionStorage.setItem("firstname", user?.firstname);
        sessionStorage.setItem("user_id", user?.user_id);
        sessionStorage.setItem("role", user?.role);
        handleCancelAuth()
        // navigate(`/${sessionStorage.getItem("role")}/page/home`)
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  };
  return (
    <>
      <Row
        justify={"center"}
        style={{ paddingBottom: "10px" }}
      >
        <Title style={{ fontSize: "200%" }}>Login</Title>
      </Row>
      <Form.Item
        name="employee"
        rules={[
          {
            required: true,
            message: "Please input your Employee ID!",
          },
        ]}
      >
        <Input
          name="employee"
          prefix={<UserOutlined />}
          placeholder="Employee ID"
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          name="password"
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          onChange={handleInput}
        />
      </Form.Item>
      {/* <Form.Item>
        <Row justify={"space-between"}>
          <Col>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <Link
              href="#"
              //   target="_blank"
            >
              Forgot password
            </Link>
          </Col>
        </Row>
      </Form.Item> */}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          onClick={handleLogin}
        //   onClick={()=>console.log(inputData)}
        >
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
      <Form.Item>
        <Row justify={"center"}>
          <Col>
            <p>Don't have an account ?</p>
          </Col>
          <Col>
            <Link
              style={{ marginLeft: "10px" }}
              onClick={() => setStatus(false)}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};

export default Form_login;
