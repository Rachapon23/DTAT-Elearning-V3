import React, { useState } from "react";

import { Form, } from "antd";
import Form_login from "./Form_login";
import Form_register from "./Form_register";

const Auth = () => {
  // const navigate = useNavigate()

  const [status, setStatus] = useState(true);

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      {status ? (
        <Form_login setStatus={setStatus} />
      ) : (
        <Form_register setStatus={setStatus} />
      )}
      {/* <Form.Item
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
          prefix={<UserOutlined className="site-form-item-icon" />}
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
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item>
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
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          //   className="form-button"
          //   onClick={handleLogin}
        >
          Log in
        </Button>

      </Form.Item>
      <Form.Item>
        <Row justify={'center'}>
            <Col>
            <p>
          Don't have an account ?
        </p>
            </Col>
            <Col>
            <Link
             style={{marginLeft:"10px"}}
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form.Item> */}
    </Form>
  );
};

export default Auth;
