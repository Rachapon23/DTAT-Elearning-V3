import React, { useCallback, useState } from "react"
import { useEffect, useRef } from "react"
import { PictureOutlined, CloseOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Button, Input, Form, Radio, Upload, Image, Badge, Space, Typography } from 'antd';
import { Link } from "react-router-dom";
import { createFile, getPrivateFieldImage, updateExam } from "../../function/Teacher/exam";

const { Text } = Typography

const CardContent = ({
    // uuid = null,

    index = null,
    actionMode = null,
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
    const [addedImage, setAddedImage] = useState(null)

    const [managementMode, setManagementMode] = useState(actionMode)
    const createMode = actionMode && actionMode === "Create"
    const editMode = actionMode && actionMode === "Edit"
    const previewMode = actionMode && actionMode === "Preview"

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
        // console.log("ans index:", data?.index)
        // console.log(actionMode)
        setRadioCurentSelected(data?.index)
        if (previewMode) {
            console.log("you select: ", data?.quiz_id)
            onChangeChoiceAnswer(data?.quiz_id, index, { answer: data?.index })
        }

        if (editMode || createMode) {
            onChangeChoiceAnswer(data?.quiz_id, index, { answer: data?.index })
        }


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
                    setAddedImage(true)
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

    const handleFetchImage = useCallback(async () => {

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
        console.log(objectUrl)
        setImageData(objectUrl)

    }, [data?.image?.name])

    useEffect(() => {
        if (onCreate) {
            scrollToBottom()
        }
        if (!imageData) {
            handleFetchImage()
        }
        return () => {
            setAddedImage(false)
        }
    }, [handleFetchImage, imageData, lastCard, onCreate, onUploadImage])

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
                                {
                                    editMode || createMode ?
                                        (
                                            <Link onClick={() => onDelete(index)}>
                                                <CloseOutlined style={{ fontSize: "120%" }} />
                                            </Link>
                                        ) : (null)
                                }
                            </Row>
                            <Row justify={"space-between"} align={"middle"}>

                                <Col style={{ width: "95%" }}>
                                    <Form.Item
                                        label={<Text strong>{`Question ${index + 1}`}</Text>}
                                        required={previewMode}
                                        tooltip={editMode || createMode ? "This is a required field" : null}
                                    >
                                        {
                                            editMode || createMode ?
                                                (
                                                    <Input
                                                        id="question"
                                                        placeholder="Question"
                                                        onChange={handleCardChange}
                                                        defaultValue={data?.question}
                                                    />
                                                ) : (<>{data?.question}</>)
                                        }

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
                                                    {
                                                        editMode || createMode ?
                                                            (
                                                                <Button type="text" style={{ height: "100%" }}>
                                                                    <PictureOutlined style={{ fontSize: "25px", display: "flex", justifyContent: "center" }} />
                                                                </Button>
                                                            ) : (null)
                                                    }

                                                </Upload>
                                            </Tooltip>
                                        </Form.Item>
                                    </Form>
                                </Col>

                            </Row>
                            {
                                selectedImage || imageData ? // imageExtension || || imageData || data?.image
                                    (
                                        <Row justify={"center"} align={"middle"}>
                                            <Col flex={"auto"}>
                                                <Form.Item
                                                    label={editMode || createMode ? "Image" : null}
                                                >
                                                    <Row justify={"center"} align={"middle"}>
                                                        <Col>
                                                            {
                                                                data?.image && (
                                                                    editMode || createMode ?
                                                                        (
                                                                            < Badge
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
                                                                                    src={imageData}
                                                                                // src={data?.image ? URL.createObjectURL(data?.image.get("file")) : null}
                                                                                />
                                                                            </Badge>
                                                                        )
                                                                        :
                                                                        (
                                                                            <Image
                                                                                height={250}
                                                                                src={imageData}
                                                                            />
                                                                        )

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
                                    {data?.choices?.map((item, choice_index) => (
                                        <Form.Item
                                            {...(choice_index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={choice_index === 0 ? 'Choices' : ''}
                                            required={previewMode}
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
                                                                    checked={editMode || createMode || previewMode ? data?.answer === choice_index : null}
                                                                    onChange={
                                                                        editMode || createMode || previewMode ?
                                                                            (e) => handleRadioChange({ checked: e?.target?.checked, index: choice_index, quiz_id: data?._id }) : null
                                                                    }
                                                                />
                                                            </Col>
                                                            <Col style={{ width: "95%" }}>
                                                                {
                                                                    editMode || createMode ?
                                                                        (
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
                                                                        ) : (<>{item}</>)
                                                                }

                                                            </Col>
                                                        </Row>
                                                    </Form.Item>
                                                </Col>
                                                <Col style={{ width: "5%", display: "flex", justifyContent: "center", paddingLeft: "0.7%" }}>
                                                    {
                                                        (editMode || createMode) && data?.choices.length > 0 ?
                                                            (
                                                                <MinusCircleOutlined
                                                                    key={choice_index}
                                                                    style={{ fontSize: "130%" }}
                                                                    className="dynamic-delete-button"
                                                                    onClick={() => handleRemoveChoice(choice_index)}
                                                                />
                                                            ) : null
                                                    }
                                                </Col>
                                            </Row>

                                        </Form.Item>
                                    ))}
                                    {
                                        editMode || createMode ?
                                            (
                                                <>
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
                                                </>
                                            ) : (null)
                                    }

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
