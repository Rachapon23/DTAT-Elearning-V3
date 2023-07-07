import React, { createContext, useEffect, useState } from "react";
import { getHome } from "../../../function/func.js";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [home, setHome] = useState(
    null |
      {
        announce: [],
        course_public: [],
        course_private: [],
      }
  );
  const [announce, setAnnounce] = useState([]);
  const [coursePublic, setCoursePublic] = useState([]);
  const [coursePrivate, setCoursePrivate] = useState([]);

  const fetchHome = async () => {
    await getHome()
      .then((res) => {
        const data = res.data.data;
        setHome(data);
        // console.log(data)
        setAnnounce(() => data.announce);
        setCoursePublic(() => data.course_public);
        setCoursePrivate(() => data.course_private);
        // console.log(data.announce)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchHome();
    // console.log(coursePrivate)
  }, []);

  return (
    <HomeContext.Provider
      value={{
        home,
        setHome,
        announce,
        setAnnounce,
        coursePublic,
        setCoursePublic,
        coursePrivate,
        setCoursePrivate,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
