import React, { Component } from 'react';
import NewsService from '../../Service/NewsService';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class ListNew_New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            size: 4,
            disabled1: "",
            disabled2: "",
            newss: [],
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
    componentDidMount() {
        this.changcurrentPage(this.state.currentPage);
        this.findAll(this.state.currentPage);
    }
    render() {
        return (
            <div>
                {this.state.newss.map((newss) => (
                    <div>  <article className="card card-product-list">
                        <div className="row no-gutters">
                            <aside className="col-md-3">
                                <a href={"http://localhost:3000/detail-news-" + newss.id} className="img-wrap">

                                    <img style={{ width: "298px", height: "244px", marginLeft: "29px", marginTop: "26px" }} src={`http://localhost:8080/images/${newss.image}`} />
                                </a>
                            </aside> {/* col.// */}
                            <div className="col-md-6" style={{ width: "72%" }}>
                                <div className="info-main">
                                    <a href={"http://localhost:3000/detail-news-" + newss.id} className="h5 title"> {newss.title}</a>
                                    <p>{ReactHtmlParser(newss.description_short)}</p>
                                    <p className="mb-3">
                                        <span className="tag"> <i class="far fa-calendar-alt"></i> {newss.date} </span>
                                    </p>
                                </div> {/* info-main.// */}
                            </div> {/* col.// */}

                        </div> {/* row.// */}
                    </article> {/* card-product .// */}</div>
                ))}

                <ul className="pagination5">
                    <li className={"page-item " + this.state.disabled1}>
                        <button className="page-link"  onClick={this.previousPage}>
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
                        <button className="page-link"  onClick={this.nextPage}>
                            Next
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ListNew_New;