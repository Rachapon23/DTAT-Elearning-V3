import { Checkbox, Col, Image, Row, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminManageContext";
import { listCourse } from "../../../../../function/Admin/adminFunction";

const CourseTable = ({ manage = null, home_course=null }) => {
    const { coursePublic, setCoursePublic } = useContext(AdminContext)
    const { coursePrivate, setCoursePrivate } = useContext(AdminContext)
    const [publicCourse, setPublicCourse] = useState([]);
    const [courseList, setCourseList] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(mapSelectedCourse(manage))

    function mapSelectedCourse(manage) {
        let mappedData = null
        // console.log("get: ", coursePublic)
        switch (manage) {
            case "Public Course":
                if (!Array.isArray(coursePublic) && coursePublic.length < 1) return {}
                mappedData = Object.fromEntries(coursePublic.map((item) => [item._id, item._id]));
                break;
            case "Private Course":
                if (!Array.isArray(coursePrivate) && coursePrivate.length < 1) return {}
                mappedData = Object.fromEntries(coursePrivate.map((item) => [item._id, item._id]));
                break;
            default: return mappedData
        }
        // console.log("mapped: ", mappedData)
        return mappedData



    }

    const handleCheckBoxChange = (index, dataId) => {

        let newData = null
        // console.log(selectedCourse)
        if (selectedCourse[dataId]) {
            const selectedCourseKeys = Object.keys(selectedCourse)
            const indexId = selectedCourseKeys.indexOf(dataId)
            const length = selectedCourseKeys.length

            const selectedCourseArray = Object.entries(selectedCourse)
            const prev = Object.fromEntries(selectedCourseArray.slice(0, indexId))
            const next = Object.fromEntries(selectedCourseArray.slice(indexId + 1, length))

            newData = { ...prev, ...next }
            // console.log("--->", newData)
            setSelectedCourse(() => newData)
        }
        else {
            const field = dataId
            newData = { ...selectedCourse, [field]: courseList[index]._id }
            // console.log(">>>", newData)
            setSelectedCourse(() => newData)
        }

        if (!newData) return

        switch (manage) {
            case "Public Course":
                setCoursePublic(() => ([...Object.values(newData).map((item) => item)]))
                break;
            case "Private Course":
                setCoursePrivate(() => ([...Object.values(newData).map((item) => item)]))
                break;
            default: return
        }
        
    }

    const col = [
        {
            title: "Image",
            dataIndex: 'image',
            key: 'image',
            align: "center",
            width: "15%",
            render: (data) => {
                if (!data?.url) return
                return (
                    <Image
                        width={150}
                        src={process.env.REACT_APP_IMG + data.url}
                    />
                )
            }
        },
        {
            title: "Course",
            dataIndex: 'name',
            key: 'name',
            width: "50%",
        },
        {
            title: "ID",
            dataIndex: '_id',
            key: '_id',
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
                if (selectedCourse) {
                    selected = selectedCourse[data?._id] ? true : false
                }
                // checkedCourse[checkedCourse.indexOf(data)] === publicCourse[publicCourse.indexOf(data)]
                // checked={selectedRadio[publicCourse.indexOf(data)] === data?._id} onChange={(e) => handleRadioChange({ checked: e?.target?.checked, _id: data?._id, index: publicCourse.indexOf(data) })}
                return <Checkbox checked={selected} onChange={() => handleCheckBoxChange(courseList.indexOf(data), data?._id)} />
            },
        },
    ]
    // console.log("---------------------------------------------------")

    const fetchData = () => {
        let queryStr = null
        switch (manage) {
            case "Public Course":
                queryStr = `?select=_id,name,enabled,type,image&search=type:true`
                break;
            case "Private Course":
                queryStr = `?select=_id,name,enabled,type,image&search=type:false`
                break;
            default:
                setCourseList(null)
                return;
        }

        listCourse(sessionStorage.getItem("token"), queryStr)
            .then(
                (res) => {
                    const data = res.data.data
                    // setPublicCourse(data)
                    setCourseList(data)
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
        // switch (manage) {
        //     case "Public Course":
        //         if (!Array.isArray(coursePublic) && coursePublic.length < 1) return {}
        //         mappedData = Object.fromEntries(coursePublic.map((item) => [item._id, item._id]));
        //         break;
        //     case "Private Course":
        //         if (!Array.isArray(coursePrivate) && coursePrivate.length < 1) return {}
        //         mappedData = Object.fromEntries(coursePublic.map((item) => [item._id, item._id]));
        //         break;
        //     default: return mappedData
        // }
    }, [])

    // useEffect(() => {
    //     console.log(coursePublic);
    // }, [coursePublic])

    return (
        <Row >
            <Col flex="auto">
                <Table
                    columns={col}
                    dataSource={courseList}
                />
            </Col>
        </Row>
    )
}

export default CourseTable;