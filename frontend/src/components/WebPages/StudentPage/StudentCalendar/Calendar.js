import React, { createRef } from "react"
import { useState, useEffect } from "react";
import { Breadcrumb, Button, Card, Col, Modal, Row, Typography } from "antd"
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import moment from "moment";
import "moment/locale/th";


// fucntion : GET
import { listCalendar } from "../../../../function/Student/calendar";
import { useMediaQuery } from "react-responsive";

const { Title, Text } = Typography
moment.locale("th");

const Calendar = () => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const isIpad = useMediaQuery({ query: '(min-width: 768px)' })

  const [even, setEven] = useState(null);
  const [loaded, setLoaded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const calendarRef = createRef()

  const handleModalOk = () => {
    setIsModalOpen(false)
  }

  const handleModalCancel = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    if (modalData) setIsModalOpen(true)
  }

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

  const handleClickCalendar = (e) => {
    if (!e) return
    setModalData(() => ({
      title: e.event.title,
      start: moment(e.event.start).format("LL"),
      end: moment(e.event.end).format("LL"),
    }))
    handleOpenModal()
  }

  useEffect(() => {
    loadCalendar();
    if (loaded) goToDate()
  }, [loaded, modalData]);

  const renderModal = () => {
    return (
      <Modal title="Info" open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} footer={false}>
        <Row>
          <Col>
            <Row>
              <Text strong>Course name</Text>
            </Row>
            <Row>
              {modalData?.title}
            </Row>
          </Col>
        </Row>

        <Row style={{ paddingTop: 10 }}>
          <Col>
            <Row>
              <Text strong>Start </Text>
            </Row>
            <Row>
              {modalData?.start}
            </Row>
          </Col>
        </Row>

        <Row style={{ paddingTop: 10 }}>
          <Col>
            <Row>
              <Text strong>End </Text>
            </Row>
            <Row>
              {modalData?.end}
            </Row>
          </Col>
        </Row>
      </Modal>
    )
  }

  const calendarPc = () => {
    return (
      <Card>
        {renderModal()}
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
          eventClick={handleClickCalendar}
        />
      </Card>
    )
  }

  const calendarMobile = () => {
    let width = 350
    let height = 400
    if (isIpad) {
      width = 600
      height = 500
    }
    return (
      <Card style={{ width: width }}>
        {renderModal()}
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
          height={height}
          themeSystem="bootstrap5"
          events={even}
          ref={calendarRef}
          eventClick={handleClickCalendar}
        />
      </Card>
    )
  }

  const renderCalendar = () => {
    if (isDesktopOrLaptop) return calendarPc()
    if (isTabletOrMobile) return calendarMobile()
  }

  return renderCalendar()
}

export default Calendar;