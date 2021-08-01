import React, { Component } from "react";
import Carousel from "react-elastic-carousel";
class Bannerbottom extends Component {
  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <Carousel itemsToShow={4}>
          <div className="row">
            <div className="col-md-4">
              <a href="http://localhost:3000/product/ao-so-mi">
                <img
                  src={`${process.env.PUBLIC_URL}/home/images/bannerBottom/bannerSomi.jpg`}
                />
              </a>
              <div className="content-news3" >
                <a className="item-intro-news3" style={{ color: "black" }} href="http://localhost:3000/product/ao-so-mi">
                  <div style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "13px" }}> SƠ MI NAM </div>
                  <span style={{ fontSize: "15px", fontWeight: "bold" }}> Tham khảo các mẫu áo Sơ mi basic trơn, họa tiết thiết kế đầy tinh tế và trẻ trung</span>
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <a href="http://localhost:3000/product/ao-polo"><img
                src={`${process.env.PUBLIC_URL}/home/images/bannerBottom/bannerPolo.jpg`}
                style={{}}
              /></a>
              <div className="content-news3" >
                <a className="item-intro-news3" style={{ color: "black" }}>
                  <div style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "13px" }}>ÁO POLO</div>
                  <span style={{ fontSize: "15px", fontWeight: "bold" }}>Tham khảo các mẫu áo Polo trơn, Polo họa tiết thiết kế trẻ trung, lịch lãm cho chàng</span>
                </a>
              </div>
            </div>
            <div className="col-md-4">
             <a href="http://localhost:3000/product/ao-khoac"> <img
                src={`${process.env.PUBLIC_URL}/home/images/bannerBottom/bannerAokhoac.jpg`}
                style={{ width: "384px", height: "480px" }}
              /></a>
              <div className="content-news3" >
                <a className="item-intro-news3" style={{ color: "black" }} >
                  <div style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "13px" }}> SƠ MI NAM </div>
                  <span style={{ fontSize: "15px", fontWeight: "bold" }}> Tham khảo các mẫu Áo khoác,Áo khoác thiết kế phong cách, trẻ trung, năng động</span>
                </a>
              </div>
            </div>
            
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Bannerbottom;
