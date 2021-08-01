import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { total } from "cart-localstorage";
import OrdersService from "../../Service/OrdersService";
import Header from "../home/Header";
import Menu from "../home/Menu";
import Footer from "../home/Footer";
class UserClientDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      list_product: [],
      info: "",
    };
  }

  componentDidMount() {
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
      <div>
        <div style={{ height: "120px" }}></div>
        <div className="container">
          <div className="row">
            <div>
              <h3 className="card-title mb-4"><i class="fas fa-list"></i>  Danh sách sản phẩm </h3>
              <table class="table table-border">
                <thead class="">
                  <tr className="">
                    <th
                      scope="col"
                      style={{ textAlign: "center" }}
                    >
                      Mã sản phẩm
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: "center" }}
                    >
                      Tên sản phẩm
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: "center" }}
                    >
                     Kích cỡ
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: "center" }}
                    >
                      Hình ảnh
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: "center" }}
                    >
                      Đơn giá
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: "center" }}
                    >
                      Số lượng
                    </th>
                    <th
                      scope="col"
                      style={{ textAlign: "center" }}
                    >
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.list_product.map((lstpr) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {lstpr.id}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {lstpr.title}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {lstpr.sizek}
                      </td>
                      <td style={{ textAlign: "center" }}>
                       <img style={{width:"130px",height:"150px"}}  src={`http://localhost:8080/images/${lstpr.image}`} alt="" />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <NumberFormat
                          value={lstpr.price}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        đ
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {lstpr.quantity}
                      </td>
                      <td style={{ textAlign: "center" }}>
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
          
              </table>
              <div style={{float:"right",fontSize:"20px",color:"red",marginBottom:"10px"}}>
                    Tổng giá trị: 
                        <NumberFormat
                         style={{marginLeft:"10px"}}
                        value={this.state.result}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      đ
                    </div>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}
export default UserClientDetail;
