import { UserSwitchOutlined } from '@ant-design/icons';
import { FloatButton } from "antd";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkRole } from '../../../function/auth';

const DevNav = () => {
    const navigate = useNavigate()
    const [status, setStatus] = useState(null);
    const [hasToken] = useState(sessionStorage?.getItem("token"));

    const CheckAdmin = async () => {
        if (!hasToken) return
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

    const renderPage = () => {
        if (!status) return null
        return (
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{
                    right: 20,
                    // left: 20,
                    // top: 25
                }}
                icon={<UserSwitchOutlined />}
            >
                <FloatButton tooltip={<div>Admin</div>} icon={"A"} onClick={() => navigate("/admin/page/home")} />
                <FloatButton tooltip={<div>Teacher</div>} icon={"T"} onClick={() => navigate("/teacher/page/home")} />
                <FloatButton tooltip={<div>Student</div>} icon={"S"} onClick={() => navigate("/student/page/home")} />
                <FloatButton tooltip={<div>Root</div>} icon={"R"} onClick={() => navigate("/")} />
            </FloatButton.Group>
        )
    }

    useEffect(() => {
        CheckAdmin()
    }, [status, hasToken])
    return renderPage()
}

export default DevNav;