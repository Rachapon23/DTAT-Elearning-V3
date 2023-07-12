import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Menu, Row, theme, Avatar, Divider, Tooltip, Progress, Tabs, Button, Pagination, Input, Typography, Descriptions, Empty } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Column, Pie } from '@ant-design/plots';
import { Link, useNavigate } from 'react-router-dom';
import "../teach.css"
import { TeacherHomeContext } from './TeacherHomeContext';
import TeacherHomeProfile from './TeacherHomeProfile';

const { Title } = Typography;

const TeacherHome = () => {
  // Variable-Start
  const [current, setCurrent] = useState(1);
  let courseAmount = 32;
  let pageSize = 5
  const [keyword, setKeyword] = useState("");


  const { course, setCourse } = useContext(TeacherHomeContext)
  const { graphData } = useContext(TeacherHomeContext)
  const { profile } = useContext(TeacherHomeContext)

  const [actionMode, setActionMode] = useState("Preview")
  const [dataMode, setDataMode] = useState("Overview")
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(-1)

  const config = {
    appendPadding: 0,
    data: graphData?.totalStudent ? graphData?.totalStudent : [],//[{ name: "HI", maximum: 10 }, { name: "HIT", maximum: 10 }],//,
    angleField: 'current',
    colorField: 'name',
    radius: 0.5,
    label: {
      type: 'outer',
      content: (data) => data.current
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    legend: {
      position: 'bottom',
      offsetY: -50
    },
  };


  const onChange = (page) => {
    setCurrent(page);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value.toLowerCase())
    setCurrent(1)
  }

  const getArrayLength = (array) => {
    courseAmount = array.length
    return array
  }

  const courseProgressCard = (course, index, last_index) => {
    return (
      <div>
        {
          <Row style={{ paddingTop: "3.5%" }}>

            <Col flex={"auto"}>

              <Row justify={"space-between"}>
                <Col>
                  {/* {JSON.stringify(course)} */}
                  {`${course.name}`}
                </Col>
                <Col style={{ marginRight: "2.5%" }}>
                  {course.current} / {course.maximum}
                </Col>
              </Row>

              <Row>
                <Col flex={"auto"} style={{ marginRight: "1%", display: "flex", alignSelf: "center" }}>
                  <Tooltip title={`${course.current} / ${course.maximum}`}>
                    <Progress percent={Math.round(course.current * 100 / course.maximum * 100) / 100} />
                  </Tooltip>
                </Col>
              </Row>

            </Col>

            <Col style={{ display: "flex", alignSelf: "center" }}>
              <Button
                onClick={
                  () => {
                    setSelectedCourseIndex(graphData?.totalStudent.indexOf(course))
                    setDataMode("Detail")
                  }
                }
              >
                More
              </Button>
            </Col>

          </Row>
        }
      </div>
    )
  }

  const courseProgress = () => {
    if (keyword === "" && graphData?.totalStudent) {
      return (
        graphData?.totalStudent.slice(pageSize * (current - 1), (pageSize * (current - 1)) + pageSize).map((key, index) => (
          courseProgressCard(key, index, courseAmount)
        ))
      )
    }
    else if (graphData?.totalStudent) {
      return (
        getArrayLength(
          graphData?.totalStudent
            .filter((item) => {
              return item.name.toLowerCase().indexOf(keyword) >= 0;
            })
        )
          .slice(pageSize * (current - 1), (pageSize * (current - 1)) + pageSize)
          .map((key, index) => {
            return courseProgressCard(key, index, courseAmount)
          })
      )
    }
  }


  const detailedProgress = () => {
    return (
      <Row align={"top"} justify={"center"}>
        <Col flex={"auto"}>
          <Card title={renderCourseProcessTitle()} >
            <Row justify={"center"} align={"middle"}>
              <Col flex={"auto"}>
                {
                  graphData ?
                    (
                      dataMode === "Overview" ?
                        (
                          <>
                            <Row>
                              <Col flex={"auto"} >{courseProgress()}</Col>
                            </Row>
                            <Row justify={"center"} align={"middle"}>
                              <Col>
                                <Pagination current={current} onChange={onChange} total={graphData.length} pageSize={pageSize} />
                              </Col>
                            </Row>
                          </>
                        )
                        :
                        (
                          dataMode === "Detail" ?
                            (
                              <Row style={{ paddingTop: "3.5%" }}>
                                <Col flex={"auto"}>

                                  <Row justify={"space-between"}>
                                    <Col>
                                      {`${graphData?.totalStudent[selectedCourseIndex].name}`}
                                    </Col>
                                    <Col style={{ marginRight: "2.5%" }}>
                                      {graphData?.totalStudent[selectedCourseIndex].current} / {graphData?.totalStudent[selectedCourseIndex].maximum}
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col flex={"auto"} style={{ marginRight: "1%", display: "flex", alignSelf: "center" }}>
                                      <Tooltip title={`${graphData?.totalStudent[selectedCourseIndex].current} / ${graphData?.totalStudent[selectedCourseIndex].maximum}`}>
                                        <Progress percent={Math.round(graphData?.totalStudent[selectedCourseIndex].current * 100 / graphData?.totalStudent[selectedCourseIndex].maximum * 100) / 100} />
                                      </Tooltip>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <Pie
                                        appendPadding={10}
                                        data={[
                                          { name: "Completed", current: graphData?.totalStudent[selectedCourseIndex].current },
                                          { name: "Not Completed", current: graphData?.totalStudent[selectedCourseIndex].maximum - graphData?.totalStudent[selectedCourseIndex].current }
                                        ]}
                                        angleField='current'
                                        colorField='name'
                                        radius={0.8}
                                        label={{
                                          type: 'outer',
                                        }}
                                        interactions={[
                                          {
                                            type: 'element-active',
                                          },
                                        ]}
                                        legend={{
                                          position: 'left'
                                        }}
                                      />
                                    </Col>
                                    <Col flex={"auto"} style={{ marginRight: "1.8%" }}>
                                      {
                                        graphData?.totalStudent[selectedCourseIndex].plant.map((item, index) => (
                                          <Row style={{ paddingBottom: "1%", paddingTop: "1.5%" }}>
                                            <Col flex={"auto"}>
                                              <Row>
                                                <Col flex={"auto"}>
                                                  {item}
                                                </Col>
                                                <Col >
                                                  {`${graphData?.totalStudent[selectedCourseIndex].plant_current[index]} / ${graphData?.totalStudent[selectedCourseIndex].plant_amount[index]}`}
                                                </Col>
                                              </Row>
                                              {console.log(graphData?.totalStudent[selectedCourseIndex].plant_current[index], graphData?.totalStudent[selectedCourseIndex].plant_amount[index])}
                                              < Progress percent={Math.round((graphData?.totalStudent ? graphData?.totalStudent[selectedCourseIndex].plant_current[index] : 0) * 100 / graphData?.totalStudent[selectedCourseIndex].plant_amount[index] * 100) / 100} />
                                            </Col>
                                          </Row>
                                        ))
                                      }

                                    </Col>

                                  </Row>
                                </Col>
                              </Row>
                            )
                            :
                            (null)
                        )
                    )
                    :
                    (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )
                }
              </Col>
            </Row>
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
          {
            dataMode === "Overview" ?
              (
                <Input placeholder="Search course" prefix={<SearchOutlined />} onChange={handleSearch} />
              )
              : (
                dataMode === "Detail" ?
                  (
                    <Button
                      onClick={
                        () => {
                          setKeyword("")
                          setDataMode("Overview")
                        }
                      }
                    >
                      Back
                    </Button>
                  )
                  :
                  (null)
              )
          }
        </Col>
      </Row>
    )
  }

  const overviewProgress = () => {
    return (
      <Row align={"top"}>
        <Col flex={"auto"}>
          <Card title={
            <Row justify={'space-between'} align={'middle'}>
              <Col>
                <Title level={5} style={{ marginTop: "10px" }}>
                  Main Target Number of All Trainee
                </Title>
              </Col>
            </Row>
          }>
            <Col flex={"auto"}>
              <Row>
                <Col flex={"auto"}>

                  <p>
                    <Row justify={"space-between"}>
                      <Col>
                        Target
                      </Col>
                      <Col>
                        {graphData?.totalStudent ? graphData.totalStudent.map((data) => data.current).reduce((prev, curr) => prev + curr, 0) : 0} / {profile.target}
                      </Col>
                    </Row>
                    <Row justify={"space-between"}>
                      <Col flex={"auto"}>
                        <Tooltip title={`${graphData?.totalStudent ? graphData?.totalStudent.map((data) => data.current).reduce((prev, curr) => prev + curr, 0) : 0} / ${profile.target}`}>
                          {/* graphData.map((data) => data.maximum).reduce((prev, curr) => prev + curr, 0) */}
                          <Progress percent={Math.round((graphData?.totalStudent ? graphData.totalStudent.map((data) => data.current).reduce((prev, curr) => prev + curr, 0) : 0) * 100 / profile.target * 100) / 100} />
                        </Tooltip>
                      </Col>
                    </Row>
                  </p>

                  <p>
                    <Row justify={"space-between"}>
                      <Col>
                        Total
                      </Col>
                      <Col>
                        {graphData?.totalStudent ? graphData?.totalStudent.map((data) => data.current).reduce((prev, curr) => prev + curr, 0) : 0} / {graphData?.totalStudent ? graphData?.totalStudent.map((data) => data.maximum).reduce((prev, curr) => prev + curr, 0) : 0}
                      </Col>
                    </Row>
                    <Row justify={"space-between"}>
                      <Col flex={"auto"}>
                        <Tooltip title={`${graphData?.totalStudent ? graphData?.totalStudent.map((data) => data.current).reduce((prev, curr) => prev + curr, 0) : 0} / ${graphData?.totalStudent ? graphData?.totalStudent.map((data) => data.maximum).reduce((prev, curr) => prev + curr, 0) : 0}`}>
                          <Progress percent={Math.round(graphData?.totalStudent ? graphData?.totalStudent.map((data) => data.current).reduce((prev, curr) => prev + curr, 0) * 100 / graphData?.totalStudent.map((data) => data.maximum).reduce((prev, curr) => prev + curr, 0) * 100 : 0) / 100} />
                        </Tooltip>
                      </Col>
                    </Row>
                  </p>

                </Col>
              </Row>
              <Row align={"middle"} justify={"center"} style={{ marginTop: "-9.5%", marginBottom: "-60px" }}>

                <Col display={"flex"}>
                  <Pie {...config} />
                </Col>

                <Col flex="auto">
                  {
                    graphData?.plant && Object.keys(graphData?.plant).map((course, index) => {
                      if (course) {
                        return (
                          <p>
                            <Row justify={"space-between"}>
                              <Col >
                                {
                                  course
                                }
                              </Col>
                              <Col style={{ marginRight: "2.5%", paddingLeft: "1%" }}>
                                {
                                  `
                                  ${graphData?.plant && Object.keys(graphData?.plant).map(
                                    (item) => {
                                      if (course === item) {
                                        return (graphData?.plant[item].plant_current)
                                      }
                                      return 0
                                    }).reduce((prev, curr) => prev + curr, 0)
                                  } 
                                  /
                                  ${graphData?.plant && Object.keys(graphData?.plant).map(
                                    (item) => {
                                      if (course === item) {
                                        return (graphData?.plant[item].plant_amount)
                                      }
                                      return 0
                                    }).reduce((prev, curr) => prev + curr, 0)
                                  }
                                `
                                }
                              </Col>
                              <Tooltip
                                title={
                                  `${graphData?.plant[course].plant_current} / ${graphData?.plant[course].plant_amount}`
                                }
                              >
                                <Progress
                                  percent={
                                    Math.round(
                                      (graphData?.plant[course].plant_current * 100 / graphData?.plant[course].plant_amount) * 100
                                    ) / 100
                                  }
                                />
                              </Tooltip>
                            </Row>
                          </p>
                        )
                      }
                      return null
                    })
                  }
                  {/* <Row style={{ paddingTop: "10%", display: "flex", justifyContent: "space-between", }}>
                    <Col>
                      Regional Plant
                    </Col>
                    <Col style={{ marginRight: "2.5%", paddingLeft: "1%" }}>
                      350 / 500
                    </Col>
                    <Tooltip title="350 / 500">
                      <Progress percent={70} />
                    </Tooltip>
                  </Row> */}
                </Col>
              </Row>

            </Col>
          </Card>
        </Col>
      </Row>
    )
  }


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


  return (
    <Layout className="layout-content-card">
      <Row>
        {/* <Col sm={2} /> */}
        <Col flex="auto">
          <Card title="Home" className="card-shadow">
            <Row justify={"space-between"} >

              <Col flex={"auto"} style={{ paddingRight: "1.5%", width: "25%" }}>
                <Row style={{ marginTop: "2%" }} />
                <TeacherHomeProfile actionMode={actionMode} setActionMode={setActionMode} />
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