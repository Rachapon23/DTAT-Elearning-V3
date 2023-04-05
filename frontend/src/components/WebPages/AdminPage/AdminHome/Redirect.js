import { Card, Col, Row } from 'antd';
import './adminhome.css'
const App = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Card className='card-redirect-t' title="Teacher" bordered={false}>
      go to Teacher page
      </Card>
    </Col>
    <Col span={12}>
      <Card className='card-redirect-s' title="Student" bordered={false}>
        go to Student page
      </Card>
    </Col>
  </Row>
);
export default App;