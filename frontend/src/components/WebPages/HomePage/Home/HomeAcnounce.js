import { Carousel, Col, Image, Row } from 'antd';
import { useContext } from 'react';
import { HomeContext } from './HomeContext';

const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};


const HomeAcnounce = () => {
  const { acnounce } = useContext(HomeContext)

  const carouselCard = (data) => {
    return (
      <div>
        <h3 style={contentStyle}>{data}</h3>
      </div>
    )
  }

  const listCarouselCard = [carouselCard("1 - No Acnounce"), carouselCard("2 - No Acnounce"), carouselCard("3 - No Acnounce"), carouselCard("4 - No Acnounce")]

  return (
    <div>
      <Row justify={"center"} align={"middle"} style={{ paddingTop: "7%",paddingBottom: "7%"}}>
        <Col style={{ width: "1200px", height: "500px"}}>
          <Carousel autoplay autoplaySpeed={5000}>
            {
              acnounce.length > 0 ?
                (
                  acnounce.map((item, index) => (
                    <Row justify={'center'} align={'middle'}>
                      <Col flex={"auto"}>
                        <Image
                          key={index}
                          preview={false}
                          width={1200}
                          height={500}
                          src={process.env.REACT_APP_IMG + item.url}
                        />
                      </Col>
                    </Row>
                  ))
                )
                :
                (
                  listCarouselCard.map((card, index) => (
                    <Col key={index}>{card}</Col>
                  ))
                )
            }
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default HomeAcnounce;
