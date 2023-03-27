import React from "react"
import { useEffect, useRef } from "react"
import { PictureOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Button, Input, Form } from 'antd'; 

const { TextArea } = Input;


const CardContent = () => {

    const lastCard = useRef(null)

    const scrollToBottom = () => {
        lastCard.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [lastCard])


    return (
        <Row justify={"center"} style={{ paddingBottom: "1%" }} ref={lastCard}>
            <Col style={{ width: "100%" }}>
                <Card >
                    <Row justify={"center"} align={"middle"}>
                        <Col style={{ width: "100%" }} >
                            <Row justify={"space-between"} align={"middle"}>
                                <Col style={{ width: "95%" }}>
                                    <Form.Item label="Question" tooltip="This is a required field">
                                        <Input placeholder="input placeholder" />
                                    </Form.Item>
                                </Col>
                                <Col style={{ width: "5%", paddingTop: "0.5%", paddingLeft: "1%" }}>
                                    <Tooltip title="Add image">
                                        <Button type="text" style={{ height: "100%" }}>
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
