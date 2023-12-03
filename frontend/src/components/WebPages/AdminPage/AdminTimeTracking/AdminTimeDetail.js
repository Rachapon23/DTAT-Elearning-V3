import React, { useEffect, useState } from "react";
import "../AdminHome/adminhome.css";
import { Button, Table, Typography, Space, Row, Col } from "antd";
import { listTimeusage } from "../../../../function/Admin/adminFunction";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;
const AdminTimeDetail = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { id } = useParams();

    const [timeUsage, setTimeUsage] = useState(null);

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
            render: (data) => {
                console.log(data)

                const date = new Date(data.logged_in_at)
                return `${date}`.substring(0, 25)
            },

        },
        {
            title: `Appoximate Time Usage`,
            align: "center",
            render: (data) => data.used_time,
        },
    ];

    const fetchTimeUsage = async () => {
        await listTimeusage(sessionStorage.getItem('token'), id, location.state.date)
            .then(
                (res) => {
                    const data = res?.data?.data
                    setTimeUsage(data[0].timeusage)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(() => {
        fetchTimeUsage()
    }, [])

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

export default AdminTimeDetail;
