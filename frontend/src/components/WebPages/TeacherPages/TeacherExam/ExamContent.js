import React from "react";
import { UpOutlined, DownOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Button, Form } from 'antd';
import { useState } from "react";
import CardContent from "../../../common/ExamCard/CardContent";
import "../teach.css"

import CardEmptyContent from "./CardEmptyContent";

const ExamContent = ({
  actionMode = null,
  inputInfoData = null,
  inputContentData = [],
  examId = null,
  onCreatedCard = null,
  onDeleteCardContent = null,
  onChangeCardContent = null,
  onAddCardChoice = null,
  onRemoveCardChoice = null,
  handleChangeChoiceAnswer = null,
  handleChangeChoiceQuestion = null,
  handleUploadImage = null,
  handleCreateContent = null,
  inputContentTemplate = null,
  onAddCardContent = null,

}) => {

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <Form
      style={{ paddingTop: "2%" }}
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Row justify={"center"}>
        {/* <Col style={{ width: "5%" }} /> */}
        <Col style={{ width: "95%" }} >
          <Row style={{ paddingTop: "1%" }}>
            <Col
              flex="auto"
            // style={{ height: "570px", }}

            >
              {
                Object.keys(inputContentData).length === 0 ?
                  (
                    <CardEmptyContent
                      inputContentTemplate={inputContentTemplate}
                      onAddCardContent={onAddCardContent}
                      actionMode={actionMode}
                    />
                  )
                  :
                  (
                    Object.keys(inputContentData).map((key, index) => (
                      <CardContent
                        key={key}
                        // uuid={key}
                        index={index}
                        head={inputInfoData}
                        actionMode={actionMode}
                        data={inputContentData[key]}
                        examID={examId}
                        onCreate={onCreatedCard}
                        onDelete={onDeleteCardContent}
                        onChange={onChangeCardContent}
                        onAddChoice={onAddCardChoice}
                        onRemoveChoice={onRemoveCardChoice}
                        onChangeChoiceAnswer={handleChangeChoiceAnswer}
                        onChangeChoiceQuestion={handleChangeChoiceQuestion}
                        onUploadImage={handleUploadImage}
                      />
                    ))
                  )
              }
            </Col>
            <Col style={{ paddingLeft: "1%" }} >

              {
                Object.keys(inputContentData).length !== 0 ?
                  (
                    <Card className="card-nlf">
                      <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
                        <Col flex={"auto"}>
                          <Row justify={"center"} >
                            <Tooltip title={"Add topic"} placement="left">
                              <Button type="text" onClick={onAddCardContent} >
                                <PlusSquareOutlined style={{ fontSize: "140%" }} />
                              </Button>
                            </Tooltip>
                          </Row>
                          <Row justify={"center"}>
                            <Tooltip title={"Go to top page"} placement="left" >
                              <Button type="text" onClick={() => window.scrollTo(0, 0)}>
                                <UpOutlined style={{ fontSize: "140%" }} />
                              </Button>
                            </Tooltip>
                          </Row>
                          <Row justify={"center"}>
                            <Tooltip title={"Go to buttom page"} placement="left">
                              <Button type="text" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                                <DownOutlined style={{ fontSize: "140%" }} />
                              </Button>
                            </Tooltip>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  )
                  :
                  (
                    null
                  )
              }

            </Col>
          </Row>
        </Col>
      </Row>

    </Form>
  )
}

export default ExamContent;