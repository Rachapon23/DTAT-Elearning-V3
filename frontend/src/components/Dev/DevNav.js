import { UserSwitchOutlined } from '@ant-design/icons';
import { FloatButton } from "antd";
import { useNavigate } from 'react-router-dom';

const DevNav = () => {
    const navigate = useNavigate()
    return (
        <FloatButton.Group
            trigger="click"
            type="primary"
            style={{
                right: 25,
            }}
            icon={<UserSwitchOutlined />}
        >
            <FloatButton tooltip={<div>Admin</div>} icon={"A"} onClick={() => navigate("/admin/page/home")}/>
            <FloatButton tooltip={<div>Teacher</div>} icon={"T"} onClick={() => navigate("/teacher/page/home")} />
            <FloatButton tooltip={<div>Student</div>} icon={"S"} onClick={() => navigate("/student/page/home")} />
        </FloatButton.Group>
    )
}

export default DevNav;