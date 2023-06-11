import React from "react";
import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";

// fucntion : GET
import { getCourse } from "../../../../../function/Teacher/course";
import { listCalendar } from "../../../../../function/Teacher/calendar";
import { listTopicCourse } from "../../../../../function/Teacher/course_topic";
// function : POST
import { createTopic } from "../../../../../function/Teacher/course_topic";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { course_id } = useParams();
  const [courseData, setCourseData] = useState({});
  const [even, setEven] = useState([]);

  const loadDataCourse = () => {
    getCourse(sessionStorage.getItem("token"), course_id, `?field=calendar`)
      .then((res) => {
        const data = res.data.data;
        setCourseData(data);
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const loadCalendar = () => {
    listCalendar(sessionStorage.getItem("token"))
      .then((res) => {
        setEven(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const [topicData, setTopicData] = useState([]);
  const CreateContent = () => {
    createTopic(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        console.log("CreateContent: ", res.data);
        loadTopic();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const loadTopic = () => {
    listTopicCourse(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        setTopicData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for load data
  useEffect(() => {
    loadDataCourse();
    loadTopic();
    loadCalendar();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        course_id,
        courseData,
        setCourseData,
        CreateContent,
        topicData,
        loadTopic,
        setTopicData,
        loadDataCourse,
        loadCalendar,
        even
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
