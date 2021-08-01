import React, { Component } from "react";
import NewsService from "../../Service/NewsService";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      size: 3,
      sizenew: 1,
      disabled1: "",
      disabled2: "",
      newss: [],
      newHot: [],
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.findAll = this.findAll.bind(this);
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
    NewsService.ListNewsInPageOrther(currentPage, this.state.size)
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

  componentDidMount() {
    this.changcurrentPage(this.state.currentPage);
    this.findAll(this.state.currentPage);
    this.ListNewHot(this.state.currentPage);
  }
  render() {
    return (
      <div className="row" style={{ marginLeft: "10px" }}>
        <header className="wrapper-news">
          <h4 className="title-news">
            <p className="text-news" style={{ background: "#fff" }}>TIN TỨC MỖI NGÀY </p>
          </h4>
        </header>
        <div className="col-md-7">
          {this.state.newHot.map((newss) => (
            <div>
            <a href={"http://localhost:3000/detail-news-" + newss.id}>  <img style={{ width: "736px", height: "383px", marginLeft: "15px" }} src={`http://localhost:8080/images/${newss.image}`} /></a>
              <a href={"http://localhost:3000/detail-news-" + newss.id}><div className="title" style={{ marginLeft: "12px", top: "4px",fontWeight:"500",color:"black" }}>{newss.title}</div></a>
              <div className="title" style={{ marginLeft: "15px", top: "4px",fontSize:"14px"}}>{ ReactHtmlParser(newss.description_short) }</div>

            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="side-widget space30">
            <header className="section-heading heading-line">
              <p className="title-section text-uppercase">Tin tức khác</p>
            </header>
            <div className="row">
              {this.state.newss.map((newss) => (
                <div className="col-xs-12 rpn">
                  <div className="col-xs-4">
                    <a href={"http://localhost:3000/detail-news-" + newss.id}
                    >
                      <img style={{ width: "184px", height: "119px" }}src={`http://localhost:8080/images/${newss.image}`} /></a>

                  </div>
                  <div className="col-xs-8 title">
                    <div className="content-news2" >
                      <a className="item-title" style={{ color: "black" }} href={"http://localhost:3000/detail-news-" + newss.id}>{newss.title}</a>
                     <p className="mb-3">
                        <span className="tag" style={{ marginLeft: "14px" }}> <i class="far fa-calendar-alt"></i> {newss.date} </span>
                      </p> 
                      </div>


                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <a href="http://localhost:3000/news"> <button style={{ width: "137px", marginLeft: "618px", padding: "6px", fontSize: "14px", backgroundColor: "white", color: "black" }}>XEM THÊM</button></a>
      </div>
    );
  }
}

export default Blog;
