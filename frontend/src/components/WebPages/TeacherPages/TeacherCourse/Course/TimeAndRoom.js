import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Form, Select } from "antd";

// page Calendar
import CalendarCreate from "../../../CalendarPage/CalendarCreate";

// fucntion : GET
import { listRoom } from "../../../../../function/Teacher/room";
import { getCourse } from "../../../../../function/Teacher/course";

const TimeAndRoom = ({ setTimeAndRoom, timeAndroom }) => {
  const [roomData, setRoomData] = useState([]);
  const { course_id } = useParams();

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

  const [courseData, setCourseData] = useState({});
  const loadDataCourse = () => {
    getCourse(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        // console.log("tR",res);
        setCourseData(res.data.data);
        setTimeAndRoom({
          room: res.data.data.room._id,
          start: res.data.data.calendar.start,
          end: res.data.data.calendar.end,
          color: res.data.data.calendar.color,
        });
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  // for load data
  useEffect(() => {
    loadDataCourse();
  }, []);

  const handleChangeRoom = (value) => {
    setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,
      room: value,
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
          value: courseData?.room?.name,
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
          <CalendarCreate
            timeAndroom={timeAndroom}
            setTimeAndRoom={setTimeAndRoom}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default TimeAndRoom;
