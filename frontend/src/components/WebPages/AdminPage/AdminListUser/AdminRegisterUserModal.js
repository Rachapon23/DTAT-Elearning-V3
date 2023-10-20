import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Typography,
  Select,
  Modal,
  message
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import {
  listPlant,
  // listDepartment,
  register,
} from "../../../../function/auth";
import { useForm } from "antd/es/form/Form";
// import { NavbarContext } from "./NavbarContext";

const { Link, Title } = Typography;
const { Option } = Select;

const AdminRegisterUserModal = ({ onChange }) => {
  // const [departments, setDepartments] = useState([]);
  const [plants, setPlants] = useState([]);
  const [valueRegister, setValueRegister] = useState({
    employee: null,
    password: null,
    confirm: null,
    plant: null,
    firstname: null,
    lastname: null
  })

  const [messageApi, notifyContextHolder] = message.useMessage();
  const [form] = Form.useForm()

  const notify = (type, message) => {
    //type success / error / warning
    messageApi.open({
      type: type,
      content: message,
    });
  };


  const handleInput = (e) => {
    setValueRegister({ ...valueRegister, [e.target.name]: e.target.value });
  };
  const handleSelectPlant = (e) => {
    setValueRegister({ ...valueRegister, 'plant': e });
  };
  // const handleSelectDepartment = (e) => {
  //   setValueRegister({ ...valueRegister, 'department': e });
  // };

  // const fetchDepartment = async () => {
  //   await listDepartment()
  //     .then((res) => {
  //       const data = res.data.data;
  //       setDepartments(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // };

  const fetchPlant = async () => {
    await listPlant(sessionStorage.getItem("token"))
      .then((res) => {
        const data = res.data.data;
        setPlants(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    // fetchDepartment();
    fetchPlant();
  }, []);

  const onRegister = async () => {

    try {
      await form.validateFields()
      for (let key in valueRegister) {
        if (!valueRegister[key]) return
      }
    }
    catch (e) {
      if (e?.errorFields?.length > 0) return
    }



    await register(sessionStorage.getItem("token"), valueRegister)
      .then((res) => {
        onChange()
        notify("success", res.data.data)
        form.resetFields()
      })
      .catch((err) => {
        const error = err.response
        notify("error", error.data.error)

      })
  };

  return (
    <Form form={form}>
      <Row
        justify={"center"}
        style={{ paddingBottom: "10px", marginTop: "-20px" }}
      >
        <Title style={{ fontSize: "200%" }}> Registeration </Title>
      </Row>
      {notifyContextHolder}
      <Form.Item
        name="employee"
        rules={[
          {
            required: true,
            message: "Please enter Employee ID",
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
            message: "Please enter Password",
          },
        ]}
      >
        <Input.Password
          name="password"
          prefix={<LockOutlined />}
          placeholder="Password"
          onChange={handleInput}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        // validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: "Please Confirm Password",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Confirm password do not match with Password'));
            },
          }),
        ]}
      >
        <Input.Password
          name="confirm"
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
          onChange={handleInput}
        />
      </Form.Item>

      <Form.Item
        name="plant"
        rules={[
          {
            required: true,
            message: "Please select a Plant",
          },
        ]}
      >
        <Select
          placeholder="Please select a Plant"
          onChange={handleSelectPlant}
        >
          {
            plants.map((plant) => (
              <Option key={plant._id} value={plant._id}>
                {" "}{plant.name}{" "}
              </Option>
            ))
          }
        </Select>
      </Form.Item>

      <Form.Item
        name="firstname"
        rules={[
          {
            required: true,
            message: "Please enter First Name",
          },
        ]}
      >
        <Input
          name="firstname"
          prefix={<SolutionOutlined />}
          placeholder="First Name"
          onChange={handleInput}
        />
      </Form.Item>

      <Form.Item
        name="lastname"
        rules={[
          {
            required: true,
            message: "Please enter Last Name",
          },
        ]}
      >
        <Input
          name="lastname"
          prefix={<SolutionOutlined />}
          placeholder="Last Name"
          onChange={handleInput}
        />
      </Form.Item>

      <Row justify={'space-between'}>
        <Col>
          <Button
            block
            onClick={() => form.resetFields()}
          >
            Clear
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            block
            onClick={onRegister}
          >
            Register
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdminRegisterUserModal;
