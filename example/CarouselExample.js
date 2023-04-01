import { Carousel, Col, Row } from 'antd';

const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

function App() {

  const carouselCard = (data) => {
    return (
      <div>
        <h3 style={contentStyle}>{data}</h3>
      </div>
    )
  }

  const listCarouselCard = [carouselCard("1 - Test"), carouselCard("2 - Example"), carouselCard("3 - Setting"), carouselCard("4 - Start")]

  return (
    <div>
      <Row justify={"center"} align={"middle"} style={{paddingTop: "10%"}}>
        <Col style={{width: "80%"}}>
          <Carousel autoplay autoplaySpeed={5000}>
            {
              listCarouselCard.map((card, index) => (
                <Col key={index}>{card}</Col>
              ))
            }
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default App;
