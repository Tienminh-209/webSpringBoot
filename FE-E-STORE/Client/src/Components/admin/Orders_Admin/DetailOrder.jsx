import React, { Component } from 'react';
import OrdersService from '../../../Service/OrdersService';
import NumberFormat from "react-number-format";
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";
class DetailOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            list_product: [],
            list_info: [],
            info: "",
        };
    }

    componentDidMount() {
        OrdersService.getInfoUserById(this.state.id).then((res) => {
            this.setState({ list_info: res.data });
        });
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
    render() {
        return (
            <div className="sb-top4-fixed" style={{ backgroundColor: "#ECF0F5" }}>
                <HeaderAdmin />
                <div id="layoutSidetop4">
                    <MenuAdmin />
                    <div id="layoutSidetop4_content">
                        <div style={{fontSize: "20px", color: "black", marginBottom: "10px",marginLeft:"20px",marginTop:"10px" }}>
                            Tổng giá trị:
                            <NumberFormat
                                style={{ marginLeft: "10px" }}
                                value={this.state.result}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                            đ
                        </div>
                        <div className="row">
                            <div>
                                <div className="col-md-8">
                                    <table class="table table-border" style={{ color: "black" }}>
                                        <thead class="" style={{ color: "black" }}>
                                            <tr className="">
                                                <th
                                                    scope="col"
                                                    style={{ textAlign: "center", color: "black" }}
                                                >
                                                    #
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ textAlign: "center", color: "black" }}
                                                >
                                                    Tên sản phẩm
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "80px", color: "black" }}
                                                >
                                                    Kích cỡ
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ textAlign: "center", color: "black" }}
                                                >
                                                    Hình ảnh
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ textAlign: "center", color: "black" }}
                                                >
                                                    Đơn giá
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "100px", color: "black" }}

                                                >
                                                    Số lượng
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "103px", color: "black" }}

                                                >
                                                    Thành tiền
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.list_product.map((lstpr) => (
                                                <tr>
                                                    <td style={{ textAlign: "center", color: "black" }}>
                                                        {lstpr.id}
                                                    </td>
                                                    <td style={{ textAlign: "center", color: "black" }}>
                                                        {lstpr.title}
                                                    </td>
                                                    <td style={{ textAlign: "center", color: "black" }}>
                                                        {lstpr.sizek}
                                                    </td>
                                                    <td style={{ textAlign: "center", color: "black" }}>
                                                        <img style={{ width: "130px", height: "150px" }} src={`http://localhost:8080/images/${lstpr.image}`} alt="" />
                                                    </td>
                                                    <td style={{ textAlign: "center", color: "black" }}>
                                                        <NumberFormat
                                                            value={lstpr.price}
                                                            displayType={"text"}
                                                            thousandSeparator={true}
                                                        />
                                                        đ
                                                    </td>
                                                    <td style={{ textAlign: "center", color: "black" }}>
                                                        {lstpr.quantity}
                                                    </td>
                                                    <td style={{ textAlign: "center", color: "black" }}>
                                                        <NumberFormat
                                                            value={lstpr.quantity * lstpr.price}
                                                            displayType={"text"}
                                                            thousandSeparator={true}
                                                        />
                                                        đ
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table></div>
                                <div className="col-md-4">
                                    <article className="card mb-3">
                                        <div className="card-body">
                                            <figure className="icontext">
                                                <div>
                                                    <div style={{ display: "flex" }}>
                                                        <div className="title" style={{fontWeight:"bold"}}>Thông tin khách hàng</div>
                                                    </div>
                                                    {this.state.list_info.map((lstinfo) => (
                                                        <div className="title">
                                                            <div>Họ và tên: {lstinfo.fullname}</div>
                                                            <div>Số điện thoại: {lstinfo.phone}</div>
                                                            <div>Địa chỉ: {lstinfo.address}</div>
                                                            <div>Ghi chú: {lstinfo.note}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </figure>
                                            <hr />
                                        </div>{" "}
                                        {/* card-body .// */}
                                    </article>{" "}
                                </div>


                            </div>
                        </div>



                        <FooterAdmin />
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailOrder;