import React, { useEffect, useState } from "react";
import "../AdminHome/adminhome.css";
import { Button, Input, Select, Table, Typography, Breadcrumb, Switch, Space, Tabs, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { listUserRole, updateUserEnabled, updateUserRole } from "../../../../function/Admin/adminFunction";
const { Title } = Typography;
const AdminRegisterUser = () => {
  const [plants, setPlants] = useState([
    {
      _id: "",
      name: "",
    }
  ]);

  const [newPlant, setNewPlant] = useState("");
  const [hasChanged, setHasChanged] = useState(false);

  const handleInputNewPlant = (e) => {
    setNewPlant(e?.target?.value)
  }

  const handleCreatePlant = async () => {
    // await createPlant(
    //   sessionStorage.getItem("token"),
    //   { name: newPlant }
    // )
    //   .then(
    //     (res) => {
    //       console.log(res.data.data)
    //       setHasChanged(true);
    //     }
    //   )
    //   .catch(
    //     (err) => {
    //       console.log(err)
    //     }
    //   )
  }

  const handleRemovePlant = async (index) => {
    // await removePlant(sessionStorage.getItem("token"), plants[index]?._id)
    //   .then(
    //     (res) => {
    //       console.log(res.data.data)
    //       setHasChanged(true);
    //     }
    //   )
    //   .catch(
    //     (err) => {
    //       console.log(err)
    //     }
    //   )
  }

  const columns = [
    {
      title: "No",
      align: "center",
      width: "20%",
      render: (data) => plants.indexOf(data) + 1,
    },
    {
      title: `Plant`,
      align: "left",
      dataIndex: "name",
    },
    {
      title: `Delete`,
      align: "center",
      width: "20%",
      render: (data) => {
        const index = plants.indexOf(data);
        return (
          <Button onClick={() => handleRemovePlant(index)}>
            <DeleteOutlined />
          </Button>
        )
      },
    },
  ];

  const fetchPlant = async () => {
    // await listPlant()
    //   .then(
    //     (res) => {
    //       const data = res.data.data
    //       console.log(data)
    //       setPlants(data)
    //     }
    //   )
    //   .catch(
    //     (err) => {
    //       console.log(err)
    //     }
    //   )
  }

  useEffect(() => {
    fetchPlant()
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
        <p> Regiter User </p>
      </Title>
      <Row>
        <Col flex={'auto'} style={{ paddingRight: '10px'}}>
          <Input
            onChange={handleInputNewPlant}
            placeholder="Enter Employee ID"
            style={{
              width: "100%",
            }}
          />
        </Col>
        <Col flex={'auto'} style={{ paddingRight: '10px'}}>
          <Input.Password
            onChange={handleInputNewPlant}
            placeholder="Enter Password"
            type='password'
            
            style={{
              width: "100%",
            }}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleCreatePlant}>Submit</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={plants}
        className="table-student"
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </Space>
  );
};

export default AdminRegisterUser;
