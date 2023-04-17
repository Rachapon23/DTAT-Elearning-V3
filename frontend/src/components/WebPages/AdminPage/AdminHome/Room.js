import React, { useEffect, useState } from "react";
import "./adminhome.css";
import { Button, Input, Select, Space, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { createRoom, listRoom, removeRoom } from "../../../../function/Admin/adminFunction";
const { Column, ColumnGroup } = Table;
const Room = () => {
  const [rooms, setRooms] = useState([
    {
      _id: "",
      name: "",
      floor: null,
    }
  ]);

  const [newRoom, setNewRoom] = useState({
    name: "",
    floor: null,
  });
  const [hasChanged, setHasChanged] = useState(false);

  const handleInputNewRoom = (e) => {
    console.log(e.target.id)
    setNewRoom({...newRoom, [e?.target?.id]: e?.target?.value})
  }

  const handleCreateRoom = async () => {
    console.log(newRoom)
    await createRoom(
      sessionStorage.getItem("token"),
      newRoom
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

  const handleRemoveRoom = async (index) => {
    await removeRoom(sessionStorage.getItem("token"), rooms[index]?._id)
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
      render: (data) => rooms.indexOf(data) + 1,
    },
    {
      title: `Room`,
      align: "left",
      dataIndex: "name",
    },
    {
      title: `Floor`,
      align: "center",
      dataIndex: "floor",
    },
    {
      title: `Delete`,
      align: "center",
      width: "20%",
      render: (data) => {
        const index = rooms.indexOf(data);
        return (
          <Button onClick={() => handleRemoveRoom(index)}>
            <DeleteOutlined />
          </Button>
        )
      },
    },
  ];

  const fetchRoom = async () => {
    await listRoom(sessionStorage.getItem("token"))
      .then(
        (res) => {
          const data = res.data.data
          console.log(data)
          setRooms(data)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )
  }

  useEffect(() => {
    fetchRoom()
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
          id="name"
          onChange={handleInputNewRoom}
          value={newRoom.name}
          placeholder="Add Room name"
          style={{
            width: "70%",
          }}
        />

        <Input
          id="floor"
          onChange={handleInputNewRoom}
          value={newRoom.floor}
          placeholder="Add Room floor"
          type="number"
          min={1}
          max={2}
          style={{
            width: "30%",
          }}
        />
        <Button type="primary" onClick={handleCreateRoom}>Submit</Button>
      </Space.Compact>
      <Table
        columns={columns}
        dataSource={rooms}
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

export default Room