import { Link, Route, Routes, useNavigate } from "react-router-dom";

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

function App() {
  const navigate = useNavigate()
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
