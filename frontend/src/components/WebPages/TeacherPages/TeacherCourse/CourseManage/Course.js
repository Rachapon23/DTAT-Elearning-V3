import React from "react";
import { CourseProvider } from "./CourseContext";
import Course_main from "./Course_main";
const Course = () => {
  return (
    <CourseProvider>
      <Course_main />
    </CourseProvider>
  );
};

export default Course;
