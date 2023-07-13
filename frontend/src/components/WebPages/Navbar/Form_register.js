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
import { listPlant, listDepartment, register } from "../../../function/auth";
import { NavbarContext } from "./NavbarContext";

const { Link, Title } = Typography;
const { Option } = Select;

const Form_register = ({ setStatus, }) => {
  const [departments, setDepartments] = useState([]);
  const [plants, setPlants] = useState([]);
  const [valueRegister, setValueRegister] = useState({
    employee: null,
    // department: null,
    password: null,
    confirm: null,
    // email: null,
    plant: null,
    firstname: null,
    lastname: null
  })
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
      title: 'Notify',
      content: `Register Success`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `Register Success`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  const onRegister = async () => {
    for (let key in valueRegister) {
      if (!valueRegister[key]) return
    }
    await register(valueRegister)
      .then((res) => {
        // console.log(res.data)
        setIsModalOpenAuth(false)
        countDown()
      })
      .catch((err) => {
        const error = err.response
        console.log(`<${error.status}> ${error.data.error}`)
        notify("error", error.data.error)

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
      {notifyContextHolder}
      {contextHolder}
      {/* name="employee" */}
      <Form.Item
        name="employee"
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
      {/* <Form.Item
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
      </Form.Item> */}

      {/* name="password" */}

      <Form.Item
        name="password"
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
        name="confirm"
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
      {/* <Form.Item
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
      </Form.Item> */}

      {/* name="plant" */}
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
          {plants.map((plant) => (
            <Option key={plant._id} value={plant._id}>
              {" "}{plant.name}{" "}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* name="firstname" */}
      <Form.Item
        name="firstname"
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
        name="lastname"
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
        <Button
          type="primary"
          htmlType="submit"
          block
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
