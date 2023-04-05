import React from "react";
import Room from "./Room";
import Plant from "./Plant";
import Redirect from "./Redirect";
import { Card, Space } from "antd";

const AdminHomePage = () => {
  return (
    <div>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Redirect />
        <Plant />
        <Room/>
      </Space>
    </div>
  );
};

export default AdminHomePage;
