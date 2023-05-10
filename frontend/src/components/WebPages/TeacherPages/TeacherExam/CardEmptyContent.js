import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined, BarsOutlined, AppstoreOutlined, InfoCircleOutlined, CloseOutlined, PictureOutlined, UpOutlined, DownOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Table, Segmented, Badge, Alert, Breadcrumb, Steps, Form, Radio, Image, Empty, Affix, Result } from 'antd';
import NavBar from "../../../Layout/NavBar"
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import CardContent from "./CardContent";
import "../teach.css"
import { createExam, getCourseWoQuiz, getExam, updateExam } from "../../../../function/Teacher/exame";

const CardEmptyContent = ({
    inputContentTemplate=null,
    onInputContentData=null,

}) => {

    const handleCreateContent = () => {
        onInputContentData((prev) => [...prev, inputContentTemplate])
        // console.log(inputContentData)
        // setHasChanged(true)
        // setCreatedCard(true)
    }

    return (
        <Card>
            <Row justify={"center"}>
                <Col>
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        // style={{height: "100%"}}
                        description={
                            <span>
                                No Content
                            </span>
                        }
                    >
                        <Button type="primary" onClick={handleCreateContent}>Create Now</Button>
                    </Empty>
                </Col>
            </Row>
        </Card >
    )
}
export default CardEmptyContent;