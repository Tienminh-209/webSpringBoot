import React, { Component } from "react";
import CategoryService from '../../Service/CategoryService';
import ProductService from '../../Service/ProductService';
import NumberFormat from 'react-number-format';
import FilterProduct from "./filter/FilterProduct";
import Services from "./../home/Services";
import ReactStars from "react-rating-stars-component";
const ratingChanged = (newRating) => {
  console.log(newRating);
};
class MatKinhProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
          content: [],
          currentPage: 1,
          size: 9,
          disabled1: "",
          disabled2: "",
          categorys: [],
          hotnew: [],
          hotbest: [],
        };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.findAll = this.findAll.bind(this);
        this.hotNew = this.hotNew.bind(this);
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
        ProductService.getProduct_MatKinh(currentPage, this.state.size)
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
      hotNew(currentPage) {
        currentPage -= 1;
        ProductService.getHotNewInPageOrther(currentPage)
          .then((response) => response.data)
          .then((data) => {
            this.setState({
              hotnew: data.content,
            });
          });
      }
      hotBest(currentPage) {
        currentPage -= 1;
        ProductService.getHotBestInPageOrther(currentPage)
          .then((response) => response.data)
          .then((data) => {
            this.setState({
              hotbest: data.content,
            });
          });
      }
      componentDidMount() {
        this.changcurrentPage(this.state.currentPage);
        this.findAll(this.state.currentPage);
        this.hotNew(this.state.currentPage);
        this.hotBest(this.state.currentPage);
      }
      render() {
        return (
          <div style={{ marginLeft: "5px", marginRight: "5px" }}>
            <Services />
            <div className="row">
              <article className="filter-group" style={{ display: "flex" }}>
                <div className="title" style={{ display: "flex", marginLeft: "31px", fontSize: "15px", marginTop: "22px" }}>
                  <div>
                    <a href="/" title="Quay tr??? v??? trang ch???" style={{ color: "red" }}><i class="fas fa-home"></i> Trang ch???</a>
                  </div>
                  <div>
                    <i className="fas fa-caret-right" style={{ marginTop: "4px", marginLeft: "5px" }} />
                  </div>
                  <div style={{ marginLeft: "5px" }}>
                   M???t k??nh
                  </div>
                </div>
                <FilterProduct />
                <div style={{ fontSize: "15px", marginLeft: "185px",marginTop:"18px" }}>C?? {this.state.content.length} s???n ph???m trong trang {this.state.currentPage}</div>
              </article>
              <div className="row">
                <div className="col-md-8" style={{ marginLeft: "30px" }}>
                  <div className="home-product">
                    <div className="row sm-gutter">
                      {this.state.content.map((hotnew) => (
                        <div className="col-md-4">
                          <a className="home-product-item">
                            <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <div className="home-product-item-img" style={{ backgroundImage: `url(${`http://localhost:8080/images/${hotnew.image}`}` }}>
                            </div></a>
                            <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <h4 className="home-product-item-name">{hotnew.title}</h4></a>
                            <div className="home-product-item__price">
                              <span className="home-product-item__price-old"><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup></span>
                              <span className="home-product-item__price-current"><NumberFormat value={hotnew.price - (hotnew.price * hotnew.discount / 100)} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup></span>
                            </div>
                            <div className="home-product-item__action">
                              <span className="home-product-item__like home-product-item__like--liked">
                                C??n l???i: {hotnew.amount} s???n ph???m
                              </span>
                              <div className="home-product-item__rating">
                                <div>
                                  <ReactStars
                                    count={5}
                                    style={{ fontSize: "10px" }}
                                    onChange={ratingChanged}
                                    size={18}
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
                              <span className="home-product-item__origin-name" style={{ fontSize: "16px" }}>{hotnew.brands}</span>
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
                <div className="col-md-3" style={{ marginLeft: "75px" }}>
                  <div>
                    <header className="section-heading heading-line">
                      <p className="title-section text-uppercase" style={{ color: "black" }}>S???n ph???m m???i</p>
                    </header>
                    {this.state.hotnew.map((hotnew) => (
    
                      <div className="row">
                        <div className="col-md-3">
    
                          <span className="badge badge-danger"> NEW </span>
                          <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <img style={{ width: "90px", height: "120px", marginTop: "-29px", marginBottom: "15px" }} src={`http://localhost:8080/images/${hotnew.image}`} /></a>
    
                        </div> {/* col.// */}
                        <div className="col-md-6" style={{ width: "72%", marginTop: "14px" }}>
                          <div>
                            <a className="title-product-news1" style={{ color: "black", fontSize: "16px", marginLeft: "25px" }} href={"http://localhost:3000/detail-product/" + hotnew.id}>{hotnew.title}</a>
                          </div> {/* info-main.// */}
                          <div>
                            <NumberFormat className="price-tab" style={{ color: "black", marginLeft: "28px", fontWeight: "bold" }} value={(hotnew.price) - (hotnew.price * hotnew.discount / 100)} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup>
                            <del style={{ color: "black", marginLeft: "10px", fontSize: "16px" }}><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup></del>
    
                          </div> {/* info-main.// */}
                        </div> {/* col.// */}
    
                      </div>
    
                    ))}
    
                  </div> <div>
                    <header className="section-heading heading-line">
                      <p className="title-section text-uppercase" style={{ color: "black" }}>S???n ph???m n???i b???t</p>
                    </header>
                    {this.state.hotbest.map((hotnew) => (
    
                      <div className="row">
                        <div className="col-md-3">
    
                          <span className="badge badge-danger"> NEW </span>
                          <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <img style={{ width: "90px", height: "120px", marginTop: "-29px", marginBottom: "15px" }} src={`http://localhost:8080/images/${hotnew.image}`} /></a>
    
                        </div> {/* col.// */}
                        <div className="col-md-6" style={{ marginTop: "14px" }}>
                          <div>
                            <a className="title-product-news2" style={{ color: "black" }} href={"http://localhost:3000/detail-product/" + hotnew.id}>{hotnew.title}</a>
                          </div> {/* info-main.// */}
                          <div>
                            <NumberFormat className="price-tab" style={{ color: "black", marginLeft: "28px", fontWeight: "bold" }} value={(hotnew.price) - (hotnew.price * hotnew.discount / 100)} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup>
                            <del style={{ color: "black", marginLeft: "10px", fontSize: "16px" }}><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup></del>
    
                          </div> {/* info-main.// */}
                        </div> {/* col.// */}
    
                      </div>
    
                    ))}
    
                  </div>
                </div>
              </div>
    
            </div>
          </div>
        );
      }
    }

export default MatKinhProduct;