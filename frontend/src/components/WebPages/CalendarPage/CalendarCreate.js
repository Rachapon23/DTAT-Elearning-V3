import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { ColorPicker, useColor } from "react-color-palette";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import { Col, Row, Form, Select, Button } from "antd";
import "react-color-palette/lib/css/styles.css";

// fucntion : GET
import { listCalendar } from "../../../function/Teacher/calendar";

const CalendarCreate = ({ setTimeAndRoom, timeAndroom }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [even, setEven] = useState([]);

  const [color, setColor] = useColor("hex", "#0288D1");

  const [dataShow, setDataShow] = useState({
    start: "",
    end: "",
    color: "",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if(dataShow.color === ""){
      setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,
      color: "#0288D1",
    }));
    setDataShow({
      ...dataShow,
      color: "#0288D1",
    });
    setColor("hex", "#0288D1");
    }
    
    setIsModalOpen(false);

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loadCalendar = () => {
    listCalendar(sessionStorage.getItem("token"))
      .then((res) => {
        setEven(res.data);
        // console.log(res.data)
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
  const onChangeColor = (e) => {
    setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,
      color: e.hex,
    }));
    setDataShow({
      ...dataShow,
      color: e.hex,
    });
    setColor(e);
  };

  const clearTimeAndRoom = () => {
    setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,
      start: "",
      end: "",
      color: "",
    }));
  };

  const handleSelect = (info) => {
    showModal();
    setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,
      start: info.startStr,
      end: info.endStr,
    }));
    setDataShow({
      ...dataShow,
      start: info.startStr,
      end: info.endStr,
    });
    setShow(true);
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
        selectable={true}
        select={handleSelect}
        events={even}
      />
      {dataShow.color === "" ? (
        <></>
      ) : (
        <Row
          style={{
            borderRadius: "5px",
            backgroundColor: dataShow.color,
            color: "#fff",
            textAlign: "center",
          }}
          align={"middle"}
        >
          <Col span={8}>
            <p
              style={{
                marginTop: "7px",
              }}
            >
              start : {dataShow.start}
            </p>
          </Col>
          <Col span={8}>
            <p
              style={{
                marginTop: "7px",
              }}
            >
              end : {dataShow.end}
            </p>
          </Col>
          <Col span={8}>
            <Button
              onClick={() => {
                clearTimeAndRoom();
                setDataShow({
                  start: "",
                  end: "",
                  color: "",
                });
                setShow(false);
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      )}

      <Modal
        className="ant-model"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h4 style={{ color: "#fff", textAlign: "center", margin: "10px" }}>
          Theme
        </h4>
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
