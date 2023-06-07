import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../../../../function/Student/course";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";

const StudentExam = () => {
    const params = useParams()

    const [course, setCourse] = useState()

    const fetchCourse = async () => {
        await getCourse(sessionStorage.getItem("token"), params.id)
            .then(
                (res) => {
                    const data = res.data.data
                    // console.log(res)
                    setCourse(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    return (
        <Row justify={"center"}>

            <Col flex={"auto"} style={{ padding: "2%" }}>
                <Card>
                    Course: {course?.name}
                </Card>
            </Col>
        </Row>
    )
}

export default StudentExam;