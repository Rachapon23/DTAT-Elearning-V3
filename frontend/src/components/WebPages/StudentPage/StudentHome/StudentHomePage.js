import React, { useEffect, useState } from "react";
import "./studenthome.css";
import { Button, Table } from "antd";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";
import CalendarDisplay from "../../CalendarPage/CalendarDisplay";

import StudentExam from "../StudentExam/StudentExam";

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { listCourse } from "../../../../function/Student/course";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const StudentHomePage = () => {
  const [courses, setCourses] = useState([])

  const columns = [
    {
      title: "No",
      align: "center",
      dataIndex: "_id"
    },
    {
      title: `course`,
      align: "center",
      dataIndex: "name",
    },

    {
      title: `score`,
      align: "center",
      dataIndex: "score",
    },

    {
      title: `max score`,
      align: "center",
      dataIndex: "maxscore",
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
        // console.log(data)
        return (
          <Link to={`/student/page/exam/${data?.exam}`} state={{mode: "Preview", exam_name: data?.name}}><Button onClick={null}> Exam </Button></Link>
        )
      }
    },


  ];

  const fetchCourse = async () => {
    await listCourse(sessionStorage.getItem("token"))
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
    fetchCourse()
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
          <StudentExam></StudentExam>
        </div>


      </div>

    </div>
  );
};

export default StudentHomePage;
