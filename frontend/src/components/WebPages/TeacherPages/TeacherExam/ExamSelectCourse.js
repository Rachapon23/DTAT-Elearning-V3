import React, { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined, BarsOutlined, AppstoreOutlined, InfoCircleOutlined, CloseOutlined, PictureOutlined, UpOutlined, DownOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Table, Segmented, Badge, Alert, Breadcrumb, Steps, Form, Radio, Image, Empty, Affix, Result } from 'antd';
import NavBar from "../../../Layout/NavBar"
import CardContent from "./CardContent";
import "../teach.css"
import { createExam, getCourseWoQuiz, getExam, updateExam } from "../../../../function/Teacher/exame";

const { Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const ExamSelectCourse = ({
    // cousresWithOutQuiz = null,
    // coursesCol = null,
    inputInfoData=null,
    onSetInputInfoData = null,
    onSetCurentSelectedRadio = null,
    onSetCousreWithOutQuiz=null,
}) => {
    const pageSize = 4
    const [selectedRadio, setSelectedRadio] = useState(inputInfoData?.course);
    
    // const [firstLoad, setFirstLoad] = useState(false);
    console.log("course must be: ",selectedRadio,  " END")
    
    const [cousresWithOutQuiz, setCousresWithOutQuiz] = useState(null | [{
        enabled: null,
        name: "",
        teacher: "",
        image: null,
        type: null,
        _id: "",
    }])

    const coursesCol = [
        {
            title: "Image",
            dataIndex: 'image',
            key: 'image',
            align: "center",
            width: "15%",
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
                console.log(data._id, selectedRadio)
                return <Radio checked={selectedRadio === data?._id} onChange={(e) => handleRadioChange({ checked: e?.target?.checked, _id: data?._id, index: cousresWithOutQuiz.indexOf(data) })} />
            },
        },
    ]

    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const [currentCoursePage, setCurrentCoursePage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const handleSearch = (e) => {
        setKeyword(`${e.target.value.toLowerCase()}`)
        setCurrentCoursePage(1)
    }

    const filterCourse = useCallback((data) => {
        if (!data) return
        return data.filter((item) => {
            return item?.name?.toLowerCase().indexOf(keyword) >= 0;
        }).slice(pageSize * (currentCoursePage - 1), (pageSize * (currentCoursePage - 1)) + pageSize)
    }, [currentCoursePage, keyword])

    const fetchCourseWoQuiz = async () => {
        await getCourseWoQuiz(sessionStorage.getItem("token"))
            .then(
                (res) => {
                    const data = res.data.data;
                    setCousresWithOutQuiz(() => (data));
                    // setFirstLoad(true);
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const handleRowSelect = (e, index) => {
        // console.log(e, index)
        if (e.target.innerText === "Preview") return
        handleRadioChange({ _id: cousresWithOutQuiz[index]._id, index: index })
    }

    const handleRadioChange = (data) => {
        onSetCurentSelectedRadio(data?.index)
        setSelectedRadio(data?._id) // may remove later
        onSetInputInfoData(prev => ({ ...prev, course: data?._id }))
        
        onSetCousreWithOutQuiz(cousresWithOutQuiz[data?.index])
    }

    useEffect(() => {
        fetchCourseWoQuiz()
        return () => {
            
        }
    }, [])


    return (
        <Form
            style={{ paddingTop: "2%" }}
            form={form}
            layout="vertical"
            initialValues={{
                requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
        >
            <Row >
                <Col style={{ width: "100%" }}>
                    <Form.Item label="Select Course" required tooltip="This is a required field">
                        <Input placeholder="Search course" prefix={<SearchOutlined />} onChange={handleSearch} />
                        {/* {console.log(cousresWithOutQuiz)} */}
                        {
                            cousresWithOutQuiz ?
                                (
                                    <Table style={{ paddingTop: "1%" }} dataSource={filterCourse(cousresWithOutQuiz)} columns={coursesCol} onRow={(_, index) => {

                                        return {
                                            onClick: (e) => handleRowSelect(e, index),
                                        }
                                    }} />
                                )
                                :
                                (
                                    <Table style={{ paddingTop: "1%" }} dataSource={null} columns={coursesCol} />
                                )
                        }
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    )
}

export default ExamSelectCourse;