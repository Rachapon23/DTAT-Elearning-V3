import React from "react";
import { useState, useEffect, useContext } from "react";

import { Col, Row, Form, Select } from "antd";
//course Context
import { CourseContext } from "./CourseContext";

// fucntion : GET
import { listRoom } from "../../../../../function/Teacher/room";
// page Calendar
import Course_calendar from "./Course_calendar";
const Course_Room = () => {
  const { timeAndroom, setTimeAndRoom } = useContext(CourseContext);
  const [roomData, setRoomData] = useState([]);

  const loadRoom = () => {
    listRoom(sessionStorage.getItem("token"))
      .then((res) => {
        setRoomData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadRoom();
  }, []);

  const handleChangeRoom = (value) => {
    setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,
      room_id: value,
    }));
  };

  const options1 = [];
  const options2 = [];
  for (let i = 0; i < roomData.length; i++) {
    if (roomData[i].floor === 1) {
      options1.push({
        value: roomData[i]._id,
        label: roomData[i].name,
      });
    } else if (roomData[i].floor === 2) {
      options2.push({
        value: roomData[i]._id,
        label: roomData[i].name,
      });
    }
  }

  return (
    <Form
      style={{ paddingTop: "2%" }}
      layout="vertical"
      fields={[
        {
          name: ["fieldRoom"],
          value: timeAndroom?.room_id,
        },
      ]}
    >
      <Row align={"middle"}>
        <Col style={{ width: "100%" }}>
          <Form.Item label="Room" name="fieldRoom" required>
            <Select
              onChange={handleChangeRoom}
              options={[
                {
                  label: "Floor 1",
                  options: options1,
                },
                {
                  label: "Floor 2",
                  options: options2,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Course_calendar />
        </Col>
      </Row>
    </Form>
  );
};

export default Course_Room;
