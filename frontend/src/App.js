import { Link, Route, Routes } from "react-router-dom";
// import TeacherHome from "./components/WebPages/TeacherPages/TeacherHome/TeacherHome";
// import Courses from './components/WebPages/TeacherPages/TeacherCourse/Courses';
// import Exames from "./components/WebPages/TeacherPages/TeacherExam/Exames";
import CourseCreate from "./components/WebPages/TeacherPages/TeacherCourse/CourseCreate";
import ExamCreate from "./components/WebPages/TeacherPages/TeacherExam/ExamCreate";
import Home from "./components/WebPages/HomePage/Home/Home";
import StudentHomePage from "./components/WebPages/StudentPage/StudentHome/StudentHomePage";

import TeacherPage from "./components/WebPages/TeacherPages/TeacherPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/student/home" element={<StudentHomePage/>} />


        <Route path="/teacher/page/:params" element={<TeacherPage/>} />
        {/* <Route path="/teacher/courses" element={<Courses/>} /> */}
        {/* <Route path="/teacher/exams" element={<Exames/>} /> */}
        {/* <Route path="/teacher/calendar" element={<Calendar/>} /> */}
        <Route path="/teacher/courses/create" element={<CourseCreate/>} />
        <Route path="/teacher/exams/create" element={<ExamCreate/>} />
      </Routes>
    </div>
  );
}

export default App;
