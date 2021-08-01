import React, { Component } from "react";
import authService from "../../Service/UserService/auth.service";
import HeaderAdmin from "./HeaderAdmin";

class MenuAdmin extends Component {

  

  render() {
    return (
      <div>
        <HeaderAdmin></HeaderAdmin>
        <div>
          {" "}
          <div id="layoutSidetop4_top4">
            <top4
              className="sb-sidetop4 accordion sb-sidetop4-dark"
              id="sidetop4Accordion"
            >
              <div className="sb-sidetop4-menu">
                <div className="top4">
                  <div className="sb-sidetop4-menu-heading">DANH MỤC</div>
                  <a className="top4-link" href="/all-category-admin">
                    <div className="sb-top4-link-icon">
                      <i className="fas fa-table" />
                    </div>
                     Nhóm sản phẩm
                  </a>
                  <a className="top4-link" href="http://localhost:3000/all-product-admin/page=1">
                    <div className="sb-top4-link-icon">
                    <i class="fab fa-product-hunt"></i>
                    </div>
                     Sản phẩm
                  </a>
                  <a className="top4-link" href="/all-new-admin">
                    <div className="sb-top4-link-icon">
                    <i class="far fa-newspaper"></i>
                    </div>
                     Tin tức
                  </a>
                  <a className="top4-link" href="/all-order-admin">
                    <div className="sb-top4-link-icon">
                    <i class="fas fa-shopping-bag"></i>
                    </div>
                    Đơn hàng
                  </a>
                  <a className="top4-link" href="/all-feedback">
                    <div className="sb-top4-link-icon">
                    <i class="fas fa-comments-dollar"></i>
                    </div>
                     Phản hồi
                  </a>
                  <a className="top4-link" href="/all-product-admin">
                    <div className="sb-top4-link-icon">
                      <i className="fas fa-user" />
                    </div>
                     Tài khoản
                  </a>
               
                </div>
              </div>
              <div className="sb-sidetop4-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
              </div>
            </top4>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuAdmin;
