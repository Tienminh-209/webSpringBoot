import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
class Slider extends Component {
  render() {
    return (
      <div>
        <div style={{height:"92px"}}></div>
        <div>
          <Carousel fade={true} pause={false}>
            <Carousel.Item interval={100}>
              <img
                className="d-block w-100"
                src={`${process.env.PUBLIC_URL}/home/images/banners/slider1.jpg`}
                style={{ width: '1349px', height: '513px' }}
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={100}>
              <img
                className="d-block w-100"
                src={`${process.env.PUBLIC_URL}/home/images/banners/slider2.jpg`}
                style={{ width: '1349px', height: '513px' }}
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={100}>
              <img
                className="d-block w-100"
                src={`${process.env.PUBLIC_URL}/home/images/banners/slider3.jpg`}
                style={{ width: '1349px', height: '513px' }}
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>

        </div>
      </div>

    );
  }
}

export default Slider;
