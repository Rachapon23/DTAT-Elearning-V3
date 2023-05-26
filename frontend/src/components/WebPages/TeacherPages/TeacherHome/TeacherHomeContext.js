import React, { createContext, useEffect, useState } from "react";
import { getHome } from "../../../../function/Admin/adminFunction";
import { getProfile, listCourseGraphData } from "../../../../function/Teacher/home";

export const TeacherHomeContext = createContext();

export const TeacherHomeProvider = ({ children }) => {
    const [profile, setProfile] = useState({})
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
        fetchCourse()
    }, [])

    return (
        <TeacherHomeContext.Provider
            value={{
                profile,
                setProfile,
                graphData,
                setGraphData
            }}>
            {children}
            
        </TeacherHomeContext.Provider >
    );
}
