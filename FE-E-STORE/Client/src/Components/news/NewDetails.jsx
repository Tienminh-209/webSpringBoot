import React, { Component } from 'react';
import NewsService from '../../Service/NewsService';
import NumberFormat from "react-number-format";
import Carousel from "react-elastic-carousel";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class NewDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            id: this.props.match.params.id,
            news: {},
            newsall: [],
            newnew: [],
            tip: [],

        };
        this.NewNew = this.NewNew.bind(this);
        this.Tip = this.Tip.bind(this);
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
    Tip(currentPage) {
        currentPage -= 1;
        NewsService.ListTipAndShare(currentPage, this.state.size)
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    tip: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    }
    componentDidMount() {
        this.NewNew(this.state.currentPage);
        this.Tip(this.state.currentPage);
        NewsService.getNewsById(this.state.id).then((res) => {
            let news = res.data;
            this.setState({
                title: news.title,
                description: news.description,
                detaildescription: news.detaildescription,
                images: news.images,
                images1: news.images1,
                news: res.data,
            });
        });
        NewsService.getAllNews().then((res) => {
            this.setState({ newsall: res.data });
        });
    }


    render() {

        return (
            <div className="font-family-all">
                  <div style={{ height: "118px" }}></div>
                <div className="row">
                    <div className="col-md-7"style={{marginLeft:"30px"}}>
                        <div className="row">
                            <div className="col-md-4"><img style={{ width: "400px", height: "268px",marginLeft:"22px"}} src={`http://localhost:8080/images/${this.state.news.image}`}/></div>
                            <div className="col-md-8">
                                 <div className="font-family-all" style={{ fontSize: "18px",fontWeight:"500",marginLeft:"184px" }}>{this.state.news.title}</div>
                                 <div style={{ display: "flex",fontSize:"14px",marginTop:"32px",marginLeft:"182px" }}> Đăng bởi <div style={{ fontWeight: "bold", marginLeft: "5px", marginRight: "5px" }}> Admin </div> ngày <div style={{ fontWeight: "bold", marginLeft: "5px", marginRight: "5px" }}><i class="fas fa-table"></i> {this.state.news.date}</div></div>
                                 </div>
                            
                        </div>
                      
                       
                        <div className="font-family-all1" style={{ marginTop: "20px" }}>{ ReactHtmlParser(this.state.news.description) }</div>
                       
                    </div>
                    <div className="col-md-4" style={{marginLeft:"60px"}}>
                    <div>
                                <header className="section-heading heading-line">
                                    <p className="title-section text-uppercase" style={{ color: "black" }}>Chia sẻ các tips hay</p>
                                </header>
                                {this.state.tip.map((hotnew) => (

                                    <div className="row">
                                        <div className="col-md-3">
                                            <a className="img-wrap" href="#">
                                                <span className="badge badge-danger"> NEW </span>
                                                <a href={"http://localhost:3000/detail-news-" + hotnew.id}> <img style={{ width: "128px", height: "70px", marginTop: "-29px", marginBottom: "15px" }} src={`http://localhost:8080/images/${hotnew.image}`} /></a>
                                            </a>
                                        </div> {/* col.// */}
                                        <div className="col-md-6" style={{ width: "72%", marginTop: "-4px" }}>
                                            <div>
                                                <a className="title" style={{ color: "black", fontSize: "16px" }} href={"http://localhost:3000/detail-news-" + hotnew.id}>{hotnew.title}</a>
                                                <p className="mb-3">
                                                    <span className="tag" style={{ fontSize: "9px" }}> <i class="far fa-calendar-alt"></i> 04/07/21 </span>
                                                </p>
                                            </div> {/* info-main.// */}
                                        </div> {/* col.// */}

                                    </div>

                                ))}

                            </div>
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
                                                <a className="title" style={{ color: "black", fontSize: "16px" }} href={"http://localhost:3000/detail-news-" + hotnew.id}>{hotnew.title}</a>
                                                <p className="mb-3">
                                                    <span className="tag" style={{ fontSize: "9px" }}> <i class="far fa-calendar-alt"></i> 04/07/21 </span>
                                                </p>
                                            </div> {/* info-main.// */}
                                        </div> {/* col.// */}

                                    </div>

                                ))}

                            </div>
                        </div>
                </div>
                <div className="border-top" style={{ marginTop: "72px" }}>
                    <div>
                        <header className="section-heading heading-line">
                            <h4 className="title-section text-uppercase">Tin tức khác</h4>
                        </header>
                        <Carousel itemsToShow={4}>
                            {this.state.newsall.map((relate) => (
                                <div className="col-lg-3">
                                    <div className="product-item">

                                        <div className="product-image">
                                            <a href={"http://localhost:3000/detail-news-" + relate.id}>
                                                <img
                                                    className="img-sm"
                                                    style={{ width: "249px", height: "255px" }}
                                                    src={`http://localhost:8080/images/${relate.image}`}
                                                    alt="logo"
                                                />
                                            </a>
                                        </div>
                                        <div>
                                            <a className="font-family-all" style={{ color: "black", fontSize: "20px" }} href={"http://localhost:3000/detail-news-" + relate.id}>{relate.title}</a>
                                        </div>
                                        <div className="product-price">
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div id="comment" className="border" style={{ marginTop: "20px" }}>
                    <h5 style={{ fontWeight: "bold", marginLeft: "34px" }}>BÌNH LUẬN</h5>
                    <div class="fb-comments" style={{ marginLeft: "30px" }} data-href="http://localhost:3000" data-width="1300" data-numposts="1"></div>
                </div>
            </div>
        );
    }

}

export default NewDetails;