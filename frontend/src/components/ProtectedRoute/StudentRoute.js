import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useParams, useLocation } from "react-router-dom";
import { checkRole } from "../../function/auth";
// import { routeTeacher } from "../function/funcroute";

const StudentRoute = () => {
    const [status, setStatus] = useState(null);


    const CheckTeacher = async () => {
        await checkRole(sessionStorage.getItem("token"))
            .then((res) => {
                const data = res.data.data
                switch (data.role) {
                    case "teacher":
                    case "admin":
                    case "student":
                        setStatus(true)
                        break
                    default: setStatus(false)
                }
                if(sessionStorage.getItem("role") !== data.role) {
                    sessionStorage.setItem("role", data.role)
                }
            }).catch(err => {
                console.log(err)
                setStatus(false)
            })
        // routeTeacher(sessionStorage.getItem("token"))

    }

    const renderPage = () => {
        if(status === null) {
            return <>Please wait...</>
        }
        return status ? <Outlet /> : <Navigate to="/" />
    }

    useEffect(() => {
        CheckTeacher()
    }, [status])
    return renderPage()
}

export default StudentRoute