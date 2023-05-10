import React, { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined, BarsOutlined, AppstoreOutlined, InfoCircleOutlined, CloseOutlined, PictureOutlined, UpOutlined, DownOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Table, Segmented, Badge, Alert, Breadcrumb, Steps, Form, Radio, Image, Empty, Affix, Result } from 'antd';
import NavBar from "../../../Layout/NavBar"
import CardContent from "./CardContent";
import "../teach.css"
import { createExam, getCourseWoQuiz, getExam, updateExam } from "../../../../function/Teacher/exame";

const { Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;


const ExamInfo = ({
    actionMode = null,
    inputInfoData = null,
    currentSelectedRadio = null,
    cousreWithOutQuiz = null,
    onSetInputInfoData = null,
}) => {

    console.log("course:", cousreWithOutQuiz)
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const coursesCol = [
        {
            title: "Image",
            dataIndex: 'image',
            key: 'image',
            align: "center",
            width: "15%",
        },
        {
            title: "Course",
            dataIndex: 'name',
            key: 'name',
            width: "50%",
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            align: "center",
            render: (type) => type === true ? "Public" : "Private",
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (status) => status === true ? "Disable" : "Eanble",
        },
        {
            title: "Select",
            align: "center",
            width: "10%",
            render: () => {
                return <Radio checked />
            }
        },
    ]

    const handleInputInfoData = (e) => {
        onSetInputInfoData((inputInfoData) => ({ ...inputInfoData, [e.target.id]: e.target.value }))
    }



    return (
        <Form
            style={{ paddingTop: "2%" }}
            form={form}
            layout="vertical"
            initialValues={{
                requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
        >
            <Row >
                <Col style={{ width: "100%" }}>
                    {
                        actionMode === "Create" ?
                            (
                                <Form.Item label="Selected Course" required tooltip="This is a required field">
                                    {/* <Card> */}
                                    <Row align={"middle"} justify={"space-between"}>
                                        <Col style={{ width: "100%", height: "160px" }}>
                                            {
                                                <Table
                                                    dataSource={
                                                        [cousreWithOutQuiz]
                                                    }
                                                    columns={coursesCol}
                                                    pagination={false}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                    {/* </Card> */}
                                </Form.Item>
                            ) : (null)
                    }

                    <Form.Item label="Exam Name" required tooltip="This is a required field">
                        <Input
                            placeholder="Exam name"
                            id="name"
                            onChange={handleInputInfoData}
                            value={inputInfoData?.name}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Detail"
                        tooltip={{
                            title: 'Tooltip with customize icon',
                            icon: <InfoCircleOutlined />,
                        }}
                    >
                        <TextArea
                            showCount
                            maxLength={250}
                            style={{ height: 120 }}
                            id="detail"
                            onChange={handleInputInfoData}
                            placeholder="Detail"
                            value={inputInfoData?.detail}
                        />
                    </Form.Item>

                </Col>
            </Row>

        </Form>
    )
}
export default ExamInfo;