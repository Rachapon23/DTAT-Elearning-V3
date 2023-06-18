import React, { useEffect, useState } from "react";
import "./studenthome.css";
import { Button, Card, Image, Table, Tabs, Typography } from "antd";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";
import Calendar from "../StudentCalendar/Calendar";

import DoExam from "../StudentExam/DoExam";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { listActivity, listCourse } from "../../../../function/Student/course";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getExam } from "../../../../function/Teacher/exam";
import BrowseCourse from "./BrowesCourse"

const { Text } = Typography
const { Header, Content, Footer } = Layout;
const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png";

const StudentHomePage = () => {
  const location = useLocation()
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedTab] = useState(location?.state?.tabIndex ? location.state.tabIndex : 0)

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
                    data?.course?.image?.url
                      ? process.env.REACT_APP_IMG + data?.course?.image?.url
                      : DEFAULT_IMAGE
                  }
                />
              );
            },
          },
          {
            title: `course`,
            render: (data) => data?.course?.name,
          },

          {
            title: `score`,
            align: "center",
            render: (data) => {
              if (!data?.score_value && data?.result === 0)
                return "waiting for test";
              if (!data?.score_value && data?.result !== 0)
                return "No examination";
              return data?.score_value;
            },
          },

          {
            title: `max score`,
            align: "center",
            render: (data) => {
              if (!data?.score_max && data?.result === 0)
                return "waiting for test";
              if (!data?.score_max && data?.result !== 0)
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
                  state={{ mode: "Preview", exam_name: data?.name }}
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
              enable = enable || data?.course?.exam
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
                    data?.course?.image?.url
                      ? process.env.REACT_APP_IMG + data?.course?.image?.url
                      : DEFAULT_IMAGE
                  }
                />
              );
            },
          },
          {
            title: `course`,
            render: (data) => data?.course?.name,
          },

          {
            title: `score`,
            align: "center",
            render: (data) => {
              if (!data?.score_value && data?.result === 0)
                return "waiting for test";
              if (!data?.score_value && data?.result !== 0)
                return "No examination";
              return data?.score_value;
            },
          },

          {
            title: `max score`,
            align: "center",
            render: (data) => {
              if (!data?.score_max && data?.result === 0)
                return "waiting for test";
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
                  state={{ mode: "Preview", exam_name: data?.name }}
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

  const handleChangeTab = (e) => {
    console.log("this -> ", e)
  }


  const tabContent = (tab) => {
    switch (tab) {
      case 0: return (
        <div className="">
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
        <div className="">

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

  const tabList = [
    {
      key: '1',
      label: (
        <a className="label-home-st" htmlFor="">
          My Course
        </a>
      ),
      children: tabContent(0),
    },
    {
      key: '2',
      label: (
        <a htmlFor="" className="label-home-st">
          My History
        </a>
      ),
      children: tabContent(1),
    },
    {
      key: '3',
      label: (
        <a htmlFor="" className="label-home-st">
          Calendar
        </a>
      ),
      children: tabContent(2),
    },
    {
      key: '4',
      label: (
        <a htmlFor="" className="label-home-st">
          Browse Courses
        </a>
      ),
      children: tabContent(3),
    }
  ]

  const getExamStatus = async (index) => {
    let enable = false
    await getExam(sessionStorage.getItem("token"), courses[index].course.exam, `?check=enable`)
      .then(
        (res) => {
          const data = res.data.data;
          enable = data
          console.log("enable: ", data);
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
      sessionStorage.getItem("token"), `?search=user:${sessionStorage.getItem("user_id")}&fetch=-ans,-__v&pops=path:course$select:name exam image`
    )
      .then(
        (res) => {
          const data = res.data.data;
          setCourses(data);
          console.log(data);
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
  }, []);

  return (
    <div className="bg-st-course">
      <NavBarHome />
      <div className="content-home">
        <Tabs
          defaultActiveKey={`${selectedTab}`}
          items={tabList}
        />
      </div>
    </div>
  );
};

export default StudentHomePage;
