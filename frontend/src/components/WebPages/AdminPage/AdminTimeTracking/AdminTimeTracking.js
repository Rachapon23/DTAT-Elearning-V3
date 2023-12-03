import React, { useEffect, useState } from "react";
import "../AdminHome/adminhome.css";
import { Button, Input, Select, Table, Typography, Breadcrumb, Switch, Space, Tabs, Row, Col } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { listUser, listTimeusage } from "../../../../function/Admin/adminFunction";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const AdminRegisterUser = () => {
  const navigate = useNavigate();
  const [timeUsage, setTimeUsage] = useState(null);
  const [users, setUsers] = useState(null);

  const [newPlant, setNewPlant] = useState("");
  const [hasChanged, setHasChanged] = useState(false);

  const handleInputNewPlant = (e) => {
    setNewPlant(e?.target?.value)
  }

  const handleCreatePlant = async () => {

  }

  const handleRemovePlant = async (index) => {

  }

  const columns = [
    {
      title: "No",
      align: "center",
      width: "20%",
      render: (data) => users.indexOf(data) + 1,
    },
    {
      title: `Name`,
      align: "left",
      render: (data) => `${data.firstname} ${data.lastname}`,
      
    },
    {
      title: `Last Login`,
      align: "center",
      // dataIndex: "updatedAt",
      render: (data) => data.updatedAt.substring(0, 10),
    },
    {
      title: `Details`,
      align: "center",
      width: "20%",
      render: (data) => {
        const id = data?._id;
        return (
          <Button onClick={() => navigate(`/admin/page/timedetails/${id}`)}>
            <UnorderedListOutlined />
          </Button>
        )
      },
    },
  ];

  const fetchUser = async () => {
    await listUser(sessionStorage.getItem('token'))
      .then(
        (res) => {
          const data = res?.data?.data
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
    fetchUser()
    return () => {
      setHasChanged(false)
    }
  }, [hasChanged])

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <Title level={5} style={{ marginTop: "10px" }}>
        <p> Time Tracking </p>
      </Title>
   
      <Table
        columns={columns}
        dataSource={users}
        className="table-student"
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        rowKey="_id"
      />
    </Space>
  );
};

export default AdminRegisterUser;
