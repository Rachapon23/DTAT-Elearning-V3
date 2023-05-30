import React, { createContext, useEffect, useState } from "react";
import { getHome } from "../../../../function/func.js";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [home, setHome] = useState(null | {
        acnounce: [],
        course_public: [],
        course_private: [],
    })
    const [acnounce, setAcnounce] = useState([])
    const [coursePublic, setCoursePublic] = useState([])
    const [coursePrivate, setCoursePrivate] = useState([])

    const fetchHome = async () => {
        await getHome()
            .then(
                (res) => {
                    const data = res.data.data
                    setHome(data)
                    // console.log(data)
                    setAcnounce(() => data.acnounce)
                    setCoursePublic(() => data.course_public)
                    setCoursePrivate(() => data.course_private)
                    // console.log(data.acnounce)
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
        // console.log(coursePrivate)
    }, [])

    return (
        <HomeContext.Provider
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
        </HomeContext.Provider >
    );
}
