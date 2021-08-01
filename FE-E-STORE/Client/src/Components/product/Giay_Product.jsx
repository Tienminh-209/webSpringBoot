import React, { Component } from 'react';
import CategoryService from '../../Service/CategoryService';
import ProductService from '../../Service/ProductService';
import ReactStars from "react-rating-stars-component";

import NumberFormat from 'react-number-format';
const ratingChanged = (newRating) => {
  console.log(newRating);
};
class Giay_Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      currentPage: 1,
      size: 8,
      disabled1: "",
      disabled2: "",
      categorys: []
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.findAll = this.findAll.bind(this);
  }
  changcurrentPage(currentPage) {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition)
      if (currentPage === 1) this.setState({ disabled1: "disabled" });
      else this.setState({ disabled1: " " });
    if (currentPage === condition) this.setState({ disabled2: "disabled" });
    else this.setState({ disabled2: " " });
  }
  previousPage() {
    if (this.state.currentPage > 1) this.state.currentPage -= 1;
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  nextPage() {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition) this.state.currentPage += 1;
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  findAll(currentPage) {
    CategoryService.getCategory().then((res) => {
      this.setState({ categorys: res.data });
    });
    currentPage -= 1;
    ProductService.getProduct_Giay(currentPage, this.state.size)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          content: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      });
  }
  componentDidMount() {
    this.changcurrentPage(this.state.currentPage);
    this.findAll(this.state.currentPage);
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2" style={{ marginLeft: "70px", backgroundColor: "#fafafa" }}>
            <h4 className="product">Danh mục</h4>
            <ul className="depart-hover" >
              {this.state.categorys.map((category) => (
                <li className="active" style={{ marginRight: "20px" }}>
                  <a href={"http://localhost:3000/" + category.link}><p className="paddingmenu" style={{ marginTop: "15px", marginBottom: "5px", marginLeft: "20px" }}>{category.title}</p></a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-8"style={{marginRight:"100px"}} >
              {this.state.content.map((hotnew) => (
                <div className="col-md-3" style={{marginRight:"73px"}} >
                  <div className="product-item6">
                    <div className="product-image6">
                      <a href="product-detail.html">
                      <img
                             src={`http://localhost:8080/images/${hotnew.image.replace(/^.*\\/, "")}`}
                                alt="logo"
                              /> 
                      </a>
                      <div className="product-action6">
                        <a type="button" href={"http://localhost:3000/detail-product/" + hotnew.id} style={{ width: "115px", marginRight: "70px" }}>
                          Xem chi tiết <i class="fas fa-angle-double-right"></i>
                        </a>
                      </div>
                    </div>
                    <div >
                      <a className="text-product-new" href={"http://localhost:3000/detail-product/" + hotnew.id}>{hotnew.title}</a>
                    </div>

                    <p style={{ color: "black" }}>
                      <NumberFormat style={{ marginLeft: "147px" }} value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup>
                    </p>

                  </div>

                </div>
              ))}
              
            
          </div>
          <ul className="pagination6">
                <li className={"page-item " + this.state.disabled1}>
                  <button className="page-link" href="#" onClick={this.previousPage}>
                    Previous
                  </button>
                </li>
                <li className="page-item active">
                  <a
                    className="page-link"
                    href="#"
                    value={this.state.currentPage}
                    onChange={this.changcurrentPage}
                  >
                    {this.state.currentPage}
                  </a>
                </li>
                <li className={"page-item " + this.state.disabled2}>
                  {" "}
                  <button className="page-link" href="#" onClick={this.nextPage}>
                    Next
                  </button>
                </li>
              </ul>
        </div>
      </div>
    );
  }
}
export default Giay_Product;