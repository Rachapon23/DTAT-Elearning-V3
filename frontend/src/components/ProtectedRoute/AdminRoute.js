import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useParams, useLocation } from "react-router-dom";
import { checkRole } from "../../function/auth";
// import { routeTeacher } from "../function/funcroute";

const AdminRoute = () => {
    const [status, setStatus] = useState(true);

    const CheckTeacher = async () => {
        await checkRole(sessionStorage.getItem("token"))
            .then((res) => {
                const data = res.data.data
                switch (data.role) {
                    case "admin":
                        setStatus(true)
                        break
                    default: setStatus(false)
                }
            }).catch(err => {
                console.log(err)
                setStatus(false)
            })
    }

    useEffect(() => {
        CheckTeacher()
    }, [])
    return (
        status ? <Outlet /> : <Navigate to="/" />
    )
}

export default AdminRoute