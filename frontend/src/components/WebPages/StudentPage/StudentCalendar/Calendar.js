import React, { createRef } from "react"
import { useState, useEffect } from "react";
import { Breadcrumb, Card, Col, Row, Typography } from "antd"
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// fucntion : GET
import { listCalendar } from "../../../../function/Student/calendar";

const { Title } = Typography

const Calendar = () => {

  const [even, setEven] = useState(null);
  const [loaded, setLoaded] = useState(false)
  const calendarRef = createRef()

  const loadCalendar = () => {
    listCalendar(sessionStorage.getItem("token"))
      .then((res) => {
        console.log(res.data)
        setEven(res.data);
        setLoaded(true)
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        // alert(err.response.data.error);
      });
  };

  const goToDate = () => {
    const calendarAPI = calendarRef?.current?.getApi()
    if (!Array.isArray(even)) return
    if (calendarAPI && even[0]?.start) calendarAPI.gotoDate(even[0].start)
  }

  useEffect(() => {
    loadCalendar();
    if (loaded) goToDate()
  }, [loaded]);


  const calendarPc = () => {
    return (
      <Card>
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

  const calendarMobile = () => {
    return (
      <Card style={{ width: 350 }}>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrap5Plugin,
          ]}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          footerToolbar={{
            right: "today"
          }}
          height={400}
          themeSystem="bootstrap5"
          events={even}
          ref={calendarRef}
        />
      </Card>
    )
  }

  const renderCalendar = () => {
    if (false) return calendarPc()
    if (true) return calendarMobile()
  }

  return renderCalendar()
}

export default Calendar;