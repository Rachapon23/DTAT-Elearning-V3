import React from "react";
import { useState, useEffect, useContext } from "react";

import { Modal } from "antd";
import { Col, Row, Form, Select, Button } from "antd";

//course Context
import { CourseContext } from "./CourseContext";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// fucntion : GET
import { listCalendar } from "../../../../../function/Teacher/calendar";

import "react-color-palette/lib/css/styles.css";

const Course_calendar = () => {
  const { courseData, setCourseData, timeAndroom, setTimeAndRoom } =
    useContext(CourseContext);
  const [even, setEven] = useState([]);

  const handleSelect = (info) => {
    setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,
      start: info.startStr,
      end: info.endStr,
      color: "#0288D1",
    }));
  };

  const loadCalendar = () => {
    listCalendar(sessionStorage.getItem("token"))
      .then((res) => {
        setEven(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };
  useEffect(() => {
    loadCalendar();
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrap5Plugin,
        ]}
        headerToolbar={{
          left: "prev today",
          center: "title",
          right: "next",
        }}
        height={500}
        themeSystem="bootstrap5"
        selectable={true}
        select={handleSelect}
        events={even}
      />
    </>
  );
};

export default Course_calendar;
