import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Form, Select, Table, Input, Button } from "antd";
import {
  InfoCircleOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
// function : GET
import { listPlant } from "../../../../../function/Teacher/plant";
import { getCourse } from "../../../../../function/Teacher/course";
// function : POST
import { createCondition } from "../../../../../function/Teacher/condition";
// function : DELETE
import {removeCondition} from "../../../../../function/Teacher/condition"

const ManagePlant = () => {
  const [plantData, setPlantData] = useState({});
  const {course_id} = useParams()
  const [condition, setCondition] = useState({
    plant: "",
    maximum:""
  });

  const [tableData,setTableData] = useState([])

  // const [courseData, setCourseData] = useState({});

  const loadDataCourse = () => {
    getCourse(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        // console.log(res);
        setTableData(res.data.data.condition);
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  // for load data
  useEffect(() => {
    loadDataCourse();
  }, []);

  const loadPlant = () => {
    listPlant(sessionStorage.getItem("token"))
      .then((res) => {
        // console.log(res.data.data);
        setPlantData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadPlant();
  }, []);

  const options = [];
  for (let i = 0; i < plantData.length; i++) {
      options.push({
        value: plantData[i]._id,
        label: plantData[i].name,
      });
  }

  const columns = [
    {
      title: 'No',
      align: 'center',
      dataIndex: '_id',
      render: (_, dataObj) => {
        return tableData.indexOf(dataObj) + 1
      }
    },
    {
      title: `Plant`,
      align: 'center',
      dataIndex: 'plant',
    },
    {
      title: `Maximum`,
      align: 'center',
      dataIndex: 'maximum',
    },
    {
      title: `action`,
      align: 'center',
      dataIndex: 'role',
      render: (_, item) => {
        return (
            <Button onClick={()=>handleDeleteCondition(item._id)}>
              delete
            </Button>
        )
      }
    },
 
];
const handleDeleteCondition = (id) =>{
  removeCondition(sessionStorage.getItem("token"),id, course_id)
    .then((res) => {
      loadDataCourse();
    })
    .catch((err) => {
      console.log(err);
      // alert for user
      alert(err.response.data.error);
    });
}
  const handleChangeMaximum = (e) => {
    setCondition((condition) => ({
      ...condition,
      "maximum": e.target.value,
    }));
  };
  const handleChangePlant = (value) => {
    setCondition((condition) => ({
      ...condition,
      "plant": value,
    }));
  };
  const handleAddCondition = () =>{
    createCondition(sessionStorage.getItem("token"),condition, course_id)
    .then((res) => {
      loadDataCourse();
    })
    .catch((err) => {
      console.log(err);
      // alert for user
      alert(err.response.data.error);
    });
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
      <Row>
        <Col style={{ width: "100%" }}>
          <Row justify="space-between">
            <Col span={10}>
              <Form.Item label="plant" name="fieldRoom" required>
                <Select
                onChange={handleChangePlant}
                options={options}
                />
              </Form.Item>
            </Col>
            <Col span={10} style={{paddingLeft:"10px"}}>
              <Form.Item label="maximum" required>
              <Input 
              placeholder="input maximum"
              name="maximum"
              onChange={handleChangeMaximum}
              ></Input>
              </Form.Item>
            </Col>
            <Col span={4} style={{display:"flex",justifyContent:"center"}}>  
            <Form.Item label="button" required>
            <Button onClick={handleAddCondition}>Add</Button>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="table" required>
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={{ pageSize: 4 }}
              size="middle"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ManagePlant;
