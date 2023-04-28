import React, { useState } from "react"
import { useEffect, useRef } from "react"
import { PictureOutlined, CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Button, Input, Form } from 'antd';
import { Link, useSearchParams } from "react-router-dom";

const { TextArea } = Input;


const CardContent = ({ uuid = null, index = null, onDelete = null, data = null, onChange = null, onAddChoice = null, onRemoveChoice }) => {
    const lastCard = useRef(null)

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 4,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                // span: 20,
            },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {
                // span: 24,
                // offset: 0,
            },
            sm: {
                // span: 20,
                // offset: 4,
            },
        },
    };

    // console.log(Object.keys(data), data?.choices)

    const scrollToBottom = () => {
        lastCard?.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleCardChange = (e) => {
        // setInputContentData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
        onChange(uuid, { ...data, [e?.target?.id]: e?.target?.value })
    }

    const handleAddChoice = () => {
        onAddChoice(uuid)
    }

    const handleRemoveChoice = (choice_uuid) => {
        onRemoveChoice(uuid, choice_uuid)
    }

    useEffect(() => {
        scrollToBottom()
    }, [lastCard])

    return (
        <Row justify={"center"} style={{ paddingBottom: "1%" }} ref={lastCard}
        // onMouseEnter={() => console.log("Hit")}
        >
            <Col style={{ width: "100%" }}>
                <Card >
                    {/* {JSON.stringify(data)}
                    {JSON.stringify(data.name)} */}
                    <Row justify={"center"} align={"middle"}>
                        <Col style={{ width: "100%" }} >
                            <Row style={{ marginTop: "-0.5%", marginBottom: "-0.2%", marginRight: "-0.5%" }} justify={"end"} align={"middle"}>
                                <Link onClick={() => onDelete(uuid)}>
                                    <CloseOutlined style={{ fontSize: "120%" }} />
                                </Link>
                            </Row>
                            <Row justify={"space-between"} align={"middle"}>
                                <Col style={{ width: "95%" }}>
                                    <Form.Item label={`Question ${index + 1}`} tooltip="This is a required field">
                                        <Input
                                            id="name"
                                            placeholder="input placeholder"
                                            onChange={handleCardChange}
                                            defaultValue={data?.name}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col style={{ width: "5%", paddingTop: "0.5%", paddingLeft: "1%" }}>
                                    <Tooltip title="Add image" placement="bottom">
                                        <Button onClick={() => console.log(data)} type="text" style={{ height: "100%" }}>
                                            <PictureOutlined style={{ fontSize: "25px", display: "flex", justifyContent: "center" }} />
                                        </Button>
                                    </Tooltip>
                                </Col>

                            </Row>
                            {/* <Row>
                                <Col flex={"auto"}>
                                    <Form.Item label="Detail">
                                        <TextArea
                                            id="detail"
                                            showCount
                                            maxLength={250}
                                            style={{ height: 120 }}
                                            placeholder="can resize"
                                            onChange={handleCardChange}
                                            defaultValue={data?.detail}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row> */}
                            <Row justify={"center"} align={"middle"}>
                                <Col style={{ width: "100%" }}>
                                    {Object.keys(data?.choices).map((choice, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Choices' : ''}
                                            required={false}
                                            key={choice}
                                        >

                                            <Row justify={"center"} align={"middle"}>
                                                <Col style={{ width: "95%" }}>
                                                    <Form.Item
                                                        {...choice}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "Please input passenger's name or delete this field.",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        {choice}
                                                        <Input
                                                            key={choice}
                                                            placeholder="passenger name"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col style={{ width: "5%", display: "flex", justifyContent: "center", paddingLeft: "0.7%" }}>
                                                    {Object.keys(data?.choices).length > 0 ? (
                                                        <MinusCircleOutlined
                                                            key={choice}
                                                            style={{ fontSize: "130%" }}
                                                            className="dynamic-delete-button"
                                                            onClick={() => handleRemoveChoice(choice)}
                                                        />
                                                    ) : null}
                                                </Col>
                                            </Row>

                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={handleAddChoice}
                                            style={{
                                                width: '100%',
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add choice
                                        </Button>
                                        {/* <Form.ErrorList errors={errors} /> */}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{ width: "10%", display: "flex", justifyContent: "center" }}>



                        </Col>
                    </Row>
                    {/* {renderCardExtarField()} */}
                </Card>
            </Col>
        </Row>
    )
}

export default CardContent;
