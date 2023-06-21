import React from "react";
import { Col, Row } from "antd";
import "./content.css";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Contact = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div>
      <p style={{ fontSize: "2em", fontWeight: "600", textAlign: "center" }}>
        contact
      </p>
      <Row gutter={24}>
        <Col span={12}>
          <p style={{ fontSize: "2rem", fontWeight: "500", marginTop: "50px" }}>
            DENSO Training Academy (Thailand) - DTAT
          </p>
          <p style={{ fontSize: "2em", fontWeight: "400", marginTop: "10px" }}>
            address
          </p>
          <p style={{ fontSize: "1.5em", fontWeight: "400" }}>
            Amata Nakorn Industrial Estate Bankao, Pantong Chonburi 20160
            Thailand
          </p>
          <p style={{ fontSize: "1em", fontWeight: "400", marginTop: "50px" }}>
            What does LOREM mean? ‘Lorem ipsum dolor sit amet, consectetur
            adipisici elit…’ (complete text) is dummy text that is not meant to
            mean anything. It is used as a placeholder in magazine layouts, for
            example, in order to give an impression of the finished document.
            The text is intentionally unintelligible so that the viewer is not
            distracted by the content. The language is not real Latin and even
            the first word ‘Lorem’ does not exist. It is said that the lorem
            ipsum text has been common among typesetters since the 16th century
            (Source: Wikipedia.com).
          </p>
          <div className="btn-navigate">
            <button href="#" className="btn-go-up">Go up</button>
          </div>
        </Col>
        <Col span={12}>
          <div className="map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={13.435063698236556}
                lng={101.01941840644946}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
