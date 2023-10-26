import React from "react";
import { Col, Row } from "antd";

const InputReadOnly = ({ addonBefore, show }) => {
    const paddingRight = addonBefore.paddingRight ? addonBefore.paddingRight + 7 : 7
    const value = typeof show !== "string" ? JSON.stringify(show) : show
    return (
        <Row justify={'start'} style={{ borderColor: '#d9d9d9', borderStyle: 'solid', borderRadius: '7px', borderWidth: '1px', padding: '0px' }}>
            <Col style={{
                paddingLeft: '11px',
                backgroundColor: '#fafafa',
                paddingTop: '4px',
                paddingBottom: '4px',
                paddingRight: `${paddingRight}px`,
                borderTopLeftRadius: '7px',
                borderBottomLeftRadius: '7px',
                borderRight: 'solid',
                borderRightColor: '#d9d9d9',
                borderWidth: '1px',
                cursor: 'default',
            }}
            >
                {addonBefore.title}
            </Col>
            <Col style={{ paddingLeft: '7px', paddingTop: '4px', paddingBottom: '4px', cursor: 'default', }}>{value}</Col>
        </Row>
    )
}
export default InputReadOnly;