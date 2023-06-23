import React from "react";
import { Col, Row, Button, Result } from 'antd';
import "../teach.css"
import { Link } from "react-router-dom";

const ExamCreateFinished = ({
    setCurrentPage = null,
}) => {
    return (
        <Row align={"middle"} justify={"center"} style={{ height: "400px" }}>
            <Col >
                <Result
                    status="success"
                    title="Successfully Created Exam!"
                    // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Link to="/teacher/page/list-exam">
                            <Button type="primary" key="console" onClick={() => setCurrentPage(0)}>
                                Back To List Exam
                            </Button>
                        </Link>,
                        // <Button key="buy">Buy Again</Button>,
                    ]}
                />
            </Col>
        </Row>
    )
}
export default ExamCreateFinished;
