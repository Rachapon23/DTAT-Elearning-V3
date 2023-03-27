import React from "react"
import { useNavigate } from "react-router-dom";
import { Row, Col, Layout, Menu, Header } from "antd";



const NavBar = ({page=0}) => {
    const { Header } = Layout;
    const navigate = useNavigate()

    const NavBar = ["logo--------------", "Courses", 'Exams', '3'].map((key) => {
        return {
            key: key,
            label: `${key}`,
        }
    });

    const handleClick = (e) => {
        switch (e.key) {
            case "Courses": navigate("/teacher/courses");  break;
            case "Exams": navigate("/teacher/exams");  break;
            default: navigate("/teacher/home"); 
        }
    }

    

    return (
        <Row>
            <Layout>
                <Col>
                    <Header className="header">
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`logo--------------`]} items={NavBar} onClick={handleClick} selectedKeys={[`${page}`]}/>
                    </Header>
                </Col>
            </Layout>
        </Row>
    )
}

export default NavBar;