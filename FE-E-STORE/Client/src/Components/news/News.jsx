import React, { Component } from 'react';
import { Carousel } from "react-bootstrap";
import NewsService from '../../Service/NewsService';
import ProductService from '../../Service/ProductService';
import NumberFormat from "react-number-format";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ListNew_New from './ListNew_New';
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            size: 4,
            sizenew: 1,
            disabled1: "",
            disabled2: "",
            newss: [],
            newnew: [],
            event: [],
            hotnew: [],
            newHot: [],
        };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.findAll = this.findAll.bind(this);
        this.NewNew = this.NewNew.bind(this);
        this.ListEvent = this.ListEvent.bind(this);
        this.hotNew = this.hotNew.bind(this);
        this.ListNewHot = this.ListNewHot.bind(this);
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
        NewsService.ListNews(currentPage, this.state.size)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    newss: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    }
    NewNew(currentPage) {
        currentPage -= 1;
        NewsService.ListNewNew(currentPage, this.state.size)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    newnew: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    }
    ListEvent(currentPage) {
        currentPage -= 1;
        NewsService.ListEvent(currentPage, this.state.size)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    event: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    }
    ListNewHot(currentPage) {
        currentPage -= 1;
        NewsService.ListNewHot(currentPage, this.state.sizenew)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    newHot: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    }
    hotNew(currentPage) {
        currentPage -= 1;
        ProductService.getHotNewInPageOrther(currentPage, this.state.size)
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
        this.changcurrentPage(this.state.currentPage);
        this.findAll(this.state.currentPage);
        this.NewNew(this.state.currentPage);
        this.ListEvent(this.state.currentPage);
        this.hotNew(this.state.currentPage);
        this.ListNewHot(this.state.currentPage);
    }
    render() {

        return (
            <div>
                <div style={{ height: "90px" }}></div>
                <section className="section-content" style={{ backgroundColor: "#fafafa" }}>
                    <div>
                        <div className="text-new"><i style={{ width: "23px", height: "23px", color: "#ff2b2b" }} class="fas fa-book-open"></i> Tin tức</div>
                        <div className="row">

                            <main className="col-md-8">
                                <div>
                                    <div className="row" style={{ marginBottom: "10px" }}>

                                        <Carousel fade={true} pause={true} Item={3}>
                                            {this.state.newHot.map((newss) => (
                                                <Carousel.Item interval={10000} style={{ width: "100px", height: "310px" }}>
                                                    <div>
                                                        <a href={"http://localhost:3000/detail-news-" + newss.id}><img style={{ width: '833px', height: '461px', marginLeft: "40px" }} src={`http://localhost:8080/images/${newss.image}`} alt="" /></a>

                                                    </div>
                                                    <Carousel.Caption></Carousel.Caption>
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>


                                    </div>
                                </div>
                                <ListNew_New />
                            </main> {/* col.// */}

                            <main className="col-md-3" style={{ width: "452px", backgroundColor: "white" }}>
                                <div>
                                    <header className="section-heading heading-line">
                                        <p className="title-section text-uppercase" style={{ color: "black" }}>Bài viết mới</p>
                                    </header>
                                    {this.state.newnew.map((hotnew) => (

                                        <div className="row">
                                            <div className="col-md-3">
                                                <a className="img-wrap" href="#">
                                                    <span className="badge badge-danger"> NEW </span>
                                                    <a href={"http://localhost:3000/detail-news-" + hotnew.id}> <img style={{ width: "128px", height: "70px", marginTop: "-29px", marginBottom: "15px" }} src={`http://localhost:8080/images/${hotnew.image}`} /></a>
                                                </a>
                                            </div> {/* col.// */}
                                            <div className="col-md-6" style={{ width: "72%", marginTop: "-4px" }}>
                                                <div>
                                                    <a className="title" style={{ color: "black", fontSize: "16px" }} href={"http://localhost:3000/detail-news/" + hotnew.id}>{hotnew.title}</a>
                                                    <p className="mb-3">
                                                        <span className="tag" style={{ fontSize: "9px" }}> <i class="far fa-calendar-alt"></i>{hotnew.date}</span>
                                                    </p>
                                                </div> {/* info-main.// */}
                                            </div> {/* col.// */}

                                        </div>

                                    ))}

                                </div>
                                <div>
                                    <header className="section-heading heading-line">
                                        <p className="title-section text-uppercase" style={{ color: "black" }}>Sự kiện</p>
                                    </header>
                                    {this.state.event.map((hotnew) => (

                                        <div className="row">
                                            <div className="col-md-3">
                                                <a className="img-wrap" href="#">
                                                    <span className="badge badge-danger"> NEW </span>
                                                    <a href={"http://localhost:3000/detail-news-" + hotnew.id}> <img style={{ width: "128px", height: "70px", marginTop: "-29px", marginBottom: "15px" }} src={`http://localhost:8080/images/${hotnew.image}`} /></a>
                                                </a>
                                            </div> {/* col.// */}
                                            <div className="col-md-6" style={{ width: "72%", marginTop: "-4px" }}>
                                                <div>
                                                    <a className="title" style={{ color: "black", fontSize: "16px" }} href={"http://localhost:3000/detail-news/" + hotnew.id}>{hotnew.title}</a>
                                                    <p className="mb-3">
                                                        <span className="tag" style={{ fontSize: "9px" }}> <i class="far fa-calendar-alt"></i> {hotnew.date} </span>
                                                    </p>
                                                </div> {/* info-main.// */}
                                            </div> {/* col.// */}

                                        </div>

                                    ))}

                                </div>
                                <div>
                                    <header className="section-heading heading-line">
                                        <p className="title-section text-uppercase" style={{ color: "black" }}>Sản phẩm mới</p>
                                    </header>
                                    {this.state.hotnew.map((hotnew) => (

                                        <div className="row">
                                            <div className="col-md-3">
                                                <a className="img-wrap" href="#">
                                                    <span className="badge badge-danger"> NEW </span>
                                                    <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <img style={{ width: "128px", height: "123px", marginTop: "-29px", marginBottom: "15px" }} src={`http://localhost:8080/images/${hotnew.image}`} /></a>
                                                </a>
                                            </div> {/* col.// */}
                                            <div className="col-md-6" style={{ width: "72%", marginTop: "14px" }}>
                                                <div>
                                                    <a className="title" style={{ color: "black", fontSize: "16px" }} href={"http://localhost:3000/detail-product/" + hotnew.id}>{hotnew.title}</a>
                                                </div> {/* info-main.// */}
                                                <div>
                                                    <NumberFormat style={{ color: "black", marginLeft: "3px", fontWeight: "bold" }} value={hotnew.price - (hotnew.price * hotnew.discount / 100)} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup>
                                                    <del style={{ color: "black", marginLeft: "10px", fontSize: "16px" }}><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></del>

                                                </div> {/* info-main.// */}
                                            </div> {/* col.// */}

                                        </div>

                                    ))}

                                </div>
                            </main>

                        </div>
                    </div> {/* container .//  */}
                </section>
            </div>

        );
    }
}

export default News;