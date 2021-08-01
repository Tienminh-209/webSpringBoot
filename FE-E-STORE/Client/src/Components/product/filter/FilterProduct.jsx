import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { total, list, quantity, add, onChange } from "cart-localstorage";
import { Redirect } from "react-router-dom";
export default class FilterProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price_small: '0',
      price_large: '100000',
      brands:'Yame',
      cateid:'7',
      redirect: false,
    };
    this.onPriceSmall = this.onPriceSmall.bind(this);
    this.onPriceLarge = this.onPriceLarge.bind(this);
    this.onBrands = this.onBrands.bind(this);
    this.onCateid = this.onCateid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onPriceSmall(e) {
    const value = e.target.value;
    var lowerCaseName = value.toLowerCase();
    this.setState({
      price_small: lowerCaseName,
    });
  }
  onPriceLarge(e) {
    const value = e.target.value;
    var lowerCaseName = value.toLowerCase();
    this.setState({
      price_large: lowerCaseName,
    });
  }
  onPriceLarge(e) {
    const value = e.target.value;
    var lowerCaseName = value.toLowerCase();
    this.setState({
      price_large: lowerCaseName,
    });
  }
  onBrands(e) {
    const value = e.target.value;
    this.setState({
      brands: value,
    });
  }
  onCateid(e) {
    const value = e.target.value;
    var lowerCaseName = value.toLowerCase();
    this.setState({
      cateid: lowerCaseName,
    });
  }
  handleSubmit() {
    this.setState({ redirect: true });
  }
  render() {
    const { redirect, price_small, price_large,brands,cateid } = this.state;
    if (redirect) {
      return <Redirect to={`/filter/${price_small}/${price_large}/${brands}/${cateid}`} />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <article className="filter-group">
          <h6 className="title">
            <a href="#" style={{color:"black",marginLeft: "16px"}}> Thương hiệu: </a>
          </h6>
          <div className="filter-content collapse show">
            <div>  <select
              class="form-select"
              style={{ width: "130px", marginLeft: "15px" }}
              onChange={this.onPriceSmall}
            >
              <option value="Yame" selected>
              Yame
              </option>
              <option value="Polo">Polo</option>
              <option value="HAT">HAT</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Dirtty">Dirtty</option>
              <option value="Gucci">Gucci</option>
            </select></div>
          </div>
        </article> */}

        <div style={{ display: "flex" }}>
          <div>
            <div>  <select
              class="form-select"
              style={{ width: "127px", height: "32px", marginTop: "15px", marginLeft: "130px" }}
              onChange={this.onPriceSmall}
            >
              <option value="0" selected>
               0
              </option>
              <option value="50000">50.000 VNĐ</option>
              <option value="100000">100.000 VNĐ</option>
              <option value="300000">300.000 VNĐ</option>
              <option value="500000">500.000 VNĐ</option>
              <option value="700000">700.000 VNĐ</option>
              <option value="1000000">1.000.000 VNĐ</option>
            </select></div>
          </div>
          <div>
            <div> <select
              class="form-select"
              style={{ width: "127px", height: "32px", marginTop: "15px", marginLeft: "8px" }}
              onChange={this.onPriceLarge}
            >
              <option value="100000" selected>
                100.000 VNĐ
              </option>
              <option value="200000">200.000 VNĐ</option>
              <option value="500000">500.000 VNĐ</option>
              <option value="700000">700.000 VNĐ</option>
              <option value="1000000">1.000.000 VNĐ</option>
              <option value="2000000">2.000.000 VNĐ</option>
              <option value="3000000">3.000.000 VNĐ</option>
              <option value="5000000">5.000.000 VNĐ</option>
            </select></div>
           
          </div>
          <div>
          <div> <select
              class="form-select"
              style={{ width: "127px", height: "32px", marginTop: "15px", marginLeft: "8px" }}
              onChange={this.onBrands}
            >
              <option value="Yame" selected>
                Yame
              </option>
              <option value="HAT">HAT</option>
              <option value="E-STORE">E-STORE</option>
              <option value="HK">HK</option>
            </select></div>
          </div>
          <div>
          <div> <select
              class="form-select"
              style={{ width: "127px", height: "32px", marginTop: "15px", marginLeft: "8px" }}
              onChange={this.onCateid}
            >
              <option value="7" selected>
                Áo Thun
              </option>
              <option value="8">Áo Sơ Mi</option>
              <option value="9">Áo Polo </option>
              <option value="10">Áo khoác</option>
              <option value="11">Quần Tây</option>
              <option value="12">Quần Jean</option>
              <option value="13">Quần Short</option>
              <option value="19">Dây Lưng</option>
              <option value="20">Ví Da</option>
              <option value="21">Mũ Nón</option>
              <option value="22">Balo-Túi Xách</option>
              <option value="23">Mắt Kính</option>
              <option value="24">Đồ Đôi</option>
              <option value="25">Bộ Vest Nam</option>
            </select></div>
          </div>
          <div 
            style={{ marginLeft: "16px", marginTop: "19px", textAlign: "center", backgroundColor: "black", color: "white",width:"43px",height:"26px",borderRadius:"16px" }}>
           <a style={{color:"white"}} href={`/filter/gia-thap-nhat=${price_small}/gia-cao-nhat=${price_large}/thuong-hieu=${brands}/nhom-san-pham=${cateid}`}> <i style={{marginTop:"5px"}} class="fas fa-search-plus"></i></a>
          </div>
        </div>
      </form>
    );
  }
}
