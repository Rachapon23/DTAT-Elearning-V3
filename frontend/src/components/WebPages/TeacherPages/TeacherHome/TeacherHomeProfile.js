import React, { useContext, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Descriptions, Empty } from 'antd';
import { TeacherHomeContext } from './TeacherHomeContext';
import { updateProfile } from '../../../../function/Teacher/home';

const { Title, Text } = Typography;

const TeacherHomeProfile = ({ actionMode, setActionMode }) => {
    const { profile, setProfile } = useContext(TeacherHomeContext)
    const [isEdited, setIsEdited] = useState(false)

    const handleProfileChange = (e) => {
        console.log(e.target.id, e.target.value)
        setIsEdited(true)
        setProfile((prev) => ({ ...prev, [e.target.id]: e.target.value }))

    }
    const handleProfileSave = async (e) => {
        console.log(e.target.innerText)

        if (!isEdited) return
        if (e?.target?.innerText !== "Save") return

        await updateProfile(sessionStorage.getItem("token"), profile._id, profile)
            .then(
                (res) => {
                    const data = res.data.data
                    console.log(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                })
    }

    return (
        <Row>
            <Col flex={"auto"}>
                <Card
                    title={
                        <Row justify={'space-between'} align={'middle'}>
                            <Col>
                                <Title level={5} style={{ marginTop: "10px" }}>
                                    Profile
                                </Title>
                            </Col>
                            <Col>
                                <Button
                                    onClick={
                                        (e) => {
                                            if (actionMode === "Preview") return setActionMode("Edit")
                                            if (actionMode === "Edit") {
                                                handleProfileSave(e)
                                                return setActionMode("Preview")
                                            }
                                        }
                                    }
                                >
                                    {
                                        actionMode === "Preview" ?
                                            "Edit" : actionMode === "Edit" ? "Save" : null
                                    }
                                </Button>
                            </Col>
                        </Row>
                    }
                    style={{ width: "100%" }}
                >
                    <Row justify={"center"} >
                        <Col>
                            {
                                profile?.firstname && <Avatar shape="square" size={200} icon={<p>{profile?.firstname ? profile?.firstname.substring(0, 1): null}</p>} />
                            }
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "5%" }} />
                    {
                        actionMode === "Preview" ?
                            (
                                <>
                                    <p>
                                        <Row>
                                            <Col flex={"auto"} style={{ width: "25%" }}>
                                                <Col> <Text strong> First Name </Text> </Col>
                                                <Col>{profile?.firstname}</Col>
                                            </Col>

                                            <Col style={{ marginLeft: "1%", marginRight: "1%" }} />

                                            <Col flex={"auto"} style={{ width: "25%" }}>
                                                <Col> <Text strong> Last Name </Text> </Col>
                                                <Col>{profile.lastname}</Col>
                                            </Col>
                                        </Row>
                                    </p>
                                    <p>
                                        <Col> <Text strong> Email </Text> </Col>
                                        <Col>{profile.email}</Col>
                                    </p>
                                    <p>

                                        <Col> <Text strong> Tel </Text> </Col>
                                        <Col> {profile.tel ? profile.tel : "No data"}</Col>
                                    </p>
                                    <p>
                                        <Col> <Text strong> Target </Text> </Col>
                                        <Col> {profile.target ? profile.target : "No data"} </Col>

                                    </p>
                                </>
                            )
                            :
                            (
                                actionMode === "Edit" ?
                                    (
                                        <>
                                            <p>
                                                <Row justify={'space-between'}>
                                                    <Col flex={"auto"} style={{ width: "25%" }}>
                                                        <Text strong> First Name </Text>
                                                        <Input
                                                            id="firstname"
                                                            defaultValue={profile.firstname}
                                                            disabled
                                                        />
                                                    </Col>

                                                    <Col style={{ marginLeft: "1%", marginRight: "1%" }} />

                                                    <Col flex={"auto"} style={{ width: "25%" }}>
                                                        <Text strong> Last Name </Text>
                                                        <Input
                                                            id="lastname"
                                                            defaultValue={profile.lastname}
                                                            disabled
                                                        />
                                                    </Col>
                                                </Row>
                                            </p>
                                            <p>
                                                <Text strong> Email </Text>
                                                <Input
                                                    id="email"
                                                    defaultValue={profile.email}
                                                    disabled
                                                />
                                            </p>
                                            <p>
                                                <Text strong> Tel </Text>
                                                <Input
                                                    id="tel"
                                                    defaultValue={profile.tel}
                                                    onChange={handleProfileChange}
                                                />
                                            </p>
                                            <p>
                                                <Text strong> Target </Text>
                                                <Input
                                                    id="target"
                                                    min="0"
                                                    type="number"
                                                    defaultValue={profile.target}
                                                    onChange={handleProfileChange}
                                                />
                                            </p>
                                        </>
                                    ) : (null)

                            )
                    }
                </Card>
            </Col>
        </Row>

    )
}

export default TeacherHomeProfile;
