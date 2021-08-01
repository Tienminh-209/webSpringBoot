import React, { Component } from 'react';
import AdminService from '../../../Service/AdminService';
import CategoryService from '../../../Service/CategoryService';
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class viewProduct_Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: {},
        }
    }

    componentDidMount() {
        AdminService.getProductById(this.state.id).then(res => {
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
                                    <th>Stt</th>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th style={{width:"141px"}}>Mô tả sản phẩm</th>
                                   
                                    <th  style={{width:"85px"}}>Giá tiền</th>
                                    <th style={{width:"92px"}}>Chất liệu</th>
                                    <th style={{width:"110px"}}>Số lượng</th>
                                    <th style={{width:"110px"}}>Thương hiệu</th>
                                    <th style={{width:"110px"}}>Màu sắc</th>
                                    <th style={{width:"276px"}}>Mã nhóm sản phẩm</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <th scope="row">{this.state.product.id}</th>
                                    <td><img style={{width:"70px",height:"100px"}} src={`http://localhost:8080/images/${this.state.product.image}`} alt="" /></td>
                                    <td>{this.state.product.title}</td>
                                    <td>{ReactHtmlParser(this.state.product.description)}</td>
                                    <td>{this.state.product.price}</td>
                                    <td>{this.state.product.material}</td>
                                    <td>{this.state.product.amount}</td>
                                    <td>{this.state.product.brands}</td>
                                    <td>{this.state.product.color}</td>
                                    <td>{this.state.product.cateid}</td>
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
export default viewProduct_Admin;