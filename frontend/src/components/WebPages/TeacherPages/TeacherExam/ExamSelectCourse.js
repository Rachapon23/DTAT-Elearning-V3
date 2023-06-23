import React, { useEffect, useCallback, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Col, Row, Input, Table, Form, Radio, Image } from 'antd';
import "../teach.css"
import { getCourseWoQuiz } from "../../../../function/Teacher/exam";

const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";
const PAGE_SIZE = 4

const ExamSelectCourse = ({
    // cousresWithOutQuiz = null,
    // coursesCol = null,
    onSetInputContentData = null,
    inputInfoData = null,
    onSetInputInfoData = null,
    onSetCurentSelectedRadio = null,
    onSetCousreWithOutQuiz = null,
}) => {

    const [selectedRadio, setSelectedRadio] = useState(inputInfoData?.course);
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
            render: (image) => (
                <Image
                    width={150}
                    onError={handleUnloadImage}
                    src={image?.name ? `${process.env.REACT_APP_IMG}/course/${image?.name}` : DEFAULT_IMAGE}
                />
            )
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
            dataIndex: 'enabled',
            key: 'enabled',
            align: "center",
            render: (enabled) => enabled === true ? "Open" : "Close",//"Enable" : "Disable"),
        },
        {
            title: "Select",
            align: "center",
            width: "10%",
            render: (data) => {
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

        // console.log(data.filter((item) => {
        //     return item?.name?.toLowerCase().indexOf(keyword) >= 0;
        // }).slice(PAGE_SIZE * (currentCoursePage - 1), (PAGE_SIZE * (currentCoursePage - 1)) + PAGE_SIZE))

        return data.filter((item) => {
            // console.log(item)
            return item?.name?.toLowerCase().indexOf(keyword) >= 0;
        }).slice(PAGE_SIZE * (currentCoursePage - 1), (PAGE_SIZE * (currentCoursePage - 1)) + PAGE_SIZE)
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

    const handleUnloadImage = (e) => {
        e.target.src = DEFAULT_IMAGE
    }

    const handleRowSelect = (e, index) => {
        // console.log(e, index)
        if (e.target.innerText === "Preview") return
        handleRadioChange({ _id: cousresWithOutQuiz[index]?._id, index: index })
    }

    const handleRadioChange = (data) => {
        onSetInputInfoData(() => ({
            name: "",
            course: "",
            detail: "",
            enable: false,
        }))
        onSetInputContentData([])

        onSetCurentSelectedRadio(data?.index)
        setSelectedRadio(data?._id) // may remove later
        onSetInputInfoData(prev => ({ ...prev, course: data?._id }))

        onSetCousreWithOutQuiz(cousresWithOutQuiz[data?.index])


    }

    useEffect(() => {
        fetchCourseWoQuiz()
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