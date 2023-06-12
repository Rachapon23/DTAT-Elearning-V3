import React from "react";
import { useState, useEffect, useContext } from "react";

import { Col, Row, Form, Select } from "antd";
//course Context
import { CourseContext } from "./CourseContext";

// fucntion : GET
import { listRoom } from "../../../../../function/Teacher/room";
// function Update : PUT
import {
  updateCoursetimeAndRoom,
  updateCourseRoom,
} from "../../../../../function/Teacher/course_update";

// page Calendar
import Course_calendar from "./Course_calendar";
const Course_Room = () => {
  const { course_id,courseData,loadDataCourse,} = useContext(CourseContext);
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
    updateCourseRoom(
      sessionStorage.getItem("token"),
      {
        id: value,
      },
      course_id
    )
      .then((res) => {
        console.log(res);
        loadDataCourse()
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
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
          value: courseData?.room,
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
