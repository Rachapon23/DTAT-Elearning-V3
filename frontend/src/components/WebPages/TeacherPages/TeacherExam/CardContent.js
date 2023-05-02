import React, { useState } from "react"
import { useEffect, useRef } from "react"
import { PictureOutlined, CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Button, Input, Form, Radio, Upload, Image } from 'antd';
import { Link, useSearchParams } from "react-router-dom";

const { TextArea } = Input;


const CardContent = ({
    // uuid = null,
    index = null,
    data = null,
    onCreate = false,
    onDelete = null,
    onChange = null,
    onAddChoice = null,
    onRemoveChoice = null,
    onChangeChoiceAnswer = null,
    onChangeChoiceQuestion = null

}) => {
    const lastCard = useRef(null)
    // const [radioSelected, setRadioSelected] = useState("");
    const [currentRadioSelected, setRadioCurentSelected] = useState(null)

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

    const handleRadioChange = (data) => {
        setRadioCurentSelected(data?.index)
        onChangeChoiceAnswer(index, data?.index)
    }

    const handleQuestionChange = (e, choice_index) => {
        onChangeChoiceQuestion(index, choice_index, e?.target?.value)
    }

    const scrollToBottom = () => {
        lastCard?.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleCardChange = (e) => {
        // setInputContentData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
        onChange(index, e?.target?.value)
    }

    const handleAddChoice = () => {
        onAddChoice(index)
    }

    const handleRemoveChoice = (choice_index) => {
        onRemoveChoice(index, choice_index)
        setRadioCurentSelected(null)
    }

    useEffect(() => {
        if (onCreate) {
            scrollToBottom()
        }
    }, [lastCard])

    return (
        <Row justify={"center"} style={{ paddingBottom: "1%" }} ref={lastCard}
        // onMouseEnter={() => console.log("Hit")}
        >
            <Col style={{ width: "100%" }}>
                <Card >
                    {/* {JSON.stringify(data.choices)} */}
                    <Row justify={"center"} align={"middle"}>
                        <Col style={{ width: "100%" }} >
                            <Row style={{ marginTop: "-0.5%", marginBottom: "-0.2%", marginRight: "-0.5%" }} justify={"end"} align={"middle"}>
                                <Link onClick={() => onDelete(index)}>
                                    <CloseOutlined style={{ fontSize: "120%" }} />
                                </Link>
                            </Row>
                            <Row justify={"space-between"} align={"middle"}>
                                <Col style={{ width: "95%" }}>
                                    <Form.Item label={`Question ${index + 1}`} tooltip="This is a required field">
                                        <Input
                                            id="question"
                                            placeholder="input placeholder"
                                            onChange={handleCardChange}
                                            defaultValue={data?.name}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col style={{ width: "5%", paddingTop: "0.5%", paddingLeft: "1%" }}>
                                    <Tooltip title="Add image" placement="bottom">
                                        <Upload showUploadList={true}>
                                            <Button onClick={() => console.log(data)} type="text" style={{ height: "100%" }}>
                                                <PictureOutlined style={{ fontSize: "25px", display: "flex", justifyContent: "center" }} />
                                            </Button>
                                        </Upload>
                                    </Tooltip>
                                </Col>

                            </Row>
                            <Row>
                                <Col flex={"auto"}>
                                    <Form.Item label="Image">
                                        <Row justify={"center"} align={"middle"}>
                                            <Image
                                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                                height={"250px"}
                                                width={"250px"}
                                                preview={false}
                                            />
                                        </Row>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={"center"} align={"middle"}>
                                <Col style={{ width: "100%" }}>
                                    {data?.choices.map((item, choice_index) => (
                                        <Form.Item
                                            {...(choice_index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={choice_index === 0 ? 'Choices' : ''}
                                            required={false}
                                            key={choice_index}
                                        >

                                            <Row justify={"center"} align={"middle"}>
                                                <Col style={{ width: "95%" }}>
                                                    <Form.Item
                                                        {...item}
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
                                                        <Row justify={"center"} align={"middle"}>
                                                            <Col style={{ width: "5%", display: "flex", justifyContent: "center" }}>
                                                                <Radio
                                                                    checked={currentRadioSelected === choice_index}
                                                                    onChange={(e) => handleRadioChange({ checked: e?.target?.checked, index: choice_index })}
                                                                />
                                                            </Col>
                                                            <Col style={{ width: "95%" }}>
                                                                <Input
                                                                    key={choice_index}
                                                                    id="question"
                                                                    placeholder="passenger name"
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    onChange={(e) => handleQuestionChange(e, choice_index)}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col style={{ width: "5%", display: "flex", justifyContent: "center", paddingLeft: "0.7%" }}>
                                                    {data?.choices.length > 0 ? (
                                                        <MinusCircleOutlined
                                                            key={choice_index}
                                                            style={{ fontSize: "130%" }}
                                                            className="dynamic-delete-button"
                                                            onClick={() => handleRemoveChoice(choice_index)}
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
