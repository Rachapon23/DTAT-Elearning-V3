import { Carousel, Col, Image, Row } from 'antd';
import { useContext, useState } from 'react';
import { HomeContext } from './HomeContext';

const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"
const contentStyle = {
  height: '500px',
  color: '#fff',
  lineHeight: '500px',
  textAlign: 'center',
  background: '#364d79',
};


const HomeAcnounce = () => {
  const { acnounce } = useContext(HomeContext)
  const [imageLoaded, setImageLoaded] = useState(true)

  const handleUnloadedImage = (e) => {
    // e.target.src = listCarouselCard
    setImageLoaded(false)
    setListCarouselNoImage(acnounce.map((_, index) => carouselCard(`${index + 1} - No Image`)))
  }

  const carouselCard = (data) => {
    return (
      <div>
        <h3 style={contentStyle}>{data}</h3>
      </div>
    )
  }

  const listCarouselCard = [carouselCard("1 - No Acnounce"), carouselCard("2 - No Acnounce"), carouselCard("3 - No Acnounce"), carouselCard("4 - No Acnounce")]
  const [listCarouselNoImage, setListCarouselNoImage] = useState([carouselCard("1 - No Acnounce")])


  return (
    <div>
      <Row justify={"center"} align={"middle"} style={{ paddingTop: "7%", paddingBottom: "7%" }}>
        <Col style={{ width: "1200px", height: "500px" }}>
          <Carousel autoplay autoplaySpeed={5000}>
            {
              acnounce.length > 0 ?
                (
                  acnounce.map((item, index) => (
                    <Row justify={'center'} align={'middle'}>
                      <Col flex={"auto"}>
                        {
                          imageLoaded ?
                            (
                              <Image
                                key={index}
                                preview={false}
                                width={1200}
                                height={500}
                                src={process.env.REACT_APP_IMG + item.url}
                                onError={handleUnloadedImage}
                              />
                            )
                            :
                            (
                               <Col key={index}>{listCarouselNoImage[index]}</Col>
                            )
                        }

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
