import React, { useEffect, useState } from "react";
import "../AdminHome/adminhome.css";
import { Button, Input, Select, Table, Typography, Breadcrumb, Row, Col, Modal } from "antd";
import { listUser } from "../../../../function/Admin/adminFunction";
import AdminRegisterUserModal from "./AdminRegisterUserModal.js"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Title } = Typography;

const AdminListUser = () => {

  const [isModalOpenAuth, setIsModalOpenAuth] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [users, setUsers] = useState([
    {
      _id: "",
      employee: "",
      department: { id: "" },
      email: "",
      enabled: null,
      firstname: "",
      lastname: "",
      plant: { name: "" },
      profile: null,
      role: { name: "" },
      verified: null
    }
  ]);

  const columns = [
    {
      title: "No",
      align: "center",
      render: (data) => users.indexOf(data) + 1,
    },
    {
      title: `Plant`,
      align: "center",
      render: (data) => data?.plant?.name,
    },
    // {
    //   title: `Department ID`,
    //   align: "center",
    //   render: (data) => data?.department?.id,
    // },
    {
      title: `Employee ID`,
      align: "center",
      dataIndex: "employee",
    },
    {
      title: `Name`,
      align: "center",
      render: (data) => `${data?.firstname} ${data?.lastname}`,
    },
    {
      title: `Role`,
      align: "center",
      render: (data) => data?.role?.name,
    },
    {
      title: `Edit`,
      align: "center",
      width: "10%",
      render: (data) => {
        // TODO: implement delete user
        return (
          <Button>
            <EditOutlined />
          </Button>
        )
      },
    },
    {
      title: `Delete`,
      align: "center",
      width: "10%",
      render: (data) => {
        // TODO: implement delete user
        return (
          <Button>
            <DeleteOutlined />
          </Button>
        )
      },
    },
  ];

  const fetchUsers = async () => {
    await listUser(sessionStorage.getItem("token"))
      .then(
        (res) => {
          const data = res.data.data
          console.log(data)
          setUsers(data)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )
  }

  useEffect(() => {
    fetchUsers()
  }, [isChanged])

  return (
    <Row>
      <Col style={{ width: "100%" }}>
        <Row justify={'space-between'}>
          <Col flex={'auto'}>
            <Title level={5} >
              <p>List User</p>
            </Title>
          </Col>
          <Col >
            <Button type="primary" onClick={() => setIsModalOpenAuth(true)}>Add User</Button>
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "100%" }}>
            <Table
              columns={columns}
              dataSource={users}
              className="table-student"
              pagination={{
                defaultPageSize: 20,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],
              }}
            />
          </Col>
        </Row>
      </Col>

      <Modal
        open={isModalOpenAuth}
        onCancel={() => setIsModalOpenAuth(false)}
        footer={[]}
        bodyStyle={{
          paddingTop: "50px",
        }}
        className="modal-auth"
        style={{
          top: 20,
        }}
      >
        <AdminRegisterUserModal onChange={() => setIsChanged(true)} />
      </Modal>

    </Row>
  );
};

export default AdminListUser;
