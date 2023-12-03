import React, { useEffect, useState } from "react";
import "../AdminHome/adminhome.css";
import { Button, Input, Select, Table, Typography, Breadcrumb, Switch, Space, Tabs, Row, Col } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { listUser, listTimeusage } from "../../../../function/Admin/adminFunction";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;
const AdminTimeDetails = () => {
    const [timeUsage, setTimeUsage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [newPlant, setNewPlant] = useState("");
    const [hasChanged, setHasChanged] = useState(false);

    const handleInputNewPlant = (e) => {
        setNewPlant(e?.target?.value)
    }

    const handleCreatePlant = async () => {

    }

    const handleRemovePlant = async (index) => {

    }

    const columns = [
        {
            title: "No",
            align: "center",
            width: "10%",
            render: (data) => timeUsage.indexOf(data) + 1,
        },
        {
            title: `Date`,
            align: "center",
            render: (data) => data.date.substring(0, 10),

        },
        {
            title: `Login Times`,
            align: "center",
            render: (data) => data.timeusage.length,
        },
        {
            title: `Appoximate Last Time Usage`,
            align: "center",
            render: (data) => {
                const length = data.timeusage.length - 1 < 0 ? 0 : data.timeusage.length - 1;
                return data.timeusage[length].used_time ? data.timeusage[length].used_time : '-'
            },
        },
        {
            title: `Details`,
            align: "center",
            width: "20%",
            render: (data) => {
                const id = data?.user;
                console.log(data)
                return (
                    <Button onClick={() => navigate(`/admin/page/timedetail/${id}`, { state: { date: data?.date} })}>
                        <UnorderedListOutlined />
                    </Button>
                )
            },
        },
    ];

    const fetchTimeUsage = async () => {
        await listTimeusage(sessionStorage.getItem('token'), id)
            .then(
                (res) => {
                    const data = res?.data?.data
                    console.log(data)
                    setTimeUsage(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(() => {
        // fetchUser()
        fetchTimeUsage()
        return () => {
            setHasChanged(false)
        }
    }, [hasChanged])

    return (
        <Space
            direction="vertical"
            size="middle"
            style={{
                display: "flex",
            }}
        >
            <Row align={'middle'}>
                <Col flex={'auto'}>
                    <Title level={5} style={{ marginTop: "10px" }}>
                        <p> Time Details </p>
                    </Title>
                </Col>
                <Col style={{ paddingBottom: '5px' }}>
                    <Button type="default" onClick={() => navigate(-1)}>Back</Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={timeUsage}
                className="table-student"
                pagination={{
                    defaultPageSize: 20,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "30"],
                }}
                rowKey="_id"
            />
        </Space>
    );
};

export default AdminTimeDetails;
