import React, { createContext, useEffect, useState } from "react";
import { getHome } from "../../../../../function/Admin/adminFunction";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [home, setHome] = useState(null | {
        acnounce: [],
        course_public: [],
        course_private: [],
    })
    const [acnounce, setAcnounce] = useState([])
    const [ coursePublic, setCoursePublic ] = useState([])
    const [ coursePrivate, setCoursePrivate ] = useState([])

    const fetchHome = async () => {
        await getHome()
            .then(
                (res) => {
                    const data = res.data.data
                    setHome(data)
                    setAcnounce(() => data.acnounce)
                    setCoursePublic(() => data.course_public)
                    setCoursePrivate(() => data.course_private)
                    console.log( "fetch: ",data.course_public)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(() => {
        fetchHome()
    }, [])

    return (
        <AdminContext.Provider
            value={{
                home,
                setHome,
                acnounce,
                setAcnounce,
                coursePublic,
                setCoursePublic,
                coursePrivate,
                setCoursePrivate,
            }}>
            {children}
        </AdminContext.Provider >
    );
}
