import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useState } from "react";
import "./logandre.css";

const { Option } = Select;

const App = ({ layout, setLayout }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="register"
      className="register-form"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="employee_ID"
            label="Employee ID"
            // tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your Employee ID!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="department_ID"
            label="Department ID"
            // tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your Department ID!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="select"
            label="Select"
            hasFeedback
            rules={[{ 
              required: true, 
              message: "Please select your Plant!" }]}
          >
            <Select placeholder="Please select a Plant">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstname"
            label="First name"
            // tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your First name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastname"
            label="Last name"
            // tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your Last name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="form-button">
          Register
        </Button>
      </Form.Item>
      <Form.Item>
        <p className="register-link">
          Already have an account ?
          <a onClick={() => setLayout(!layout)} className="register-link-a">
            Login
          </a>
        </p>
      </Form.Item>
    </Form>
  );
};
export default App;
