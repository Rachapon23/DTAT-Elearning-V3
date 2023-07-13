import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Typography,
  message,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../../../function/auth";
import { NavbarContext } from "./NavbarContext";
import { useNavigate } from "react-router-dom";

const { Link, Title } = Typography;

const Form_login = ({ setStatus }) => {
  const navigate = useNavigate()
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
  const [messageApi, notifyContextHolder] = message.useMessage();

  const notify = (type, message) => {
    //type success / error / warning
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (!inputData?.password) return
    if (inputData.password.length === 0) return
    await login(inputData)
      .then((res) => {
        console.log(res.data);
        const user = res.data?.payload?.user;
        sessionStorage.setItem("token", res.data?.token);
        sessionStorage.setItem("firstname", user?.firstname);
        sessionStorage.setItem("user_id", user?.user_id);
        sessionStorage.setItem("role", user?.role);
        handleCancelAuth()
      })
      .catch((err) => {
        const error = err.response
        console.log(`<${error.status}> ${error.data.error}`)
        notify("error", error.data.error)
      });
  };
  return (
    <>
      {notifyContextHolder}
      <Row
        justify={"center"}
        style={{ paddingBottom: "10px", marginTop: "-20px" }}
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
        <Input.Password
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
