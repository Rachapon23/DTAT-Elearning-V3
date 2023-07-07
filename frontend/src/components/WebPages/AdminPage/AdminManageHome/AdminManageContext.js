import React, { createContext, useEffect, useState } from "react";
import { getHome } from "../../../../function/Admin/adminFunction";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [home, setHome] = useState(null | {
        announce: [],
        course_public: [],
        course_private: [],
    })
    const [announce, setAnnounce] = useState([])
    const [ coursePublic, setCoursePublic ] = useState([])
    const [ coursePrivate, setCoursePrivate ] = useState([])

    const fetchHome = async () => {
        await getHome()
            .then(
                (res) => {
                    const data = res.data.data
                    setHome(data)
                    setAnnounce(() => data.announce)
                    setCoursePublic(() => data.course_public)
                    setCoursePrivate(() => data.course_private)
                    console.log( "fetch: ",data.announce, data.course_public,data.course_private)
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
                announce,
                setAnnounce,
                coursePublic,
                setCoursePublic,
                coursePrivate,
                setCoursePrivate,
            }}>
            {children}
        </AdminContext.Provider >
    );
}
