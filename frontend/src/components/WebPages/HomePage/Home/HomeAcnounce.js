import { Carousel, Col, Image, Row } from 'antd';
import { useContext } from 'react';
import { HomeContext } from './HomeContext';

const HomeAcnounce = () => {
  const { acnounce } = useContext(HomeContext)

  return (
    <div>
      <Row justify={"center"} align={"middle"} style={{ paddingTop: "10%" }}>
        <Col style={{ width: "1800px", }}>
          <Carousel autoplay autoplaySpeed={5000}>
            {
              acnounce.length > 0 ?
                (
                  acnounce.map((item, index) => (
                    <Row justify={'center'} align={'middle'}>
                      <Col flex={"auto"}>
                        <Image
                          preview={false}
                          width={1800}
                          src={process.env.REACT_APP_IMG + item.url}
                        />
                      </Col>
                    </Row>
                  ))
                )
                :
                (
                  null
                )
            }
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default HomeAcnounce;
