import React, { createContext, useEffect, useState } from "react";
import { getProfile, listCourseGraphData } from "../../../../function/Teacher/home";
import { getCourse, listCourse } from "../../../../function/Teacher/course";

export const TeacherCourseContext = createContext();

export const TeacherCourseProvider = ({ children }) => {
    const [courses, setCousrses] = useState([])
    const [graphData, setGraphData] = useState([])
    // const [coursePrivate, setCoursePrivate] = useState([])

    const fetchProfile = async () => {
        await listCourse(sessionStorage.getItem("token"), sessionStorage.getItem("user_id"))
            .then(
                (res) => {
                    const data = res.data.data
                    setCousrses(data)
                    console.log("eva: ",data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const fetchCourse = async () => {
        await listCourseGraphData(sessionStorage.getItem("token"))
            .then(
                (res) => {
                    const data = res.data.data
                    // setGraphData(() => data.map(item => ({ name: item.name, maximum: item.condition.map((i => i.maximum)) })) )
                    setGraphData(data)
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
        fetchProfile()
        // fetchCourse()
    }, [])

    return (
        <TeacherCourseContext.Provider
            value={{
                courses,
                setCousrses,
            }}
        >
            {children}
        </TeacherCourseContext.Provider >
    );
}
