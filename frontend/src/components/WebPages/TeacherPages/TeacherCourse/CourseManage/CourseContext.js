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
        const data = res.data.data
        setCourseData(data);


        if (
          data.name != undefined &&
          data.detail != undefined &&
          data.type != undefined
        ) {

          setCourseInfo({
            name: data.name,
            detail: data.detail,
            type: data.type,
          });

          
        }
        if (data.room != undefined && data.calendar != undefined) {
          setTimeAndRoom({
            room_id: data.room._id,
            start: data.calendar.start,
            end: data.calendar.end,
            color: data.calendar.color,
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
        console.log("CreateContent: ", res.data)
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
        console.log("loadTopic: ", res.data)
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
