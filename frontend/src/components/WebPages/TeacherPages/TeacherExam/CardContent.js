import React, { useState } from "react"
import { useEffect, useRef } from "react"
import { PictureOutlined, CloseOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Button, Input, Form } from 'antd';
import { Link, useSearchParams } from "react-router-dom";

const { TextArea } = Input;


const CardContent = ({ uuid = null, index = null, onDelete = null, data = null, onChange = null }) => {
    const lastCard = useRef(null)

    const [inputContentData, setInputContentData] = useState({
        name: data[uuid]?.name,
    })


    const scrollToBottom = () => {
        lastCard.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleCardChange = (e) => {
        // setInputContentData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
        onChange(uuid, { ...data, [e.target.id]: e.target.value })
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
                    {JSON.stringify(data)}
                    {JSON.stringify(data.name)}
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
                                        <Button onClick={() => console.log(inputContentData)} type="text" style={{ height: "100%" }}>
                                            <PictureOutlined style={{ fontSize: "25px", display: "flex", justifyContent: "center" }} />
                                        </Button>
                                    </Tooltip>
                                </Col>

                            </Row>
                            <Row>
                                <Col flex={"auto"}>
                                    <Form.Item label="Detail">
                                        <TextArea
                                            showCount
                                            maxLength={250}
                                            style={{ height: 120 }}
                                            placeholder="can resize"
                                        />
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
