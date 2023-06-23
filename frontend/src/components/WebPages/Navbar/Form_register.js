import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Typography,
  Select,
  Modal
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { listPlant, listDepartment, register } from "../../../function/auth";
import { NavbarContext } from "./NavbarContext";

const { Link, Title } = Typography;
const { Option } = Select;

const Form_register = ({ setStatus, }) => {
  const [departments, setDepartments] = useState([]);
  const [plants, setPlants] = useState([]);
  const [valueRegister, setValueRegister] = useState({
    employee: "",
    department: "",
    password: "",
    confirm: "",
    email: "",
    plant: "",
    firstname: "",
    lastname: ""
  })
  const {
    isModalOpenAuth,
    setIsModalOpenAuth,
    showModalAuth,
    handleOkAuth,
    handleCancelAuth,
  } = useContext(NavbarContext);

  const handleInput = (e) => {
    setValueRegister({ ...valueRegister, [e.target.name]: e.target.value });
  };
  const handleSelectPlant = (e) => {
    setValueRegister({ ...valueRegister, 'plant': e });
  };
  const handleSelectDepartment = (e) => {
    setValueRegister({ ...valueRegister, 'department': e });
  };

  const fetchDepartment = async () => {
    await listDepartment()
      .then((res) => {
        const data = res.data.data;
        setDepartments(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const fetchPlant = async () => {
    await listPlant()
      .then((res) => {
        const data = res.data.data;
        setPlants(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    fetchDepartment();
    fetchPlant();
  }, []);


  const [modal, contextHolder] = Modal.useModal();
  const countDown = () => {
    let secondsToGo = 5;
    const instance = modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  const onRegister = async () => {
    await register(valueRegister)
      .then((res) => {
        // console.log(res.data)
        setIsModalOpenAuth(false)
        countDown()
      })
      .catch((err) => {
        console.log(err)
      })

  };

  return (
    <>
      <Row
        justify={"center"}
        style={{ paddingBottom: "10px", marginTop: "-20px" }}
      >
        <Title style={{ fontSize: "200%" }}>Registeration</Title>
      </Row>
      {contextHolder}
      {/* name="employee" */}
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your Employee ID",
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

      {/* name="department" */}
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please select a Department",
          },
        ]}
      >
        <Select placeholder="Please select a Department"
          onChange={handleSelectDepartment}
        >
          {departments.map((department) => (
            <Option key={department._id} value={department._id}>
              {" "}
              {department.id}{" "}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* name="password" */}

      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your Password",
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

      {/* name="confirm" */}
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please Confirm Password",
          },
        ]}
      >
        <Input.Password
          name="confirm"
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
          onChange={handleInput}
        />
      </Form.Item>

      {/* name="email" */}
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your Email",
          },
        ]}
      >
        <Input
          name="email"
          prefix={<MailOutlined />}
          placeholder="Email"
          onChange={handleInput}
        />
      </Form.Item>

      {/* name="plant" */}
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please select a Plant",
          },
        ]}
      >
        <Select placeholder="Please select a Plant"
          onChange={handleSelectPlant}
        >
          {plants.map((plant) => (
            <Option key={plant._id} value={plant._id}>
              {" "}
              {plant.name}{" "}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* name="firstname" */}
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your First Name",
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

      {/* name="lastname" */}
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your Last Name",
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

      <Form.Item>
        <Button type="primary" htmlType="submit" block
          onClick={onRegister}
        >
          Register
        </Button>
      </Form.Item>
      <Form.Item>
        <Row justify={"center"}>
          <Col>
            <p>Don't have an account ?</p>
          </Col>
          <Col>
            <Link
              style={{ marginLeft: "10px" }}
              onClick={() => setStatus(true)}
            >
              Login
            </Link>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};

export default Form_register;
