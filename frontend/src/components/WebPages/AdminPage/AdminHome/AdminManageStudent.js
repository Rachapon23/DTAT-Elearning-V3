import React, { useEffect, useState } from "react";
import "./adminhome.css";
import { Button, Input, Select, Table, Typography, Breadcrumb, Switch } from "antd";
import { listUserRole, updateUserEnabled } from "../../../../function/Admin/adminFunction";

const { Title } = Typography;

const AdminManageStudent = () => {
  const role = "student";
  const [hasChanged, setHasChanged] = useState(false);
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

  const handleChangeEnabled = async (id, enabled) => {
    console.log(id, enabled)
    await updateUserEnabled(sessionStorage.getItem("token"), id, { enabled: !enabled })
      .then(
        (res) => {
          console.log(res)
          setHasChanged(true)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )
  }

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
    // {
    //   title: `Role`,
    //   align: "center",
    //   render: (data) => data?.role?.name,
    // },
    {
      title: `Status`,
      align: "center",
      render: (data) => {
        return <Switch checked={data?.enabled} onChange={() => handleChangeEnabled(data?._id, data?.enabled)} />
      },
    },
  ];

  const fetchUsers = async () => {
    await listUserRole(sessionStorage.getItem("token"), role)
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
    return () => {
      setHasChanged(false)
    }
  }, [hasChanged])

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
                <p>Manage Student</p>
              </Title>
            ),
            key: "managestudent",
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
  )
}

export default AdminManageStudent