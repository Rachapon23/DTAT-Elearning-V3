import React, { useEffect, useState } from "react";
import "./studenthome.css";
import { Button, Image, Table } from "antd";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";
import CalendarDisplay from "../../CalendarPage/CalendarDisplay";

import DoExam from "../StudentExam/DoExam";

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { listActivity, listCourse } from "../../../../function/Student/course";
import { Link, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const StudentHomePage = () => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  const handleNavigate = (navStr, dataStage) => {
    navigate(navStr, { state: dataStage})
  }

  const columns = [
    {
      title: "Image",
      align: "center",
      render: (data) => {
        return (
          <Image
            width={150}
            src={process.env.REACT_APP_IMG + data?.course?.image?.url}
          />
        )
      }
    },
    {
      title: `course`,
      render: (data) => data?.course?.name
    },

    {
      title: `score`,
      align: "center",
      render: (data) => data?.score_value ? data?.score_value : "waiting for test"
    },

    {
      title: `max score`,
      align: "center",
      render: (data) => data?.score_max ? data?.score_max : "waiting for test"
    },

    {
      title: `result`,
      align: "center",
      dataIndex: "result",
    },
    {
      title: `Action`,
      align: "center",
      render: (data) => {
        // console.log(data?.course?._id)
        return (
          <Link to={`/student/page/course/${data?.course?._id}`} state={{ mode: "Preview", exam_name: data?.name }}><Button onClick={null}> Course </Button></Link>
        )
      }
    },
    {
      title: `Action`,
      align: "center",
      render: (data) => {
        console.log(data?.course?.exam)
        return (
          <Button
            disabled={!data?.course?.exam}
            onClick={() => handleNavigate(`/student/page/exam/${data?.course?.exam}`, { activity: data?._id})}
          >
            Exam
          </Button>

        )
      }
    },


  ];

  const fetchActivity = async () => {
    // do not forget to add pops allowed field in activity backend
    await listActivity(sessionStorage.getItem("token"), `?search=user:6422ad02848f4c2a4831e2fe&fetch=-ans,-__v&pops=path:course$select:name exam image`)
      .then(
        (res) => {
          const data = res.data.data
          setCourses(data)
          console.log(data)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )
  }

  useEffect(() => {
    fetchActivity()
  }, [])

  return (
    <div className="bg-st-home">
      <NavBarHome />
      <div className="content-home">
        <div className="">
          <p className="label-home-st" htmlFor="">My Course</p>
          <Table
            columns={columns}
            dataSource={courses}
            className="table-student"
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
        </div>
        <div className="">
          <p htmlFor="" className="label-home-st">My History</p>
          <Table
            columns={columns}
            // dataSource={history}
            className="table-student"
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
        </div>
        <div className="">
          <p htmlFor="" className="label-home-st">Calendar</p>
          <CalendarDisplay />
        </div>

        <div>
          <DoExam />
        </div>


      </div>

    </div>
  );
};

export default StudentHomePage;
