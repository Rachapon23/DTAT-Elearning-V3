import React, { useEffect, useState } from "react";
import "./adminhome.css";
import { Button, Input, Select, Table, Typography, Breadcrumb } from "antd";
import { listUser } from "../../../../function/Admin/adminFunction";
const { Title } = Typography;

const AdminListUser = () => {

  const [users, setUsers] = useState([
    {
      _id: "",
      employee: "",
      department: { id: ""},
      email: "",
      enabled: null,
      firstname: "",
      lastname: "",
      plant: { name: ""},
      profile: null,
      role: { name: ""},
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
    {
      title: `Department ID`,
      align: "center",
      render: (data) => data?.department?.id,
    },
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
  }, [])

  return (
    <div>
      <Breadcrumb
        separator={
          <Title level={5} style={{ marginTop: "10px" }}>
            {" "}{">"}{" "}
          </Title>
        }
        items={[
          {
            title: (
              <Title level={5} style={{ marginTop: "10px" }}>
                <p>List User</p>
              </Title>
            ),
            key: "listuser",
          },
        ]}
      />
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
    </div>
  );
};

export default AdminListUser;
