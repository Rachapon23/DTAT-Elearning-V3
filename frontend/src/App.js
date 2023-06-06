import { Link, Route, Routes } from "react-router-dom";

import ExamCreate from "./components/WebPages/TeacherPages/TeacherExam/ExamCreate";
import Home from "./components/WebPages/HomePage/Home/Home";
import StudentHomePage from "./components/WebPages/StudentPage/StudentHome/StudentHomePage";
import AdminPage from "./components/WebPages/AdminPage/AdminPage"
import TeacherPage from "./components/WebPages/TeacherPages/TeacherPage";

//test page
import CourseMain from "./components/WebPages/TeacherPages/TeacherCourse/CourseOld/CourseMain";
import Course from "./components/WebPages/TeacherPages/TeacherCourse/CourseManage/Course";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/student/home" element={<StudentHomePage/>} />


        <Route path="/teacher/page/:params" element={<TeacherPage/>} />
        <Route path="/teacher/page/:params/:id" element={<TeacherPage/>} />
        <Route path="/teacher/course/:course_id" element={<Course/>} />
        <Route path="/admin/page/:params" element={<AdminPage/>} />
       
        <Route path="/teacher/exams/create" element={<ExamCreate/>} />
      </Routes>
    </div>
  );
}

export default App;
