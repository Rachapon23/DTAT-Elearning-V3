import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./adminhome.css";
import { createDepartment, listDepartment, removeDepartment } from "../../../../function/Admin/adminFunction";

const Department = () => {

    const [departments, setDepartments] = useState([
        {
            _id: "",
            id: "",
        }
    ]);

    const [newDepartment, setNewDepartment] = useState(null);
    const [hasChanged, setHasChanged] = useState(false);

    const handleInputNewDepartment = (e) => {
        console.log(e.target.id)
        setNewDepartment(e?.target?.value)
    }

    const handleCreateDepartment = async () => {
        console.log(newDepartment)
        await createDepartment(
            sessionStorage.getItem("token"),
            { id: newDepartment }
        )
            .then(
                (res) => {
                    console.log(res.data.data)
                    setHasChanged(true);
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const handleRemoveDepartment = async (index) => {
        await removeDepartment(sessionStorage.getItem("token"), departments[index]?._id)
            .then(
                (res) => {
                    console.log(res.data.data)
                    setHasChanged(true);
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const columns = [
        {
            title: "No",
            align: "center",
            width: "20%",
            render: (data) => departments.indexOf(data) + 1,
        },
        {
            title: `Department ID`,
            align: "left",
            dataIndex: "id",
        },
        {
            title: `Delete`,
            align: "center",
            width: "20%",
            render: (data) => {
                const index = departments.indexOf(data);
                return (
                    <Button
                        onClick={() => handleRemoveDepartment(index)}
                    >
                        <DeleteOutlined />
                    </Button>
                )
            },
        },
    ];

    const fetchDepartment = async () => {
        await listDepartment()
            .then(
                (res) => {
                    const data = res.data.data
                    console.log(data)
                    setDepartments(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(() => {
        fetchDepartment()
        return () => {
            setHasChanged(false)
        }
    }, [hasChanged])

    return (
        <Row justify={"center"}>
            <Col flex={"auto"}>
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: "flex", }}
                >
                    <Space.Compact
                        style={{ width: "100%", }}
                        className="plant"
                    >
                        <Input
                            onChange={handleInputNewDepartment}
                            placeholder="Add Department ID"
                            style={{ width: "100%", }}
                        />
                        <Button type="primary"
                            onClick={handleCreateDepartment}
                        >
                            Submit
                        </Button>
                    </Space.Compact>
                    <Table
                        columns={columns}
                        dataSource={departments}
                        className="table-student"
                        pagination={{
                            defaultPageSize: 20,
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "30"],
                        }}
                    />
                </Space>
            </Col>
        </Row>

    )
}

export default Department;