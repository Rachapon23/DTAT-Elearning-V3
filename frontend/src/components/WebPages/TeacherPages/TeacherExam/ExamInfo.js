import React, { useState } from "react";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Input, Typography, Table, Form, Radio, } from 'antd';
import "../teach.css"

const { Text } = Typography;
const { TextArea } = Input;


const ExamInfo = ({
    actionMode = null,
    inputInfoData = null,
    cousreWithOutQuiz = null,
    onSetInputInfoData = null,
}) => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    const createMode = actionMode === "Create"
    const editMode = actionMode === "Edit"
    const previewMode = actionMode === "Preview"

    // const enableExamOptions = [
    //     {
    //         label: "Close",
    //         value: false
    //     },
    //     {
    //         label: "Open",
    //         value: true
    //     },
    // ]


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
        if (e?.target?.name) {
            onSetInputInfoData((inputInfoData) => ({ ...inputInfoData, [e.target.name]: e.target.value }))
        }
        else {
            onSetInputInfoData((inputInfoData) => ({ ...inputInfoData, [e.target.id]: e.target.value }))
        }
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
                        createMode ?
                            (
                                <Form.Item label="Selected Course" required tooltip="This is a required field">
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
                                </Form.Item>
                            ) : (null)
                    }

                    <Form.Item
                        label={<Text strong> Exam Name </Text>}
                        required
                        tooltip={editMode ? "This is a required field" : null}
                    >
                        {
                            editMode || createMode ?
                                (
                                    <Input
                                        placeholder="Exam name"
                                        id="name"
                                        onChange={handleInputInfoData}
                                        value={inputInfoData?.name}
                                    />
                                )
                                :
                                (
                                    previewMode ? (<> {inputInfoData?.name} </>) : (null)
                                )
                        }
                    </Form.Item>

                    {/* <Form.Item
                        label={<Text strong> Status </Text>}
                        required
                        tooltip={editMode ? <Row><Col><Row>Open: student can access exam</Row><Row> Close: student can not access exam</Row></Col></Row> : null}
                    >
                        {
                            editMode || createMode ?
                                (
                                    <Radio.Group
                                        name="enable"
                                        options={enableExamOptions}
                                        onChange={handleInputInfoData}
                                        value={inputInfoData?.enable}
                                        optionType="button"
                                        buttonStyle="solid"
                                    />
                                )
                                :
                                (
                                    null
                                )
                        }
                    </Form.Item> */}

                    <Form.Item
                        label={<Text strong> Detail </Text>}
                        required={previewMode}
                        tooltip={editMode ? {
                            title: 'Tooltip with customize icon',
                            icon: <InfoCircleOutlined />,
                        } : null}
                    >
                        {
                            editMode || createMode ?
                                (
                                    <TextArea
                                        showCount
                                        maxLength={250}
                                        style={{ height: 120 }}
                                        id="detail"
                                        onChange={handleInputInfoData}
                                        placeholder="Detail"
                                        value={inputInfoData?.detail}
                                    />
                                )
                                :
                                (
                                    previewMode ? (<> {inputInfoData?.detail} </>) : (null)
                                )
                        }
                    </Form.Item>

                </Col>
            </Row>

        </Form>
    )
}
export default ExamInfo;