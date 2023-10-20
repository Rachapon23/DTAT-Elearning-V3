import React, { useEffect, useState } from "react";
import "./adminhome.css";
import { Button, Input, Select, Space, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { createPlant, listPlant, removePlant } from "../../../../function/Admin/adminFunction";

const Plant = () => {
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
    await createPlant(
      sessionStorage.getItem("token"),
      { name: newPlant }
    )
      .then(
        (res) => {
          console.log(res.data.data)
          setHasChanged(true);
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )
  }

  const handleRemovePlant = async (index) => {
    await removePlant(sessionStorage.getItem("token"), plants[index]?._id)
      .then(
        (res) => {
          console.log(res.data.data)
          setHasChanged(true);
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
    await listPlant(sessionStorage.getItem("token"))
      .then(
        (res) => {
          const data = res.data.data
          console.log(data)
          setPlants(data)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )
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

      <Space.Compact
        style={{
          width: "100%",
        }}
        className="plant"
      >
        <Input
          onChange={handleInputNewPlant}
          placeholder="Add Plant"
          style={{
            width: "100%",
          }}
        />
        <Button type="primary" onClick={handleCreatePlant}>Submit</Button>
      </Space.Compact>
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

export default Plant;
