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

    const fetchHome = async () => {
        await getHome()
            .then(
                (res) => {
                    const data = res.data.data
                    // Error Data is null
                    
                    // setHome(data)
                    // setAcnounce(() => data.acnounce)
                    // console.log("Data : ",res.data.data)
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
        <HomeContext.Provider
            value={{
                home,
                setHome,
                acnounce,
                setAcnounce
            }}>
            {children}
        </HomeContext.Provider >
    );
}
