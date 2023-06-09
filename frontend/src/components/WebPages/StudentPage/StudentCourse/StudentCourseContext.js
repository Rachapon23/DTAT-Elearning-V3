import React, { createContext, useEffect, useState } from "react";
import { listCourse } from "../../../../function/Student/course";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const fetchCourse = async () => {
    await listCourse(
      sessionStorage.getItem("token"),
      `?selects=name,detail,image,type`
    )
      .then((res) => {
        const data = res.data.data;
        setCourses(data);
        // console.log("student context", data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        courses,
        setCourses,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
