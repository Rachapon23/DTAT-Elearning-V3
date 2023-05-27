import { Checkbox, Col, Radio, Row, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminManageContext";
import { listCourse } from "../../../../../function/Admin/adminFunction";

const CourseTable = () => {
    const { coursePublic, setCoursePublic } = useContext(AdminContext)
    const [publicCourse, setPublicCourse] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(mapSelectedCourse())

    function mapSelectedCourse() {
        let newData = null
        if (Array.isArray(coursePublic) && coursePublic.length > 0) {
            newData = Object.values(coursePublic.map((item) => item.course))            

        }
        else return {}
        let mappedData = Object.fromEntries(newData.map((item) => [item, item]))
        // console.log(mappedData)
        return mappedData
    }

    const handleCheckBoxChange = (index, dataId) => {

        let newData = null
        if (selectedCourse[dataId]) {
            const length = Object.keys(selectedCourse).length
            const prev = Object.fromEntries(Object.entries(selectedCourse).slice(0, index))
            const next = Object.fromEntries(Object.entries(selectedCourse).slice(index + 1, length))
            newData = { ...prev, ...next }
            setSelectedCourse(() => newData)
        }
        else {
            const field = dataId
            newData = { ...selectedCourse, [field]: publicCourse[index]._id }
            // console.log({ ...selectedCourse, [field]: newData })
            setSelectedCourse(() => newData)
        }
        setCoursePublic(() => ([...Object.values(newData).map((item) => ({ course: item, name: "", original_name: "", url: ""}) )]))
        // ...publicCourse.filter((value, i) => i === index ? value: null)
    }
    // console.log(selectedCourse)

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
                // console.log(data._id, data.name , selectedCourse[`course${publicCourse.indexOf(data)}`] ? true : false)
                let selected = false
                if(selectedCourse) {
                    selected = selectedCourse[data?._id] ? true : false
                }
                // checkedCourse[checkedCourse.indexOf(data)] === publicCourse[publicCourse.indexOf(data)]
                // checked={selectedRadio[publicCourse.indexOf(data)] === data?._id} onChange={(e) => handleRadioChange({ checked: e?.target?.checked, _id: data?._id, index: publicCourse.indexOf(data) })}
                return <Checkbox checked={selected} onChange={() => handleCheckBoxChange(publicCourse.indexOf(data), data?._id)} />
            },
        },
    ]
    // console.log("---------------------------------------------------")

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

    // useEffect(() => {
    //     console.log(coursePublic);
    // }, [coursePublic])

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