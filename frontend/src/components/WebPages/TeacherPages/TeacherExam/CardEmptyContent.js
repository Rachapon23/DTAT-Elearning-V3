import React from "react";
import { Card, Col, Row, Button, Empty } from 'antd';
import "../teach.css"

const CardEmptyContent = ({
    inputContentTemplate = null,
    onAddCardContent = null,
    actionMode = null,
}) => {

    return (
        <Card>
            <Row justify={"center"}>
                <Col>
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <span>
                                No Content
                            </span>
                        }
                    >
                        {
                            actionMode === "Edit" || actionMode === "Create" ?
                                (
                                    <Button type="primary" onClick={onAddCardContent}>Create Now</Button>
                                ) : (null)
                        }
                    </Empty>
                </Col>
            </Row>
        </Card >
    )
}
export default CardEmptyContent;