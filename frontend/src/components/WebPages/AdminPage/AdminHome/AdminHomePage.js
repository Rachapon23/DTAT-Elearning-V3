import React from "react";
import Room from "./Room";
import Plant from "./Plant";
import Redirect from "./Redirect";
import { Card, Space, Tabs } from "antd";
import Department from "./Department";

import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';

const AdminHomePage = () => {

  const tabContent = (tab) => {
    switch (tab) {
      case 0: return <Plant key={"Plant"} />
      case 1: return <Room key={"Room"} />
      case 2: return <Department key={"Department"} />
      default: return null
    }
  }

  const tabList = [
    {
      key: '1',
      label: `Plant`,
      children: tabContent(0),
    },
    {
      key: '2',
      label: `Room`,
      children: tabContent(1),
    },
    {
      key: '3',
      label: `Department`,
      children: tabContent(2),
    },
  ]

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
        <Tabs
          defaultActiveKey="0"
          items={tabList}
        />
      </Space>
    </div>
  );
};

export default AdminHomePage;
