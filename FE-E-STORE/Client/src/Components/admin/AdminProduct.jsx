import React, { Component } from "react";
import AllProductAdmin from "./AllProductAdmin";
import CardAdmin from "./CardAdmin";
import FooterAdmin from "./FooterAdmin";
import HeaderAdmin from "./HeaderAdmin";
import MenuAdmin from "./MenuAdmin";

class AdminProduct extends Component {
  
  render() {
    return (
      <div>
        <div className="sb-top4-fixed">
          <HeaderAdmin />
          <div id="layoutSidetop4">
            <MenuAdmin />
            <div id="layoutSidetop4_content">
              <main>
                <div className="container-fluid px-4">
                  <CardAdmin />

                  <AllProductAdmin />
                </div>
              </main>
              <FooterAdmin />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminProduct;
