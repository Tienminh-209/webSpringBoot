import React, { Component } from 'react';
import CategoryService from '../../Service/CategoryService';
import ProductService from '../../Service/ProductService';
import ReactStars from "react-rating-stars-component";

import NumberFormat from 'react-number-format';
const ratingChanged = (newRating) => {
  console.log(newRating);
};
class PhuKien_Product extends Component {
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
    ProductService.getProduct_PhuKien(currentPage, this.state.size)
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
      <div style={{marginLeft:"30px",marginRight:"30px"}}>
      <div className="home-product">
        <div className="row sm-gutter">
          {this.state.content.map((hotnew) => (
            <div className="col-md-3">
              <a className="home-product-item">
               <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <div className="home-product-item-img" style={{ backgroundImage: `url(${`http://localhost:8080/images/${hotnew.image}`}` }}>
                </div></a>
               <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <h4 className="home-product-item-name">{hotnew.title}</h4></a>
                <div className="home-product-item__price">
                  <span className="home-product-item__price-old"><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></span>
                  <span className="home-product-item__price-current"><NumberFormat value={hotnew.price-(hotnew.price*hotnew.discount/100)} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></span>
                </div>
                <div className="home-product-item__action">
                  <span className="home-product-item__like home-product-item__like--liked">
                  Còn lại: {hotnew.amount} sản phẩm
                  </span>
                  <div className="home-product-item__rating">
                   <div>
                   <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                   </div>
                  </div>
                  <span className="home-product-item__sold">22 đã bán</span>
                </div>
                <div className="home-product-item__origin">
                  <span className="home-product-item__brand">.</span>
                  <span className="home-product-item__origin-name" style={{fontSize:"16px"}}>{hotnew.brands}</span>
                </div>
                <div className="home-product-item__sale-off">
                  <span className="home-product-item__sale-off-percent">-{hotnew.discount}%</span>
                </div>
              </a>
            </div>
          ))}

        </div>
      </div>
      <ul className="pagination6">
                <li className={"page-item " + this.state.disabled1}>
                  <button className="page-link" onClick={this.previousPage}>
                    Previous
                  </button>
                </li>
                <li className="page-item active">
                  <a
                    className="page-link"
                   
                    value={this.state.currentPage}
                    onChange={this.changcurrentPage}
                  >
                    {this.state.currentPage}
                  </a>
                </li>
                <li className={"page-item " + this.state.disabled2}>
                  {" "}
                  <button className="page-link" onClick={this.nextPage}>
                    Next
                  </button>
                </li>
              </ul>
    </div>
    );
  }
}

export default PhuKien_Product;