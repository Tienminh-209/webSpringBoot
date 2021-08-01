import React, { Component } from 'react';
import OrdersService from '../../../Service/OrdersService';
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";
import { confirmAlert } from 'react-confirm-alert';
class AllOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            currentPage: 1,
            size: 10,
            disabled1: "",
            disabled2: "",
            list_product: [],
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
        OrdersService.getAllOrder(currentPage, this.state.size)
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
        this.findAll(this.state.currentPage);
        OrdersService.ListOrderDetail(this.state.id).then((res) => {
            this.setState({ list_product: res.data });
            console.log(this.state.list_product);
            const result = this.state.list_product.reduce(
              (total, currentValue) =>
                (total = total + currentValue.price * currentValue.quantity),
              0
            );
            console.log(result);
            this.setState({ result: result });
          });
    }
    deleteOrder(id) {
        OrdersService.deleteOrder(id).then((res) => {
          this.setState({
            list_order: this.state.list_order.filter((order) => order.id !== id),
          });
        });
        OrdersService.deleteOrderDetail(id).then((res) => {
          this.setState({
            list_order_detail: this.state.list_order_detail.filter(
              (orderde) => orderde.id !== id
            ),
          });
        });
        window.location.reload(false);
      }
    submit = (id) =>{
        confirmAlert({
          message: 'Hóa đơn này đã giao thành công !!!.',
          buttons: [
            {
              label: 'OK',
              onClick: () => this.deleteOrder(id),
              
            },
            {
              label: 'Hủy',
              onClick: () => this.onClose
            }
          ]
        });
      };
    render() {
        return (
            <div className="sb-top4-fixed">
                <HeaderAdmin />
                <div id="layoutSidetop4">
                    <MenuAdmin />
                    <div id="layoutSidetop4_content">
                        <button style={{ width: "198px", height: "38px", marginTop: "40px", marginBottom: "20px", marginLeft: "20px" }} type="text" className="btn btn-success" onClick={this.addProduct}><i class="far fa-plus-square"></i> Danh sách đơn hàng</button>
                        <table class="table table-bordered" style={{ marginLeft: "20px", textAlign: "center" }}>
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th>#</th>
                                    <th >Mã đơn hàng</th>
                                    <th >Mã tài khoản</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.content.map((allproduct) => (
                                    <tr>
                                        <th scope="row">{allproduct.id}</th>
                                        <td>{allproduct.id_order}</td>
                                        <td>{allproduct.user_id}</td>
                                        <td style={{display:"flex"}}>
                                            <div style={{ display: "flex" }}>
                                                <a
                                                    type="button"
                                                    className="btn btn-success"
                                                    style={{ fontSize: "12px",color:"white" }}
                                                    href={
                                                        "http://localhost:3000/order-details/" +
                                                        allproduct.id_order
                                                      }
                                                >
                                                    Xem chi tiết
                                                </a>
                                            </div>
                                            <div style={{ display: "flex",marginLeft:"5px" }}>
                                                <a
                                                    type="button"
                                                    className="btn btn-danger"
                                                    style={{ fontSize: "12px",color:"white" }}
                                                    onClick={ () => this.submit(allproduct.id_order)}
                                                >
                                                   Giao hàng thành công
                                                </a>
                                            </div>
                                            <div style={{ display: "flex",marginLeft:"5px" }}>
                                                <a
                                                    type="button"
                                                    className="btn btn-dark"
                                                    style={{ fontSize: "12px",color:"white" }}
                                                >
                                                 Đặt hàng ngày: {allproduct.date}
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ul className="pagination2">
                            <li className={"page-item " + this.state.disabled1}>
                                <button
                                    className="page-link"
                                    href="#"
                                    onClick={this.previousPage}
                                >
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
                                <button
                                    className="page-link"
                                    href="#"
                                    onClick={this.nextPage}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                        <FooterAdmin />
                    </div>
                </div>
            </div>
        );
    }
}

export default AllOrder;