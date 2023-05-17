import React, { createContext, useEffect, useState } from "react";
import { getHome } from "../../../../function/Admin/adminFunction";
import { getProfile, listCourse } from "../../../../function/Teacher/home";

export const TeacherHomeContext = createContext();

export const TeacherHomeProvider = ({ children }) => {
    const [home, setHome] = useState(null | {
        acnounce: [],
        course_public: [],
        course_private: [],
    })
    const [profile, setProfile] = useState({})
    const [course, setCourse] = useState([])
    const [graphData, setGraphData] = useState([])
    // const [coursePrivate, setCoursePrivate] = useState([])

    const fetchProfile = async () => {
        await getProfile(sessionStorage.getItem("token"), sessionStorage.getItem("user_id"))
            .then(
                (res) => {
                    const data = res.data.data
                    setProfile(data)
                    // console.log(data)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const fetchCourse = async () => {
        await listCourse(sessionStorage.getItem("token"), "?field=condition")
            .then(
                (res) => {
                    const data = res.data.data
                    setCourse(data)
                    setGraphData(() => [data.map(item => ({ name: item.name, maximum: item.condition.map((i => i.maximum)) }))])
                    
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
        fetchCourse()
    }, [])

    return (
        <TeacherHomeContext.Provider
            value={{
                profile,
                setProfile,
                course,
                setCourse,
                graphData,
                setGraphData
            }}>
            {children}
            {console.log(graphData)}
        </TeacherHomeContext.Provider >
    );
}
