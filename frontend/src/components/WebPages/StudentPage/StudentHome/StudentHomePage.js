import React, { useContext, useEffect, useState } from "react";
import "./studenthome.css";
import { Button, Card, Col, Empty, Image, Row, Space, Table, Tabs } from "antd";
import Calendar from "../StudentCalendar/Calendar";
import { listActivity } from "../../../../function/Student/course";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getExam } from "../../../../function/Teacher/exam";
import BrowseCourse from "./BrowesCourse"
import { HomeOutlined, HistoryOutlined, CalendarOutlined, SearchOutlined } from "@ant-design/icons"
import { Grid, TabBar } from 'antd-mobile'
import { ContentOutline } from 'antd-mobile-icons'
import CardContent from "../../../common/ExamCard/CardContent";
import CardCourse from "../../../common/CourseCard/CardCourse";
import { useMediaQuery } from "react-responsive";
import { StudentPageContext } from "../StudentPageContext";


const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const StudentHomePage = () => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const location = useLocation()
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedTab] = useState(location?.state?.tabIndex ? location.state.tabIndex : 0)
  const [changedTabIndex, setChangedTabIndex] = useState(0)

  const {
    currentPage,
    setCurrentPage,
  } = useContext(StudentPageContext);

  const handleNavigate = (navStr, dataStage) => {
    navigate(navStr, { state: dataStage });
  };

  const handleUnloadImage = (e) => {
    e.target.src = DEFAULT_IMAGE;
  };

  const columns = (table) => {
    switch (table) {
      case "Course":
        return [
          {
            title: "Image",
            align: "center",
            width: "20%",
            render: (data) => {
              return (
                <Image
                  preview={false}
                  width={150}
                  onError={handleUnloadImage}
                  src={
                    data?.course?.image?.name
                      ? `${process.env.REACT_APP_IMG}/course/${data?.course?.image?.name}`
                      : DEFAULT_IMAGE
                  }
                />
              );
            },
          },
          {
            title: `Course`,
            render: (data) => data?.course?.name,
          },
          {
            title: `Type`,
            align: "center",
            width: "10%",
            render: (data) => {
              if (data?.course?.type) return "Public"
              return "Private"
              // console.log(data.course.type)
              // return data.course.type
            },
          },
          {
            title: `Score`,
            align: "center",
            width: "10%",
            render: (data) => {
              if (!Number.isInteger(data?.score_value) && data?.result === 0)
                return "Waiting for test";
              if (!Number.isInteger(data?.score_value) && data?.result !== 0)
                return "No examination";
              return data?.score_value;
            },
          },

          {
            title: `Max Score`,
            align: "center",
            width: "10%",
            render: (data) => {
              if (!Number.isInteger(data?.score_max) && data?.result === 0)
                return "Waiting for test";
              if (!Number.isInteger(data?.score_max) && data?.result !== 0)
                return "No examination";
              return data?.score_max;
            },
          },
          {
            title: `Action`,
            align: "center",
            width: "10%",
            render: (data) => {
              // console.log(data?.course?._id)
              return (
                <Link
                  to={`/student/page/course/${data?.course?._id}`}
                  state={{ mode: "Preview", exam_name: data?.name, tabIndex: 1 }}
                >
                  <Button onClick={null}> Course </Button>
                </Link>
              );
            },
          },
          {
            title: `Action`,
            align: "center",
            width: "10%",
            render: (data) => {
              //-----------------------------------------------
              const index = courses.indexOf(data)
              let enable = false
              if (courses[index]?.course?.exam) {
                enable = getExamStatus(courses.indexOf(data))
              }
              enable = (enable || data?.course?.exam) && !data.completed
              //-----------------------------------------------

              return (
                <Button
                  disabled={!enable}//{!data?.course?.exam}
                  onClick={() =>
                    handleNavigate(`/student/page/exam/${data?.course?.exam}`, {
                      activity: data?._id,
                    })
                  }
                >
                  Exam
                </Button>
              );
            },
          },
        ];
      case "History":
        return [
          {
            title: "Image",
            align: "center",
            width: "20%",
            render: (data) => {
              return (
                <Image
                  preview={false}
                  width={150}
                  onError={handleUnloadImage}
                  src={
                    data?.course?.image?.name
                      ? `${process.env.REACT_APP_IMG}/course/${data?.course?.image?.name}`
                      : DEFAULT_IMAGE
                  }
                />
              );
            },
          },
          {
            title: `Course`,
            render: (data) => data?.course?.name,
          },

          {
            title: `Score`,
            align: "center",
            render: (data) => {
              if (!data?.score_value && data?.result === 0)
                return "Waiting for test";
              if (!data?.score_value && data?.result !== 0)
                return "No examination";
              return data?.score_value;
            },
          },

          {
            title: `Max Score`,
            align: "center",
            render: (data) => {
              if (!data?.score_max && data?.result === 0)
                return "Waiting for test";
              if (!data?.score_max && data?.result !== 0)
                return "No examination";
              return data?.score_max;
            },
          },
          {
            title: `Result`,
            align: "center",
            // dataIndex: "result",
            width: "10%",
            render: (data) => {
              if (data?.result === 0) return "Not evaluate";
              if (data?.result === 1) return "Not pass";
              if (data?.result === 2) return "Pass";
            },
          },
          {
            title: `Action`,
            align: "center",
            width: "10%",
            render: (data) => {
              // console.log(data?.course?._id)
              return (
                <Link
                  to={`/student/page/course/${data?.course?._id}`}
                  state={{ mode: "Preview", exam_name: data?.name, tabIndex: 2 }}
                >
                  <Button onClick={null}> Course </Button>
                </Link>
              );
            },
          },
          // {
          //   title: `Action`,
          //   align: "center",
          //   width: "10%",
          //   render: (data) => {
          //     console.log(data?.course?.exam);
          //     return (
          //       <Button
          //         // disabled={!data?.course?.exam}
          //         disabled={true}
          //         onClick={() =>
          //           handleNavigate(`/student/page/exam/${data?.course?.exam}`, {
          //             activity: data?._id,
          //           })
          //         }
          //       >
          //         Exam
          //       </Button>
          //     );
          //   },
          // },
        ];
      default:
        return null;
    }
  };

  const tabContentPc = (tab) => {
    switch (tab) {
      case 0: return (
        <div>
          <Table
            columns={columns("Course")}
            dataSource={courses.filter((item) => item.result === 0)}
            className="table-student"
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
        </div>
      )
      case 1: return (
        <div>
          <Table
            columns={columns("History")}
            dataSource={courses.filter((item) => item.result !== 0)}
            className="table-student"
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
        </div>
      )
      case 2: return (
        <div className="">
          <Calendar />
        </div>
      )
      case 3: return (
        <div className="">
          <BrowseCourse />
        </div>
      )
      default: return null
    }
  }

  const tabListPc = [
    {
      key: '1',
      label: (
        <a className="label-home-st" htmlFor="">
          My Course
        </a>
      ),
      children: tabContentPc(0),
    },
    {
      key: '2',
      label: (
        <a htmlFor="" className="label-home-st">
          My History
        </a>
      ),
      children: tabContentPc(1),
    },
    {
      key: '3',
      label: (
        <a htmlFor="" className="label-home-st">
          Calendar
        </a>
      ),
      children: tabContentPc(2),
    },
    {
      key: '4',
      label: (
        <a htmlFor="" className="label-home-st">
          Browse Courses
        </a>
      ),
      children: tabContentPc(3),
    }
  ]

  const tabContentMobile = (tab) => {

    switch (tab) {
      case 0: return (
        <Row justify={'center'}>
          <Col style={{ width: '5%', }} />
          <Col style={{ width: '90%', }}>
            <Row justify={'center'}>
              {
                courses.filter((item) => item.result === 0).map((mitem) => (
                  <Col style={{ paddingBottom: 10, paddingInline: 5, }} onClick={() => navigate(`/student/page/course/${mitem.course?._id}`)}>
                    <CardCourse
                      data={{
                        _id: mitem.course?._id,
                        name: mitem.course?.name,
                        detail: mitem.course?.type ? "Public" : "Private",
                        image: mitem.course?.image?.name
                          ? `${process.env.REACT_APP_IMG}/course/${mitem?.course?.image?.name}`
                          : DEFAULT_IMAGE,
                      }}
                      width={300}
                    />
                  </Col>
                ))
              }
            </Row>
          </Col>
          <Col style={{ width: '5%', }} />
        </Row>

      )
      case 1: return (
        <div className="">
          <Row justify={'center'}>
            {
              Array.isArray(courses) && courses.filter((item) => item.result !== 0).length !== 0 ?
                (
                  courses.filter((item) => item.result !== 0).map((mitem) => (
                    <Col style={{ paddingBottom: 10 }}>
                      <CardCourse
                        data={{
                          _id: mitem.course?._id,
                          name: mitem.course?.name,
                          detail: mitem.course?.type ? "Public" : "Private",
                          image: mitem.course?.image?.name
                            ? `${process.env.REACT_APP_IMG}/course/${mitem?.course?.image?.name}`
                            : DEFAULT_IMAGE,
                        }}
                        width={300}
                      />
                    </Col>
                  )
                  )
                )
                :
                (
                  <Col >
                    <Card style={{ padding: 100, }}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </Card>
                  </Col>
                )

            }
          </Row>
        </div>
      )
      case 2: return (
        <div className="">
          <Calendar />
        </div>
      )
      case 3: return (
        <div className="">
          <BrowseCourse />
        </div>
      )
      default: return null
    }
  }

  const tabListMobile = [
    {
      key: '1',
      label: <div style={{ paddingTop: 10, fontSize: '120%' }}>My Course</div>,
      icon: (<HomeOutlined />),
      children: tabContentMobile(0),
    },
    {
      key: '2',
      label: <div style={{ paddingTop: 10, fontSize: '120%' }}>My History</div>,
      icon: (<HistoryOutlined />),
      children: tabContentMobile(1),
    },
    {
      key: '3',
      label: <div style={{ paddingTop: 10, fontSize: '120%' }}>Calendar</div>,
      icon: (<CalendarOutlined />),
      children: tabContentMobile(2),
    },
    {
      key: '4',
      label: <div style={{ paddingTop: 10, fontSize: '120%' }}>Browse Courses</div>,
      icon: (<SearchOutlined />),
      children: tabContentMobile(3),
    }
  ]

  const getExamStatus = async (index) => {
    let enable = false
    await getExam(sessionStorage.getItem("token"), courses[index].course.exam, `?check=enable`)
      .then(
        (res) => {
          const data = res.data.data;
          enable = data
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
    return enable
  }

  const fetchActivity = async () => {
    // search=user:${sessionStorage.getItem("user_id")}&
    // do not forget to add pops allowed field in activity backend
    await listActivity(
      sessionStorage.getItem("token"), `?search=user:${sessionStorage.getItem("user_id")}&fetch=-ans,-__v&pops=path:course$select:name exam image type completed`
    )
      .then(
        (res) => {
          const data = res.data.data;
          if (!Array.isArray(data)) return
          setCourses(data.filter((item) => item.course));
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  };

  useEffect(() => {
    fetchActivity();
  }, [changedTabIndex]);

  const updateTabIndex = (index) => {
    console.log("click: ", index)
    setChangedTabIndex(() => index)
    setCurrentPage(index)
  }

  const studentHomePc = () => {
    return (
      <div >
        <div className="content-home">
          <Tabs
            defaultActiveKey={`${currentPage}`}
            onChange={updateTabIndex}
            items={tabListPc}
          />
        </div>
      </div>
    );
  }

  const calculatePage = () => {
    if (currentPage - 1 < 0) return 0
    if (currentPage - 1 === 0) return 1
    return currentPage
  }

  const studentHomeMobile = () => {
    return (
      <div >
        <div >
          <Grid columns={1} >
            <Grid.Item>
              <Grid columns={1}>
                <Row justify={'center'}>
                  {tabListMobile[calculatePage()]?.children}
                </Row>
                {/* <Row style={{ height: '100%' }} /> */}
                <Row justify={'center'} style={{ position: 'fixed', width: '100%', background: 'rgba(255, 255, 255, 1)', zIndex: 1000, bottom: 0, left: 0 }}>
                  <TabBar
                    defaultActiveKey={`${currentPage}`}
                    onChange={updateTabIndex}
                    items={tabListMobile}
                  >
                    {
                      tabListMobile.map((item, index) => (
                        <TabBar.Item style={{ paddingLeft: 23 }} key={index} icon={item.icon} title={item.label} />
                      ))
                    }
                  </TabBar>
                </Row>
              </Grid>
            </Grid.Item>
          </Grid>
        </div>
      </div>
    )
  }

  const renderStudentHome = () => {
    if (isDesktopOrLaptop) {
      return studentHomePc()
    }
    if (isTabletOrMobile) {
      return studentHomeMobile()
    }
  }

  return renderStudentHome()


};

export default StudentHomePage;
