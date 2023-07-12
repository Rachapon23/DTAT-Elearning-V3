import { Carousel, Col, Image, Row } from 'antd';
import { useContext, useState } from 'react';
import { HomeContext } from './HomeContext';
import { useMediaQuery } from 'react-responsive';

const DEFAULT_IMAGE = "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.small.png"
const contentStyle = {
  height: '500px',
  color: '#fff',
  lineHeight: '500px',
  textAlign: 'center',
  background: '#364d79',
};


const HomeAnnounce = ({ preview = false }) => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const { announce } = useContext(HomeContext)
  const [imageLoaded, setImageLoaded] = useState(true)

  const handleUnloadedImage = (e) => {
    // e.target.src = listCarouselCard
    setImageLoaded(false)
    setListCarouselNoImage(announce.map((_, index) => carouselCard(`${index + 1} - No Image`)))
  }

  const carouselCard = (data) => {
    return (
      <div>
        <h3 style={contentStyle}>{data}</h3>
      </div>
    )
  }

  const listCarouselCard = [carouselCard("1 - No Announce"), carouselCard("2 - No Announce"), carouselCard("3 - No Announce"), carouselCard("4 - No Announce")]
  const [listCarouselNoImage, setListCarouselNoImage] = useState([carouselCard("1 - No Announce")])

  const announcePc = () => {
    return (
      <div>
        <Row justify={"center"} align={"middle"} style={{ paddingTop: "7%", paddingBottom: "7%" }}>
          <Col style={{ width: "1200px", height: "500px" }}>
            <Carousel autoplay autoplaySpeed={5000}>
              {
                announce.length > 0 ?
                  (
                    announce.map((item, index) => (
                      <Row justify={'center'} align={'middle'}>
                        <Col flex={"auto"}>
                          {
                            imageLoaded ?
                              (
                                <Image
                                  key={index}
                                  preview={preview}
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
    )
  }

  const announceMobile = () => {
    return (
      <Row justify={"center"} align={"middle"} style={{ paddingTop: "7%", paddingBottom: "7%" }}>
        <Col style={{ width: "95%" }}>
          <Carousel autoplay autoplaySpeed={5000}>
            {
              announce.length > 0 ?
                (
                  announce.map((item, index) => (
                    <Row >
                      <Col>
                        {
                          imageLoaded ?
                            (
                              <Image
                                key={index}
                                preview={preview}
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
    )
  }

  const renderAnnounce = () => {
    if (isDesktopOrLaptop) {
      return announcePc()
    }
    if (isTabletOrMobile) {
      return announceMobile()
    }
  }
  return renderAnnounce()
}

export default HomeAnnounce;
