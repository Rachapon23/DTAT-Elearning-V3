import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { checkRole } from "../../../function/auth";

const AdminRoute = () => {
    const [status, setStatus] = useState(null);

    const CheckAdmin = async () => {
        await checkRole(sessionStorage.getItem("token"))
            .then((res) => {
                const data = res.data.data
                switch (data.role) {
                    case "admin":
                        setStatus(true)
                        break
                    default: setStatus(false)
                }
                if (sessionStorage.getItem("role") !== data.role) {
                    sessionStorage.setItem("role", data.role)
                }
            }).catch(err => {
                console.log(err)
                setStatus(false)
            })
    }

    const renderPage = () => {
        if(status === null) {
            return <>Please wait...</>
        }
        return status ? <Outlet /> : <Navigate to="/" />
    }

    useEffect(() => {
        CheckAdmin()
    }, [status])
    return renderPage()
}

export default AdminRoute