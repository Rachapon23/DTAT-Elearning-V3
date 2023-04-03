import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Column, Pie } from '@ant-design/plots';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from "../../../Layout/NavBar"
import "../teach.css"

const { Title } = Typography;

const TeacherHome = () => {
  // Variable-Start
  const [current, setCurrent] = useState(1);
  let courseAmount = 32;
  let pageSize = 4
  const [keyword, setKeyword] = useState("");
  // Variable-End -------------------------------------------------------------------------------------------------------------------------------------------------------------



  // Data-Mockup-Start
  const pieData = [
    {
      type: 'Course 1',
      value: 25,
    },
    {
      type: 'Course 2',
      value: 25,
    },
    {
      type: 'Course 3',
      value: 25,
    },
    {
      type: 'Course 4',
      value: 25,
    },
  ];

  const createCourseProcess = (courseAmount) => {
    let array = []
    for (let i = 1; i <= courseAmount; i++) {
      array.push(`Course ${i}`)
    }
    return array
  }
  // Data-Mockup-End ----------------------------------------------------------------------------------------------------------------------------------------------------------



  // Data-Page-Start
  const config = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    legend: {
      position: 'left'
    }
  };
  // Data-Page-End ------------------------------------------------------------------------------------------------------------------------------------------------------------



  // Function-Start
  const onChange = (page) => {
    setCurrent(page);
  };

  const handleSearch = (e) => {
    setKeyword(`${e.target.value.toLowerCase()}`)
    setCurrent(1)
  }

  const getArrayLength = (array) => {
    courseAmount = array.length
    return array
  }
  // Function-End -------------------------------------------------------------------------------------------------------------------------------------------------------------



  // Sub-Component-Page-Start
  const courseProgressCard = (index, last_index) => {
    return (
      <div>
        <Row>
          <Col flex={"auto"}>
            <Row justify={"space-between"}>
              <Col>
                {`${index}`}
              </Col>
              <Col style={{ marginRight: "2.5%" }}>
                126 / 250
              </Col>
            </Row>
            <Row>
              <Col flex={"auto"} style={{ marginRight: "1%", display: "flex", alignSelf: "center" }}>
                <Tooltip title="600 / 1000">
                  <Progress percent={50} />
                </Tooltip>
              </Col>

            </Row>
          </Col>
          <Col style={{ display: "flex", alignSelf: "center" }}>
            <Button> More </Button>
          </Col>
        </Row>
        {index !== last_index ? <Divider /> : null}
      </div>
    )
  }

  const courseProgress = keyword === "" ?
    createCourseProcess(courseAmount).slice(4 * (current - 1), (4 * (current - 1)) + 4).map((key) => (
      courseProgressCard(key, courseAmount)
    ))
    :
    getArrayLength(
      createCourseProcess(courseAmount)
        .filter((item) => {
          return item.toLowerCase().indexOf(keyword) >= 0;
        })
    )
      .slice(pageSize * (current - 1), (pageSize * (current - 1)) + pageSize)
      .map((key) => {
        return courseProgressCard(key, courseAmount)
      })


  const detailedProgress = () => {
    return (
      <Row align={"top"} justify={"center"}>
        <Col flex={"auto"}>
          <Card title={renderCourseProcessTitle()} style={{ minHeight: "557px" }}>
            <Col flex={"auto"}>
              <Row><Col flex={"auto"} >{courseProgress}</Col></Row>
              <Row justify={"center"}><Pagination current={current} onChange={onChange} total={courseAmount} defaultPageSize={pageSize} /></Row>
            </Col>
          </Card>
        </Col>
      </Row>
    )
  }

  const renderCourseProcessTitle = () => {
    return (
      <Row align={"middle"} justify={"space-between"} >
        <Col>
          <Title level={5} style={{ marginTop: "10px" }}>Progress Summary for Each Course</Title>
        </Col>
        <Col style={{ paddingTop: "1px", paddingBottom: "1px" }}>
          <Input placeholder="Search course" prefix={<SearchOutlined />} onChange={handleSearch} />
        </Col>
      </Row>
    )
  }

  const overviewProgress = () => {
    return (
      <Row align={"top"}>
        <Col flex={"auto"}>
          <Card title={<Title level={5} style={{ marginTop: "10px" }}>Main Target Number of All Trainee</Title>}>
            <Col flex={"auto"}>
              <Row>
                <Col flex={"auto"}>
                  <Row justify={"space-between"}>
                    <Col>
                      Total
                    </Col>
                    <Col>
                      504 / 1000
                    </Col>
                  </Row>
                  <Col>
                    <Tooltip title="600 / 1000">
                      <Progress percent={50} />
                    </Tooltip>
                  </Col>
                </Col>
              </Row>
              <Row align={"middle"} justify={"center"}>
                <Col>
                  <Pie {...config} />
                </Col>

                <Col flex="auto">
                  <Row style={{ display: "flex", justifyContent: "space-between", }}>
                    <Col >
                      Thai Plant
                    </Col>
                    <Col style={{ marginRight: "2.5%", paddingLeft: "1%" }}>
                      250 / 500
                    </Col>
                    <Tooltip title="250 / 500">
                      <Progress percent={50} />
                    </Tooltip>
                  </Row>
                  <Row style={{ paddingTop: "10%", display: "flex", justifyContent: "space-between", }}>
                    <Col>
                      Regional Plant
                    </Col>
                    <Col style={{ marginRight: "2.5%", paddingLeft: "1%" }}>
                      350 / 500
                    </Col>
                    <Tooltip title="350 / 500">
                      <Progress percent={70} />
                    </Tooltip>
                  </Row>
                </Col>
              </Row>

            </Col>
          </Card>
        </Col>
      </Row>
    )
  }
  // Sub-Component-Page-End ---------------------------------------------------------------------------------------------------------------------------------------------------



  // Page-Conttoller-Start
  const ProgressSumPage = [
    {
      key: '1',
      label: `Overview`,
      children: overviewProgress(),
    },
    {
      key: '2',
      label: `Detailed`,
      children: detailedProgress(),
    },
  ];
  // Page-Conttoller-End ------------------------------------------------------------------------------------------------------------------------------------------------------



  return (
    <Layout  className="layout-content">
      {/* <NavBar page={"logo--------------"} /> */}
      <Row>
        {/* <Col sm={2} /> */}
        <Col flex="auto">
          <Card title="Teacher">
            <Row justify={"space-between"} >

              <Col flex={"auto"} style={{ paddingRight: "2%" }}>
                <Row justify={"center"}>
                  <Avatar shape="square" size={200} icon={<UserOutlined />} />
                </Row>
                <Row style={{ marginTop: "5%" }} />
                <Row>
                  <Col flex={"auto"}>
                    <Card title="Profile" style={{ minWidth: "400px" }}>
                      <p>Name: Lorem ipsum</p>
                      <p>Email: dolor sit amet consectetur</p>
                      <p>Tel: 0999999999</p>
                    </Card>
                  </Col>
                </Row>
              </Col>

              <Col flex={"auto"} style={{ width: "50%" }}>
                <Tabs defaultActiveKey="1" items={ProgressSumPage} />
              </Col>
            </Row>
          </Card>
        </Col>
        {/* <Col sm={2} /> */}

      </Row>
    </Layout>
  );
};

export default TeacherHome;