import React, { createContext, useEffect, useState } from "react";
import { listCourse } from "../../../../function/Student/course";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {

    const [courses, setCourses] = useState([])

    const fetchCourse = async () => {
        await listCourse(sessionStorage.getItem("token"), `?select=name,detail,image`)
            .then(
                (res) => {
                    const data = res.data.data
                    setCourses(data)
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
        <StudentContext.Provider
            value={{
                courses,
                setCourses,
            }}>
            {children}
        </StudentContext.Provider >
    );
}
