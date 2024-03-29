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
import InputReadOnly from "../../../common/Input/InputReadOnly";
import { updateResetPassword } from "../../../../function/Admin/adminFunction";
// import { NavbarContext } from "./NavbarContext";

const { Link, Title } = Typography;
const { Option } = Select;

const AdminEditUserModal = ({ data, onChange }) => {
    // const [departments, setDepartments] = useState([]);
    const [_data, _setData] = useState({ ...data })
    console.log("data", data)

    const [plants, setPlants] = useState([]);
    const [valueReset, setValueReset] = useState({
        new_password: null,
        confirm: null,
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
        setValueReset({ ...valueReset, [e.target.name]: e.target.value });
    };
    const handleSelectPlant = (e) => {
        setValueReset({ ...valueReset, 'plant': e });
    };
    // const handleSelectDepartment = (e) => {
    //   setValueReset({ ...valueReset, 'department': e });
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

    const onReset = async () => {
        try {
            await form.validateFields()
            for (let key in valueReset) {
                console.log(valueReset[key])

                if (!valueReset[key]) return
            }
        }
        catch (e) {
            if (e?.errorFields?.length > 0) return
        }

        await updateResetPassword(sessionStorage.getItem("token"), data._id, valueReset)
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
                <Title style={{ fontSize: "200%" }}> Reset Password </Title>
            </Row>
            {notifyContextHolder}
            <Form.Item
                name="employee"
            >
                <InputReadOnly addonBefore={{ title: "Employee ID" }} show={data.employee} />
            </Form.Item>

            <Form.Item
                name="firstname"
            >
                <InputReadOnly addonBefore={{ title: "First Name", paddingRight: 11 }} show={data.firstname} />
            </Form.Item>

            <Form.Item
                name="lastname"
            >
                <InputReadOnly addonBefore={{ title: "Last Name", paddingRight: 12 }} show={data.lastname} />
            </Form.Item>

            <Form.Item
                name="plant"
            >
                <InputReadOnly addonBefore={{ title: "Plant", paddingRight: 46 }} show={data.plant.name} />
            </Form.Item>


            <Form.Item
                name="new_password"
                rules={[
                    {
                        required: true,
                        message: "Please enter Password",
                    },
                ]}
            >
                <Input.Password
                    name="new_password"
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    onChange={handleInput}
                />
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['new_password']}
                // validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: "Please Confirm Password",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('new_password') === value) {
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
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AdminEditUserModal;
