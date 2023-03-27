import { Link, Route, Routes } from "react-router-dom";
import TeacherHome from "./components/WebPages/TeacherPages/TeacherHome/TeacherHome";
import Courses from './components/WebPages/TeacherPages/TeacherCourse/Courses';
import Exames from "./components/WebPages/TeacherPages/TeacherExam/Exames";
import CourseCreate from "./components/WebPages/TeacherPages/TeacherCourse/CourseCreate";
import ExamCreate from "./components/WebPages/TeacherPages/TeacherExam/ExamCreate";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div> MAIN WEB PAGE <Link to="/teacher/home"> teacher </Link></div>} />
        <Route path="/teacher/home" element={<TeacherHome/>} />
        <Route path="/teacher/courses" element={<Courses/>} />
        <Route path="/teacher/exams" element={<Exames/>} />
        {/* <Route path="/teacher/calendar" element={<Calendar/>} /> */}
        <Route path="/teacher/courses/create" element={<CourseCreate/>} />
        <Route path="/teacher/exams/create" element={<ExamCreate/>} />
      </Routes>
    </div>
  );
}

export default App;
