import React, { Component } from 'react';
import AdminService from '../../../Service/AdminService';
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class viewNews extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: {},
        }
    }

    componentDidMount() {
        AdminService.getNewsById(this.state.id).then(res => {
            this.setState({ product: res.data });
        })
    }

    render() {
        return (
            <div className="sb-top4-fixed">
                <HeaderAdmin />
                <div id="layoutSidetop4">
                    <MenuAdmin />
                    <div id="layoutSidetop4_content">
                        <table class="table table-bordered" style={{ marginLeft: "20px" }}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Tiêu đề</th>
                                    <th>Hình ảnh</th>
                                    <th>Mô tả ngắn </th>
                                    <th>Mô tả tin tức </th>
                                    <th>Thể loại</th>
                                    <th>Ngày đăng</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <th scope="row">{this.state.product.id}</th>
                                    <td>{this.state.product.title}</td>
                                    <td><img style={{ width: "100px", marginLeft: "10px" }} src={`http://localhost:8080/images/${this.state.product.image}`} /></td>
                                    <td>{ReactHtmlParser(this.state.product.description_short)}</td>
                                    <td>{ReactHtmlParser(this.state.product.description)}</td>
                                    <td>{this.state.product.category_new}</td>
                                    <td>{this.state.product.date}</td>
                                </tr>

                            </tbody>
                        </table>
                        <FooterAdmin />
                    </div>
                </div>
            </div>
        );
    }
}

export default viewNews;