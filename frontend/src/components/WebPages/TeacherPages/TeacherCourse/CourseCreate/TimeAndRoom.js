import React from "react";
import { useState, useEffect } from "react";
import {
  InfoCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
  BorderOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Layout,
  Row,
  Tooltip,
  Button,
  Input,
  Typography,
  Table,
  Breadcrumb,
  Steps,
  Form,
  Radio,
  Upload,
  message,
  Image,
  Select,
  Calendar,
  Empty,
  Tree,
  Result,
} from "antd";
import { listRoom } from "../../../../../function/Teacher/room";
import CalendarCreate from "../../../CalendarPage/CalendarCreate"

const { Title } = Typography;
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const TimeAndRoom = ({setTimeAndRoom,timeAndroom}) => {
  const [roomData, setRoomData] = useState([]);
  const loadRoom = () => {
    listRoom(sessionStorage.getItem("token"))
      .then((res) => {
        setRoomData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadRoom();
  }, []);
  const handleChangeRoom = (value) => {
    setTimeAndRoom((timeAndroom) => ({
      ...timeAndroom,
      "room": value,
    }));
  };
  const options1 = [];
  const options2 = [];
  for (let i = 0; i < roomData.length; i++) {
    if(roomData[i].floor === 1){
      options1.push({
      value: roomData[i]._id,
      label: roomData[i].name,
    })
    }else if (roomData[i].floor === 2){
      options2.push({
        value: roomData[i]._id,
        label: roomData[i].name,
      })
    }
    
  }

  return (
    <Form
      style={{ paddingTop: "2%" }}
      layout="vertical"
      // form={form}
      // initialValues={{
      //   requiredMarkValue: requiredMark,
      // }}
      // onValuesChange={onRequiredTypeChange}
      // requiredMark={requiredMark}
    >
      <Row align={"middle"}>
        <Col style={{ width: "100%" }}>
          <Form.Item label="Room" required>
            <Select 
             onChange={handleChangeRoom}
            options={[
              {
                label: 'Floor 1',
                options: options1
              },
              {
                label: 'Floor 2',
                options: options2
              },
            ]}
              />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <CalendarCreate 
          timeAndroom={timeAndroom}
          setTimeAndRoom={setTimeAndRoom}
          />
        </Col>
    
        
      </Row>
    </Form>
  );
};

export default TimeAndRoom;
