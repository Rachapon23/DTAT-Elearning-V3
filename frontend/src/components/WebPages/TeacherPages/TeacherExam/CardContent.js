import React, { useState } from "react"
import { useEffect, useRef } from "react"
import { PictureOutlined, CloseOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Button, Input, Form, Radio, Upload, Image, Badge, Space } from 'antd';
import { Link, useSearchParams } from "react-router-dom";
import { createFile, getPrivateFieldImage, updateExam } from "../../../../function/Teacher/exame";

const { TextArea } = Input;


const CardContent = ({
    // uuid = null,

    index = null,
    head = null,
    data = null,
    examID = null,
    onCreate = false,
    onDelete = null,
    onChange = null,
    onAddChoice = null,
    onRemoveChoice = null,
    onChangeChoiceAnswer = null,
    onChangeChoiceQuestion = null,
    onUploadImage = null,

}) => {
    const lastCard = useRef(null)
    // const [radioSelected, setRadioSelected] = useState("");
    const [currentRadioSelected, setRadioCurentSelected] = useState(null)
    // const [imageData, setImageData] = useState(data?.image ? URL.createObjectURL(data?.image.get("file")) : null)
    const [imageData, setImageData] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageExtension, setImageExtension] = useState(null)
    const createFileField = "exam"
    const createFileParam = "file"

    // console.log(data)

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
        console.log("ans index:", data?.index)
        setRadioCurentSelected(data?.index)
        onChangeChoiceAnswer(index, { answer: data?.index })
    }

    const handleQuestionChange = (e, choice_index) => {
        onChangeChoiceQuestion(index, choice_index, e?.target?.value)
    }

    const scrollToBottom = () => {
        lastCard?.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleCardChange = (e) => {
        // setInputContentData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
        onChange(index, { question: e?.target?.value })
    }

    const handleAddChoice = () => {
        onAddChoice(index)
    }

    const handleRemoveChoice = (choice_index) => {
        onRemoveChoice(index, choice_index)
        setRadioCurentSelected(data?.answer)
    }

    // console.log()

    const handleAddImage = async (image) => {
        let formData = new FormData()
        formData.append("file", image?.file)
        formData.append("original_name", image?.file?.name)

        // onChange(index, { image: formData })

        // create image for preview before upload to server
        const objectUrl = URL.createObjectURL(image?.file)
        setSelectedImage(objectUrl)

        let imageData = null
        await createFile(sessionStorage.getItem("token"), formData, createFileField)
            .then(
                (res) => {
                    const data = res.data.data
                    imageData = data
                    onUploadImage(index, data)

                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )

        const examData = {
            head: head,
            body: {
                // question: data?.question,
                // answer: data?.answer,
                image: imageData,
                // choices: data?.choice,
            }
        }
        await updateExam(sessionStorage.getItem("token"), examID, examData)
            .then(
                (res) => {
                    console.log(res)

                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const handleRemoveSelectedImage = () => {
        onChange(index, { image: null })
        setSelectedImage(null)
    }

    const handleFetchImage = async () => {

        const image_name = data?.image?.name
        if (!image_name) return
        const split_image_name = data?.image?.name.split(".")
        const split_image_name_lenght = split_image_name.length
        const image_extension = split_image_name[split_image_name_lenght - 1]

        setImageExtension(image_extension)

        let response
        await getPrivateFieldImage(sessionStorage.getItem("token"), createFileField, createFileParam, image_name)
            .then(
                (res) => {
                    response = res
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )

        const objectUrl = URL.createObjectURL(response.data);
        setImageData(objectUrl)
    }

    useEffect(() => {
        if (onCreate) {
            scrollToBottom()
        }
        if (!imageData) {
            handleFetchImage()
        }
    }, [lastCard, onUploadImage])

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
                                            defaultValue={data?.question}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col style={{ width: "5%", paddingLeft: "1%" }}>
                                    <Form >
                                        <Form.Item>
                                            <Tooltip title={imageExtension ? "Change image" : "Add image"} placement="bottom">
                                                <Upload
                                                    accept="image/*"
                                                    showUploadList={false}
                                                    customRequest={handleAddImage}
                                                >
                                                    <Button type="text" style={{ height: "100%" }}>
                                                        <PictureOutlined style={{ fontSize: "25px", display: "flex", justifyContent: "center" }} />
                                                    </Button>
                                                </Upload>
                                            </Tooltip>
                                        </Form.Item>
                                    </Form>
                                </Col>

                            </Row>
                            {
                                selectedImage ? // imageExtension || || imageData || data?.image
                                    (
                                        <Row justify={"center"} align={"middle"}>
                                            <Col flex={"auto"}>
                                                <Form.Item label="Image" >
                                                    <Row justify={"center"} align={"middle"}>
                                                        <Col>
                                                            {
                                                                data?.image && (
                                                                    <Badge
                                                                        count={
                                                                            <Row justify={"center"} align={"middle"}>
                                                                                <DeleteOutlined
                                                                                    onClick={handleRemoveSelectedImage}
                                                                                    style={{
                                                                                        fontSize: "120%",
                                                                                        color: "white",
                                                                                        backgroundColor: "#f5222d",
                                                                                        borderRadius: "50%",
                                                                                        padding: "20%"
                                                                                    }}
                                                                                />
                                                                            </Row>
                                                                        }
                                                                    >
                                                                        <Image
                                                                            height={250}
                                                                            // src={imageData}
                                                                            src={selectedImage}
                                                                        // src={data?.image ? URL.createObjectURL(data?.image.get("file")) : null}
                                                                        />
                                                                    </Badge>
                                                                )
                                                            }
                                                        </Col>

                                                    </Row>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    )
                                    :
                                    (
                                        null
                                    )
                            }
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
                                                                    checked={data?.answer === choice_index}
                                                                    onChange={(e) => handleRadioChange({ checked: e?.target?.checked, index: choice_index })}
                                                                />
                                                            </Col>
                                                            <Col style={{ width: "95%" }}>
                                                                <Input
                                                                    key={choice_index}
                                                                    id="choice"
                                                                    placeholder="choice"
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    onChange={(e) => handleQuestionChange(e, choice_index)}
                                                                    defaultValue={item}
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
                </Card >
            </Col >
        </Row >
    )
}

export default CardContent;
