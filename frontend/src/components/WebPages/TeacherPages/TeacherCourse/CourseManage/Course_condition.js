import React from "react";
import { useState, useEffect, useContext } from "react";
//course Context
import { CourseContext } from "./CourseContext";

import {
  Col,
  Row,
  Form,
  Select,
  Table,
  Input,
  Button,
  Space,
  InputNumber,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// function : POST
import { createCondition } from "../../../../../function/Teacher/condition";
// function : GET
import { listPlant } from "../../../../../function/Teacher/plant";
import { listConditionCourse } from "../../../../../function/Teacher/condition";
// function : DELETE
import { removeCondition } from "../../../../../function/Teacher/condition";


const Course_condition = () => {
  const [form] = Form.useForm();
  const [plantData, setPlantData] = useState([]);
  const [conditionData, setConditionData] = useState([]);
  const [condition, setCondition] = useState({
    plant: "",
    maximum: "",
  });
  const { course_id } = useContext(CourseContext);
  // const [ hasChange, setHasChange] = useState(false)
  const [options, setOptions] = useState([]);

  const loadPlant = () => {
    listPlant(sessionStorage.getItem("token"), `?course_id=${course_id}`)
      .then((res) => {
        const data = res.data.data
        setPlantData(data);
        setOptions(() => data.map((item) => ({
          value: item._id,
          label: item.name,
        })))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadCondition = () => {
    listConditionCourse(sessionStorage.getItem("token"), course_id)
      .then((res) => {
        const data = res.data
        setConditionData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCondition();
    loadPlant();
  }, []);

  
  const columns = [
    {
      title: "No",
      align: "center",
      dataIndex: "_id",
      render: (_, dataObj) => {
        return conditionData.indexOf(dataObj) + 1;
      },
    },
    {
      title: `Plant`,
      align: "center",
      dataIndex: "plant",
      render: (_, item) => {
        return <p>{item.plant.name}</p>;
      },
    },
    {
      title: `Maximum`,
      align: "center",
      dataIndex: "maximum",
    },
    {
      title: `action`,
      align: "center",
      dataIndex: "role",
      render: (_, item) => {
        return (
          <Button
            onClick={() => handleDeleteCondition(item._id)}
          >
            <DeleteOutlined />
          </Button>
        );
      },
    },
  ];

  const handleChangeMaximum = (e) => {
    setCondition((condition) => ({
      ...condition,
      maximum: e.target.value,
    }));
  };
  const handleChangePlant = (value) => {
    setCondition((condition) => ({
      ...condition,
      plant: value,
    }));
  };

  const handleAddCondition = () => {
    console.log(condition);
    createCondition(sessionStorage.getItem("token"), condition, course_id)
      .then((res) => {
        loadCondition();
        loadPlant()
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const handleDeleteCondition = (id) => {
    removeCondition(sessionStorage.getItem("token"), id)
      .then((res) => {
        loadCondition();
        loadPlant();
      })
      .catch((err) => {
        console.log(err);
        // alert for user
        alert(err.response.data.error);
      });
  };

  const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);
    React.useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(
          () => {
            setSubmittable(true);
          },
          () => {
            setSubmittable(false);
          }
        );
    }, [values]);
    return (
      <Button
        onClick={handleAddCondition}
        type="primary"
        htmlType="submit"
        disabled={!submittable}
      >
        Add Condition
      </Button>
    );
  };

  return (
    <div>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        style={{ paddingTop: "2%" }}
      >
        <Form.Item style={{ marginBottom: "5px" }}>
          <Form.Item
            name="plant"
            label="Plant"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Select onChange={handleChangePlant} options={options} />
          </Form.Item>
          <Form.Item
            name="maximum"
            label="Maximum"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input
              type="number"
              name="maximum"
              onChange={handleChangeMaximum}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} />
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        dataSource={conditionData}
        columns={columns}
        pagination={{ pageSize: 4 }}
        size="middle"
      />
    </div>
  );
};

export default Course_condition;
