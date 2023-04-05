import React from "react";
import "./studenthome.css";
import { Table } from "antd";
import NavBarHome from "../../../Layout/navBarHomee/NavBarHome";
import CalendarDisplay from "../../CalendarPage/CalendarDisplay";

import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

const StudentHomePage = () => {
    const columns = [
        {
          title: "No",
          align: "center",
          dataIndex: "_id"
        },
        {
          title: `course`,
          align: "center",
          dataIndex: "course",
        },
    
        {
          title: `score`,
          align: "center",
          dataIndex: "score",
        },
    
        {
          title: `max score`,
          align: "center",
          dataIndex: "maxscore",
        },
    
        {
          title: `result`,
          align: "center",
          dataIndex: "result",
        },
    
       
      ];


  return (
    <div className="bg-st-home">
      <NavBarHome />
      <div className="content-home">
        <div className="">
        <p className="label-home-st" htmlFor="">My Course</p>
          <Table
                columns={columns}
                // dataSource={history}
               className="table-student"
                pagination={{
                  defaultPageSize: 20,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
              />            
        </div>
        <div className="">
            <p htmlFor="" className="label-home-st">My History</p>
      <Table
                columns={columns}
                // dataSource={history}
               className="table-student"
                pagination={{
                  defaultPageSize: 20,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
              />            
        </div>
        <div className="">
            <p htmlFor="" className="label-home-st">Calendar</p>
   <CalendarDisplay/>           
        </div>


      </div>
    
    </div>
  );
};

export default StudentHomePage;
