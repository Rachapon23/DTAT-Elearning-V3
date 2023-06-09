import React from 'react'
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const CalendarShow = () => {

  const events = [
    { title: 'Meeting', start: new Date() }
  ]

  return (
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
    />
  )
}

export default CalendarShow