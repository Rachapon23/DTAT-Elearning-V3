import React from "react";
import "./adminhome.css";
import { Button, Input, Select, Table, Typography, Breadcrumb } from "antd";
const { Title } = Typography;

const AdminManageStudent = () => {
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
    <div>
              <Breadcrumb
        separator={
          <Title level={5} style={{ marginTop: "10px" }}>
            {" "}
            {">"}{" "}
          </Title>
        }
        items={[
          {
            title: (
              <Title level={5} style={{ marginTop: "10px" }}>
                <p>Manage Student</p>
              </Title>
            ),
            key: "managestudent",
          },
        ]}
      />
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
  )
}

export default AdminManageStudent