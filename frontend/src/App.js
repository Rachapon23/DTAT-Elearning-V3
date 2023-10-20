import { Link, Route, Routes, useBeforeUnload, useNavigate } from "react-router-dom";

import ExamCreate from "./components/WebPages/TeacherPages/TeacherExam/ExamCreate";
import Home from "./components/WebPages/HomePage/Home";
import StudentPage from "./components/WebPages/StudentPage/StudentPage";
import AdminPage from "./components/WebPages/AdminPage/AdminPage"
import TeacherPage from "./components/WebPages/TeacherPages/TeacherPage";

//test page
// import CourseMain from "./components/WebPages/TeacherPages/TeacherCourse/CourseOld/CourseMain";
import Course from "./components/WebPages/TeacherPages/TeacherCourse/CourseManage/Course";
import DevNav from "./components/common/Dev/DevNav";
import StudentRoute from "./components/common/ProtectedRoute/StudentRoute";
import AdminRoute from "./components/common/ProtectedRoute/AdminRoute";
import TeacherRoute from "./components/common/ProtectedRoute/TeacherRoute";
import Contact from "./components/WebPages/HomePage/Contact";
import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(null)
  // const [timeSite, setTimeSite] = useState(null)
  window.onload = () => {
    const now = new Date()
    const currentTime = now.toTimeString().split(" ")[0] 
    setTime(currentTime)
    localStorage.setItem("start-time", now.getTime())
  }

  window.onbeforeunload = () => {
    const now = new Date()
    const start = new Date(Number(localStorage.getItem("start-time")))
    const diff = now - start 
    const diffH = Math.abs(Number(now.getHours()) - Number(start.getHours()))
    const diffM = Math.abs(Number(now.getMinutes()) - Number(start.getMinutes()))
    const diffS = Math.abs(Number(now.getSeconds()) - Number(start.getSeconds()))

    const timeusage = {
      number: diff,
      string: `${diffH}:${diffM}:${diffS}` // <- calculate time now is not correct
    }
    
    localStorage.setItem("t1",  diff)
    localStorage.setItem("t2", start.getSeconds())
    localStorage.setItem("time-usage", `${diffH}:${diffM}:${diffS}`)
  }

  // useBeforeUnload(() => {
  //   localStorage.setItem("time-usage", time)
  // }, [])
  
  // useEffect(() => {
  //   const onBeforeUnload = (ev) => {
  //     localStorage.removeItem("message");
  //   };
  //   window.addEventListener("beforeunload", onBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", onBeforeUnload);
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="*" element={<>404 Not Found...</>} />
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<Contact />} />

        <Route element={<StudentRoute />}>
          {/* <Route path="*" element={<>404 Not Found</>} /> */}
          <Route path="/student/page/:params" element={<StudentPage />} />
          <Route path="/student/page/:params/:id" element={<StudentPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/page/:params" element={<AdminPage />} />
          {/* <Route path="/teacher/courses" element={<Courses/>} /> */}
          {/* <Route path="/teacher/exams" element={<Exames/>} /> */}
          {/* <Route path="/teacher/calendar" element={<Calendar/>} /> */}
          {/* <Route path="/teacher/courses/create" element={<CourseCreate/>} /> */}
        </Route>

        <Route element={<TeacherRoute />}>
          <Route path="/teacher/page/:params" element={<TeacherPage />} />
          <Route path="/teacher/page/:params/:id" element={<TeacherPage />} />
          <Route path="/teacher/course/:course_id" element={<Course />} />
          <Route path="/teacher/exams/create" element={<ExamCreate />} />
        </Route>
      </Routes>


      <DevNav />

    </div>
  );
}

export default App;
