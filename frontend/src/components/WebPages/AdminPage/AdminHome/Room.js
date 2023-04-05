import React from "react";
import "./adminhome.css";
import { Button, Input, Select, Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;
const Room = () => {
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
    <Space
    direction="vertical"
    size="middle"
    style={{
      display: "flex",
    }}
    >

      <Space.Compact
        style={{
          width: "100%",
        }}
        className="plant"
      >
        <Input
          placeholder="Add Plant"
          style={{
            width: "100%",
          }}
        />
        <Button type="primary">Submit</Button>
      </Space.Compact>
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
    </Space>
  );
};

export default Room