import React from "react";
import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";

// fucntion : GET
import { getCourse } from "../../../../../function/Teacher/course";
import { listTopicCourse } from "../../../../../function/Teacher/course_topic";
// function : POST
import { createTopic } from "../../../../../function/Teacher/course_topic";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { course_id } = useParams();

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    detail: "",
    type: true,
    image: "",
  });

  const [timeAndroom, setTimeAndRoom] = useState({
    room_id: "",
    start: "",
    end: "",
    color: "",
  });

  const [courseData, setCourseData] = useState({});

  const loadDataCourse = () => {
    getCourse(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        setCourseData(res.data);
        if (
          res.data.name != undefined &&
          res.data.detail != undefined &&
          res.data.type != undefined
        ) {
          setCourseInfo({
            name: res.data.name,
            detail: res.data.detail,
            type: res.data.type,
          });
        }
        if (res.data.room != undefined && res.data.calendar != undefined) {
          setTimeAndRoom({
            room_id: res.data.room._id,
            start: res.data.calendar.start,
            end: res.data.calendar.end,
            color: res.data.calendar.color,
          });
        }
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
        //  console.log(res.data)
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
        // setConditionData(res.data);
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
  }, []);

  return (
    <CourseContext.Provider
      value={{
        course_id,
        courseInfo,
        setCourseInfo,
        courseData,
        setCourseData,
        timeAndroom,
        setTimeAndRoom,
        CreateContent,
        topicData,
        loadTopic,
        setTopicData,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
