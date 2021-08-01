import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        {/* ========================= SECTION SUBSCRIBE  ========================= */}
        <section className="section padding-y-lg" style={{backgroundColor:"#020202"}}>
          <div className="container">
            <p className="pb-2 text-center text-white">
             Khi có sản phẩm mới sẽ gửi thông báo đến Email của bạn !!!
            </p>
            <div className="row justify-content-md-center">
              <div className="col-lg-5 col-md-6">
                <form className="form-row">
                  <div className="col-md-8 col-7">
                    <input
                      className="form-control border-0"
                      placeholder="Your Email"
                      type="email"
                    />
                  </div>{" "}
                  {/* col.// */}
                  <div className="col-md-4 col-5">
                    <button type="submit" className="btn btn-block btn-warning">
                      {" "}
                      <i className="fa fa-envelope" /> Subscribe{" "}
                    </button>
                  </div>{" "}
                  {/* col.// */}
                </form>
              </div>{" "}
              {/* col-md-6.// */}
            </div>
          </div>
        </section>
        {/* ========================= SECTION SUBSCRIBE END// ========================= */}
        {/* ========================= FOOTER ========================= */}
        <footer className="section-footer" style={{backgroundColor:"black"}}>
          <div className="container">
            <section className="footer-top padding-y-lg text-white">
              <div className="row">
                <aside className="col-md col-6">
                  <h7 className="title"style={{fontSize:"15px"}}>MUA HÀNG TRỰC TUYẾN</h7>
                  <ul className="list-unstyled" style={{textAlign:"center"}}>
                  <li>
                      {" "}
                      <a style={{color:"#ef9608"}}>0355223384</a>
                    </li>
                    <li>
                      {" "}
                      <a style={{fontSize:"12px"}}>sale@eshop.com</a>
                    </li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                <h7 className="title"style={{fontSize:"15px",marginLeft:"38px"}}>HOTLINE GÓP Ý</h7>
                  <ul className="list-unstyled" style={{textAlign:"center"}}>
                  <li>
                      {" "}
                      <a style={{color:"#ef9608"}}>0355223384</a>
                    </li>
                    <li>
                      {" "}
                      <a style={{fontSize:"12px"}}>cskh@eshop.com</a>
                    </li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                <h7 className="title"style={{fontSize:"15px",marginLeft:"38px"}}>THÔNG TIN </h7>
                  <ul className="list-unstyled" style={{marginLeft:"39px"}}>
                  <li>
                      {" "}
                      <a href="/infoStore" style={{fontSize:"12px"}}>Giới thiệu</a>
                    </li>
                    <li>
                      {" "}
                      <a style={{fontSize:"12px"}}>Tuyển dụng</a>
                    </li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                <h7 className="title"style={{fontSize:"15px",marginLeft:"38px"}}>CHÍNH SÁCH</h7>
                  <ul className="list-unstyled" style={{marginLeft:"39px"}}>
                  <li>
                      {" "}
                      <a href="/chinh-sach-doi-hang" style={{fontSize:"12px"}}>Chính sách đổi hàng</a>
                    </li>
                    <li>
                      {" "}
                      <a href="/chinh-sach-bao-hanh" style={{fontSize:"12px"}}>Chính sách bảo hành</a>
                    </li>
                    <li>
                      {" "}
                      <a href="/chinh-sach-bao-mat" style={{fontSize:"12px"}}>Chính sách bảo mật</a>
                    </li>
                    <li>
                      {" "}
                      <a href="/chinh-sach-hoan-tien" style={{fontSize:"12px"}}>Chính sách hoàn tiền</a>
                    </li>
                  </ul>
                </aside>
                <aside className="col-md">
                  <h6 className="title">Social</h6>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fab fa-facebook" /> Facebook{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fab fa-twitter" /> Twitter{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fab fa-instagram" /> Instagram{" "}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fab fa-youtube" /> Youtube{" "}
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>{" "}
              {/* row.// */}
            </section>{" "}
            {/* footer-top.// */}
            <section className="footer-bottom">
              <p className="text-white">
              HỘ KINH DOANH E-STORE
              </p>
              <p className="text-muted">
                {" "}
                Địa chỉ:412 Lê Văn Sỹ. P14.Q3. TPHCM/ Điện thoại: 0938803633/DKKD số: 41C8013053 cấp ngày 01/12/2010, nơi cấp UBND Quận 3
              </p>
              <br />
            </section>
          </div>
          {/* //container */}
        </footer>
        {/* ========================= FOOTER END // ========================= */}
      </div>
    );
  }
}

export default Footer;
