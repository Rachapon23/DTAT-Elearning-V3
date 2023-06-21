import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined, BarsOutlined, AppstoreOutlined, InfoCircleOutlined, CloseOutlined, PictureOutlined, UpOutlined, DownOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Table, Segmented, Badge, Alert, Breadcrumb, Steps, Form, Radio, Image, Empty, Affix, Result } from 'antd';
// import NavBar from "../../../Layout/NavBar"
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import CardContent from "./CardContent";
import "../teach.css"

const ExamCreateFinished = ({
    setCurrentPage=null,
}) => {
    return (
        <Row align={"middle"} justify={"center"} style={{ height: "400px" }}>
            <Col >
                <Result
                    status="success"
                    title="Successfully Created Exam!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
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
