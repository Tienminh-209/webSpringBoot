import React, { Component } from "react";
import ProductService from "../../Service/ProductService";
import NumberFormat from 'react-number-format';
import { add, onChange, quantity } from 'cart-localstorage'
import ReactStars from "react-rating-stars-component";
import { confirmAlert } from 'react-confirm-alert';
import Carousel from "react-elastic-carousel";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
const ratingChanged = (newRating) => {
  console.log(newRating);
};
class AllProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      currentPage: 1,
      size: 6,
      disabled1: "",
      disabled2: "",
      sizek: ''
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.hotBest = this.hotBest.bind(this);
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
    this.hotBest(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  nextPage() {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition) this.state.currentPage += 1;
    this.hotBest(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  hotBest(currentPage) {
    currentPage -= 1;
    ProductService.getProduct_DoBo(currentPage, this.state.size)
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
    this.hotBest(this.state.currentPage);
  }
  render() {
    return (
      <div style={{marginLeft:"10px",marginRight:"10px"}}>
<Tabs
        defaultTab="one"
        onChange={(tabId) => { console.log(tabId) }}
      >
        <TabList style={{display:"flex"}}>
          <div className="title-tap title">ÁO NAM</div>
          <Tab tabFor="one" className="tab-product title" style={{marginLeft:"30px"}}>ÁO THUN NAM</Tab>
          <Tab tabFor="two" className="tab-product title" style={{marginLeft:"15px"}}>ÁO KHOÁC</Tab>
          <Tab tabFor="three"className="tab-product title"style={{marginLeft:"15px"}}>ÁO SƠ MI</Tab>
        </TabList>
        <TabPanel tabId="one">
        <div className="home-product">
          <div className="row sm-gutter">
            {this.state.content.map((hotnew) => (
              <div className="col-md-2">
                <a className="home-product-item">
                 <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <div className="home-product-item-img" style={{ backgroundImage: `url(${`http://localhost:8080/images/${hotnew.image}`}` }}>
                  </div></a>
                 <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <h4 className="home-product-item-name title-tap-show title">{hotnew.title}</h4></a>
                  <div className="home-product-item__price">
                    <span className="home-product-item__price-old"><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></span>
                    <span className="home-product-item__price-current"><NumberFormat style={{fontSize:"18px"}} value={hotnew.price-(hotnew.price*hotnew.discount/100)} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></span>
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
                        size={12}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                     </div>
                    </div>
                  </div>
                  <div className="home-product-item__origin">
                    <span className="home-product-item__brand">.</span>
                    <span className="home-product-item__origin-name" style={{fontSize:"16px"}}>{hotnew.brands}</span>
                  </div>
                  <div className="home-product-item__favourite">
                    <i className="fas fa-check" />
                    <span>NEW</span>
                  </div>
                  <div className="home-product-item__sale-off">
                    <span className="home-product-item__sale-off-percent">-{hotnew.discount}%</span>
                  </div>
                </a>
              </div>
            ))}

          </div>
        </div>
        </TabPanel>
        <TabPanel tabId="two">
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
                  <div className="home-product-item__favourite">
                    <i className="fas fa-check" />
                    <span>NEW</span>
                  </div>
                  <div className="home-product-item__sale-off">
                    <span className="home-product-item__sale-off-percent">-{hotnew.discount}%</span>
                  </div>
                </a>
              </div>
            ))}

          </div>
        </div>
        </TabPanel>
        <TabPanel tabId="three">
  3
        </TabPanel>
      </Tabs>
      </div>
    );
  }
}
export default AllProduct;
