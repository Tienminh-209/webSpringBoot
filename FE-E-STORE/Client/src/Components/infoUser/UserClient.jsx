import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import OrdersService from "../../Service/OrdersService";
import Header from "../home/Header";
import Menu from "../home/Menu";
import Footer from "../home/Footer";
import { confirmAlert } from 'react-confirm-alert';
const user = JSON.parse(localStorage.getItem("user"));
const userid = JSON.parse(localStorage.getItem("user"));
class UserClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      list_order: [],
      list_order_detail: [],
      id: userid.id,
      fullname: userid.username,
      phone: userid.phone,
      address: userid.address,
    };
    this.deleteOrder = this.deleteOrder.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    OrdersService.ListOrder(user.id).then((res) => {
      this.setState({ list_order: res.data });
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
  changeUser(id) {
    this.props.history.push(`update-user/${id}`);
  }
  submit = (id) => {
    confirmAlert({
      message: 'Bạn muốn hủy đơn hàng này.',
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
    const count_order = this.state.list_order.length;
    localStorage.setItem("count_order", this.state.list_order.length);
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <div>
          <div style={{ height: "90px" }}></div>
          <section className="section-content padding-y">
            <div className="container">
              <div className="row">
                <main className="col-md-12">
                  {/* /////////// */}
                  <div className="col-md-3">
                    <article className="card mb-3">
                      <div className="card-body">
                        <figure className="icontext">
                          <div>
                            <div style={{ display: "flex" }}>
                              <p>Giao tới</p>
                            </div>
                            <div style={{ display: "flex" }}>
                              <p><strong>{this.state.fullname}</strong></p>
                              <p style={{ marginLeft: "12px", marginRight: "19px" }}>|</p>
                              <p style={{ marginLeft: "-13px" }}><strong>{this.state.phone}</strong></p>
                            </div>
                            <div style={{ fontSize: "13px", marginTop: "10px", textAlign: "center" }}>{this.state.address}</div>
                          </div>
                        </figure>
                        <hr />
                      </div>{" "}
                      {/* card-body .// */}
                    </article>{" "}
                  </div>
                  {/* card.// */}
                  <article className="card  mb-3">
                    <div className="card-body">
                      <h5 className="card-title mb-4">
                        Danh sách đơn hàng ({count_order})
                      </h5>
                      <div className="row">
                        <div>
                          <table class="table">
                            <thead class="">
                              <tr className="small text-uppercase">
                                <th scope="col"><div>STT</div></th>
                                <th scope="col"><div style={{ width: "95px" }}>Mã đơn hàng</div></th>
                                <th scope="col"><div style={{ width: "115px" }}>Ngày đặt hàng</div></th>
                                <th scope="col"><div style={{ marginLeft: "47px" }}>Ghi chú</div></th>
                                <th scope="col"><div style={{ width: "124px" }}>Chi tiết đơn hàng</div></th>
                                <th scope="col"> <div style={{ width: "100px" }}>Hủy đơn hàng</div></th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.list_order.map((lstor, i) => (
                                <tr>
                                  <td>{i + 1}</td>
                                  <td><strong style={{ marginLeft: "22px" }}>{lstor.id_order}</strong></td>
                                  <td><div style={{ marginLeft: "13px" }}>{lstor.date}</div></td>
                                  <td><div>{lstor.note}</div></td>
                                  <td >
                                    <a
                                      href={
                                        "http://localhost:3000/user-order-details/" +
                                        lstor.id_order
                                      }
                                    >
                                      <i style={{ width: "50px", height: "25px", marginLeft: "40px" }} class="fas fa-arrow-circle-right"></i>
                                    </a>

                                  </td>
                                  <td> <a
                                    style={{ marginLeft: "10px", fontSize: "12px", color: "black" }}
                                    onClick={() => this.submit(lstor.id_order)}
                                  >
                                    <i style={{ width: "50px", height: "25px", marginLeft: "10px" }} class="fas fa-trash-alt"></i>
                                  </a></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>{" "}
                      {/* row.// */}
                    </div>{" "}
                    {/* card-body .// */}
                  </article>{" "}
                  {/* card.// */}
                </main>{" "}
                {/* col.// */}
              </div>
            </div>{" "}
            {/* container .//  */}
          </section>

        </div>
      );
    }
  }
}

export default UserClient;
