import React, { Component } from 'react';
import Header from "../home/Header";
import Menu from "../home/Menu";
import Footer from "../home/Footer";
import ProductService from '../../Service/ProductService';
import NumberFormat from 'react-number-format';
import NewsService from '../../Service/NewsService';
import ReactStars from "react-rating-stars-component";
const ratingChanged = (newRating) => {
    console.log(newRating);
};
class SearchAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            size: 6,
            disabled1: "",
            disabled2: "",
            hotbest: [],
            hotnew: [],
            data: [],
        };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.findAll = this.findAll.bind(this);
        this.hotNew = this.hotNew.bind(this);
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
        currentPage -= 1;
        ProductService.getHotBestInPageOrther(currentPage, this.state.size)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    hotbest: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    }
    hotNew(currentPage) {
        currentPage -= 1;
        ProductService.getHotNewInPageOrther(currentPage, this.state.sizenew)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    hotnew: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    }
    componentDidMount() {
        const keyword = this.props.match.params.keyword;
        ProductService.getSearch(keyword).then(res => this.setState({ data: res.data }));
        this.changcurrentPage(this.state.currentPage);
        this.findAll(this.state.currentPage);
        this.hotNew(this.state.currentPage);
    }
    render() {
        return (
            <div>
                <div style={{ height: "118px" }}></div>
                <div className="text-new">Tìm kiếm</div>
                <div>
                    <section className="padding-bottom">
                        <header className="section-heading mb-4">
                            <h5 className="title-section" style={{ marginLeft: "100px" }}><i class="fas fa-search"></i> Kết quả tìm kiếm với từ khóa `{this.props.match.params.keyword}`, Có {this.state.data.length} sản phẩm tìm thấy</h5>
                        </header>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="home-product">
                                    <div className="row sm-gutter">
                                        {this.state.data.map((hotnew) => (
                                            <div className="col-md-4">
                                                <a className="home-product-item">
                                                    <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <div className="home-product-item-img" style={{ backgroundImage: `url(${`http://localhost:8080/images/${hotnew.image}`}` }}>
                                                    </div></a>
                                                    <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <h4 className="home-product-item-name">{hotnew.title}</h4></a>
                                                    <div className="home-product-item__price">
                                                        <span className="home-product-item__price-old"><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></span>
                                                        <span className="home-product-item__price-current"><NumberFormat value={hotnew.price - (hotnew.price * hotnew.discount / 100)} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></span>
                                                    </div>
                                                    <div className="home-product-item__action">
                                                        <span className="home-product-item__like home-product-item__like--liked">
                                                            Còn lại: {hotnew.amount} sản phẩm
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
                            </div>
                            <div className="col-md-3">
                                <div className="side-widget space30">
                                    <header className="section-heading heading-line">

                                        <p className="title-section text-uppercase">Sản phẩm nổi bật </p>
                                    </header>
                                    <div className="row">
                                        {this.state.hotbest.map((hotbest) => (
                                            <div className="col-xs-12 rpn">
                                                <div className="col-xs-4">
                                                    <a href={"http://localhost:3000/detail-product/" + hotbest.id}
                                                    >
                                                        <img style={{ width: "70px", height: "93px" }} src={`http://localhost:8080/images/${hotbest.image}`} alt="Quần Jeans Trơn Form Slimfit QJ022 Màu Xanh Đen" /></a>

                                                </div>
                                                <div className="col-xs-8">
                                                    <a href={"http://localhost:3000/detail-product/" + hotbest.id} style={{ color: "black", fontSize: "13px" }}>{hotbest.title}</a>
                                                    <div style={{ display: "flex" }}> <div> <NumberFormat style={{ fontSize: "12px" }} className="product-price" value={hotbest.price} displayType={'text'} thousandSeparator={true} /></div>
                                                        <div><sup style={{ fontSize: "12px" }}>đ</sup></div></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        );
    }
}

export default SearchAll;