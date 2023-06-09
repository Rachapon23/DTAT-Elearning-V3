import React from "react"
import { Breadcrumb, Card, Col, Row, Typography } from "antd"
import CalendarShow from "../../CalendarPage/CalendarShow"

const { Title } = Typography

const Calendar = () => {
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
        <Card title={CalendarTitle()}>
            <CalendarShow />
        </Card>
    )
}

export default Calendar;