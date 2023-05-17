import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { ColorPicker, useColor } from "react-color-palette";
import { useState, useEffect } from "react";
import { Modal } from "antd";

import "react-color-palette/lib/css/styles.css";
const CalendarCreate = ({setTimeAndRoom,timeAndroom}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [color, setColor] = useColor("hex", "#0288D1");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChangeColor = (e) => {
    setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,"color": e.hex
    }));
    setColor(e);
  };
  const events = [{ title: "Meeting", start: new Date() }];
  const handleSelect = (info) => {
    showModal();
    setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,
      "start": info.startStr,
      "end":info.endStr
    }));
  };

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
        events={events}
        selectable={true}
        select={handleSelect}
      />
      <Modal
        className="ant-model"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        
      >
        <h4 style={{color:"#fff",textAlign:"center",margin:"10px"}}>Theme</h4>
        <ColorPicker
          width={456}
          height={228}
          color={color}
          onChange={onChangeColor}
          hideHSV
          dark
        />
      </Modal>
    </>
  );
};

export default CalendarCreate;
