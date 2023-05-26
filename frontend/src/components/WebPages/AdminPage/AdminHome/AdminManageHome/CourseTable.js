import { Checkbox, Col, Radio, Row, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminManageContext";
import { listCourse } from "../../../../../function/Admin/adminFunction";

const CourseTable = () => {
    const { setCoursePublic } = useContext(AdminContext)
    const [publicCourse, setPublicCourse] = useState([]);
    
    const handleCheckBoxChange = (index) => {
        const newData = {
            course: publicCourse[index]._id,
        }
        console.log(publicCourse[index])
        // ...publicCourse.filter((value, i) => i === index ? value: null)
        setCoursePublic((prev) => [...prev, newData])

    }
    // console.log("-> ",checkedCourse)
    const col = [
        {
            title: "Image",
            dataIndex: 'image',
            key: 'image',
            align: "center",
            width: "15%",
            // render: (data) => console.log(data)
        },
        {
            title: "Course",
            dataIndex: 'name',
            key: 'name',
            width: "50%",
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            align: "center",
            render: (type) => type === true ? "Public" : "Private",
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
            align: "center",
            render: (status) => status === true ? "Disable" : "Eanble",
        },
        {
            title: "Select",
            align: "center",
            width: "10%",
            render: (data) => {
                // checkedCourse[checkedCourse.indexOf(data)] === publicCourse[publicCourse.indexOf(data)]
                // checked={selectedRadio[publicCourse.indexOf(data)] === data?._id} onChange={(e) => handleRadioChange({ checked: e?.target?.checked, _id: data?._id, index: publicCourse.indexOf(data) })}
                return <Checkbox onChange={() => handleCheckBoxChange(publicCourse.indexOf(data))} />
            },
        },
    ]


    const fetchData = () => {
        listCourse(sessionStorage.getItem("token"))
            .then(
                (res) => {
                    const data = res.data.data
                    setPublicCourse(data)
                    // console.log(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <Row >
            <Col flex="auto">
                <Table
                    columns={col}
                    dataSource={publicCourse}
                />
            </Col>
        </Row>
    )
}

export default CourseTable;