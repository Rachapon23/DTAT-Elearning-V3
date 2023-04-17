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
import { useState, useEffect } from "react";
import { listPlant ,listDepartment, register } from "../../../function/auth";
import "./logandre.css";

const { Option } = Select;

const App = ({ layout, setLayout }) => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([{
    _id: "",
    id: "",
  }]);

  const [plants, setPlants] = useState([{
    _id: "", 
    name: ""
  }]);

  const onFinish = async (data) => {
    delete data.confirm;
    console.log("Received values of form: ", data);
    
    await register(data)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })

  };

  const fetchDepartment = async () => {
    await listDepartment()
      .then((res) => {
        const data = res.data.data
        console.log(data)
        setDepartments(data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  const fetchPlant = async () => {
    await listPlant()
      .then((res) => {
        const data = res.data.data
        console.log(data)
        setPlants(data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  useEffect(() => {
    fetchDepartment();
    fetchPlant();
  }, [])

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
            name="employee"
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
            name="department"
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
            {/* <Input /> */}
            <Select placeholder="Please select a Plant">
              {/* <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option> */}
              {
                 departments.map((department) => (
                  <Option key={department._id} value={department._id}> {department.id} </Option>
                ))
              }
            </Select>

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
            name="plant"
            label="Plant"
            hasFeedback
            rules={[{
              required: true,
              message: "Please select your Plant!"
            }]}
          >
            <Select placeholder="Please select a Plant">
              {/* <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option> */}
              {
                plants.map((plant) => (
                  <Option key={plant._id} value={plant._id}>{plant.name}</Option>
                ))
              }
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
