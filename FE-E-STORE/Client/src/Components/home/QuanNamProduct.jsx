import React, { Component } from "react";
import ProductService from "../../Service/ProductService";
import NumberFormat from 'react-number-format';
import ReactStars from "react-rating-stars-component";
import Carousel from "react-elastic-carousel";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
const ratingChanged = (newRating) => {
    console.log(newRating);
};

class QuanNamProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            quanjean: [],
            quantay: [],
            currentPage: 1,
            size: 6,
            disabled1: "",
            disabled2: "",
            sizek: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.hotBest = this.hotBest.bind(this);
        this.QuanJean = this.QuanJean.bind(this);
        this.QuanTay = this.QuanTay.bind(this);
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
        ProductService.getProduct_QuanShort(currentPage, this.state.size)
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
    QuanJean(currentPage) {
        currentPage -= 1;
        ProductService.getProduct_QuanJean(currentPage, this.state.size)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    quanjean: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    }
    QuanTay(currentPage) {
        currentPage -= 1;
        ProductService.getProduct_QuanTay(currentPage, this.state.size)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    quantay: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    }
    componentDidMount() {
        this.changcurrentPage(this.state.currentPage);
        this.hotBest(this.state.currentPage);
        this.QuanJean(this.state.currentPage);
        this.QuanTay(this.state.currentPage);
    }
    render() {
        return (
            <div style={{ marginLeft: "10px", marginRight: "10px", marginTop: "50px" }}>
                <Tabs
                    defaultTab="one"
                    onChange={(tabId) => { console.log(tabId) }}
                >
                    <TabList style={{ display: "flex" }}>
                        <div className="title-tap title">QUẦN NAM</div>
                        <Tab tabFor="one" className="tab-product title" style={{ marginLeft: "30px" }}>QUẦN TÂY</Tab>
                        <Tab tabFor="two" className="tab-product title" style={{ marginLeft: "15px" }}>QUẦN JEAN</Tab>
                        <Tab tabFor="three" className="tab-product title" style={{ marginLeft: "15px" }}>QUẦN SHORT</Tab>
                    </TabList>
                    <TabPanel tabId="one">

                        <div className="row">

                            <Carousel itemsToShow={4} style={{ height: "550px" }}>
                                {this.state.quantay.map((hotnew) => (
                                    <div className="col-md-3" style={{ top: "-90px" }}>
                                        <a href={"http://localhost:3000/detail-product/" + hotnew.id}>
                                            <img
                                                src={`http://localhost:8080/images/${hotnew.image}`}
                                                style={{ width: "274px", height: "429px", marginLeft: "-97px", marginTop: "101px" }}
                                            />
                                        </a>
                                        <div className="title-product-news-tab">{hotnew.title}</div>
                                        <div>
                                            <del style={{ color: "#666", marginLeft: "-94px", fontSize: "16px" }}><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></del>
                                            <NumberFormat className="price-tab" style={{ color: "#000000", marginLeft: "10px", fontSize: "18px" }} value={hotnew.price - (hotnew.price * hotnew.discount) / 100} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup>
                                        </div>


                                    </div>
                                ))}
                            </Carousel>
                            <a href="http://localhost:3000/product/quan-tay"> <button  style={{ width: "110px", marginLeft: "622px", padding: "6px", fontSize: "14px", backgroundColor: "white", color: "black" }}>XEM THÊM</button></a>
                        </div>

                    </TabPanel>
                    <TabPanel tabId="two">
                        <div className="row">

                            <Carousel itemsToShow={4} style={{ height: "393px" }}>
                                {this.state.quanjean.map((hotnew) => (
                                    <div className="col-md-3" style={{ top: "-90px" }}>
                                        <a href={"http://localhost:3000/detail-product/" + hotnew.id}>
                                            <img
                                                src={`http://localhost:8080/images/${hotnew.image}`}
                                                style={{ width: "274px", height: "429px", marginLeft: "-97px", marginTop: "40px" }}
                                            />
                                        </a>
                                        <div className="title-product-news-tab" style={{ marginTop: "-72px", marginLeft: "-57px" }}>{hotnew.title}</div>
                                        <div>
                                            <del style={{ color: "#666", marginLeft: "-57px", fontSize: "16px" }}><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></del>
                                            <NumberFormat className="price-tab" style={{ color: "#000000", marginLeft: "10px", fontSize: "18px" }} value={hotnew.price - (hotnew.price * hotnew.discount) / 100} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup>
                                        </div>


                                    </div>
                                ))}



                            </Carousel>
                            <a href="http://localhost:3000/product/quan-jean"> <button  style={{ width: "110px", marginLeft: "622px", padding: "6px", fontSize: "14px", backgroundColor: "white", color: "black" }}>XEM THÊM</button></a>
                        </div>
                    </TabPanel>
                    <TabPanel tabId="three">
                        <div className="row">

                            <Carousel itemsToShow={4} style={{ height: "550px" }}>
                                {this.state.content.map((hotnew) => (
                                    <div className="col-md-3" style={{ top: "-90px" }}>
                                        <a href={"http://localhost:3000/detail-product/" + hotnew.id}>
                                            <img
                                                src={`http://localhost:8080/images/${hotnew.image}`}
                                                style={{ width: "274px", height: "429px", marginLeft: "-97px", marginTop: "101px" }}
                                            />
                                        </a>
                                        <div className="title-product-news-tab">{hotnew.title}</div>
                                        <div>
                                            <del style={{ color: "#666", marginLeft: "-94px", fontSize: "16px" }}><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></del>
                                            <NumberFormat className="price-tab" style={{ color: "#000000", marginLeft: "10px", fontSize: "18px" }} value={hotnew.price - (hotnew.price * hotnew.discount) / 100} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup>
                                        </div>


                                    </div>
                                ))}
                            </Carousel>
                            <a href="http://localhost:3000/product/quan-short"> <button  style={{ width: "110px", marginLeft: "622px", padding: "6px", fontSize: "14px", backgroundColor: "white", color: "black" }}>XEM THÊM</button></a>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}


export default QuanNamProduct;