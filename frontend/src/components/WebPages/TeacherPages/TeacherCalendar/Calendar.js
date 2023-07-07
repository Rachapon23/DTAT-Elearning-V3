import React, { createRef } from "react"
import { useState, useEffect } from "react";
import { Breadcrumb, Card, Col, Row, Typography } from "antd"
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// fucntion : GET
import { listCalendar } from "../../../../function/Teacher/calendar";

const { Title } = Typography

const Calendar = () => {

  const [even, setEven] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const calendarRef = createRef()

  const loadCalendar = () => {
    listCalendar(sessionStorage.getItem("token"))
      .then((res) => {
        setEven(res.data);
        setLoaded(true)
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const goToDate = () => {
    const calendarAPI = calendarRef?.current?.getApi()
    if(!Array.isArray(even)) return
    if (calendarAPI && even[0]?.start) calendarAPI.gotoDate(even[0].start)
}

  useEffect(() => {
    loadCalendar();
    if(loaded) goToDate()
  }, [loaded]);
  const CalendarTitle = () => {
    return (
      <Row align={"middle"} justify={"space-between"} >
        <Col>
          <Breadcrumb
            separator={<Title level={5} style={{ marginTop: "10px" }}> {">"} </Title>}
            items={[
              {
                title: <Title level={5} style={{ marginTop: "10px" }}><p >Calendar</p></Title>,
                key: "calendar"
              },
              // {
              //     title: <Title level={5} style={{ marginTop: "10px" }}><p>{course?.name}</p></Title>,
              //     key: "courses_create",
              // },
            ]}
          />
        </Col>
        {/* <Col style={{ paddingTop: "1px", paddingBottom: "1px", }}>
                    <Row>
                        <Button onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </Row>
                </Col> */}
      </Row >
    )
  }
  return (
    <Card title={CalendarTitle()} className="card-shadow">
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
        events={even}
        ref={calendarRef}
      />
    </Card>
  )
}

export default Calendar;