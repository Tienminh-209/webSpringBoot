import React, { Component } from "react";
import OrdersService from "../../Service/OrdersService";
import Footer from "../home/Footer";
import Header from "../home/Header";
import Menu from "../home/Menu";
import axios from "axios";
import {
  total,
  list,
  quantity,
  remove
} from "cart-localstorage";
import { confirmAlert } from 'react-confirm-alert';
import NumberFormat from "react-number-format";
const tong = total();
const userid = JSON.parse(localStorage.getItem("user"));
class Order extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
     
      fullname: userid.username,
      phone: userid.phone,
      address: userid.address,
      id_order: localStorage.getItem("cart_id"),
      user_id: userid.id,
      note: '',
      date:date,
      carts: list(),
    };
    this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changeIdOrderHandler = this.changeIdOrderHandler.bind(this);
    this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
    this.changeNoteHandler = this.changeNoteHandler.bind(this);
    this.changeDatedHandler = this.changeDatedHandler.bind(this);
    this.saveOrupDateInfo = this.saveOrupDateInfo.bind(this);
    this.submit = this.submit.bind(this);
  }
  saveOrupDateInfo = (e) => {
    let info = {
      fullname: this.state.fullname,
      phone: this.state.phone,
      address: this.state.address,
      id_order: this.state.id_order,
      user_id: this.state.user_id,
      note: this.state.note,
      date: this.state.date,
    };
    console.log("info => " + JSON.stringify(info));
    OrdersService.CreateInfos(info).then((res) => {
    });
    let data = localStorage.getItem("__cart");
    axios
      .post("http://localhost:8080/order", JSON.parse(data))
      .then((res) => console.log("thanh cong"))
      .catch((e) => console.log("that bai"));
    localStorage.removeItem("__cart");
    localStorage.removeItem("cart_id");
    localStorage.removeItem("price");
    window.location.reload(false);
  };
  submit = (e) => {
    const x = this.state.id_order;
    confirmAlert({
      message: "B???n c?? ch???c ch???n mua ????n h??ng:__" + x,
      buttons: [
        {
          label: 'OK',
          onClick: () => this.saveOrupDateInfo(e),

        },
        {
          label: 'H???y',
          onClick: () => this.onClose
        }
      ]
    });
  };

  changeFullNameHandler = (event) => {
    this.setState({ fullname: event.target.value });
  };

  changePhoneHandler = (event) => {
    this.setState({ phone: event.target.value });
  };

  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };
  changeIdOrderHandler = (event) => {
    this.setState({ id_order: event.target.value });
  };
  changeUserIdHandler = (event) => {
    this.setState({ user_id: event.target.value });
  };
  changeNoteHandler = (event) => {
    this.setState({ note: event.target.value });
  };
  changeDatedHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  DeleteAddCart(id) {
    quantity(id, -1);
  }
  RemoveAddCart(id) {
    remove(id);
    if (localStorage.getItem("__cart") == "[]") {
      localStorage.removeItem("__cart");
    }
    window.location.reload(false);
  }
  submitDelete = (id) => {
    const x = this.state.id_order;
    confirmAlert({
      message: 'B???n c?? mu???n x??a s???n ph???m n??y ra kh???i ????n h??ng:___' + x,
      buttons: [
        {
          label: 'OK',
          onClick: () => this.RemoveAddCart(id),

        },
        {
          label: 'H???y',
          onClick: () => this.onClose
        }
      ]
    });
  };
  render() {
    if (localStorage.getItem("__cart") != null) {
      return (
        <div>
          <div style={{height:"104px"}}></div>
          <div style={{marginBottom:"50px"}}>
            <div>
              <div className="text-order">Thanh to??n gi??? h??ng ( <var className="price" style={{ color: "red" }}>
                <NumberFormat
                  value={tong}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                ??
              </var>)</div>
              <div className="boder-order">
                <div style={{ display: "flex", marginLeft: "20px", fontSize: "15px", marginBottom: "10px", marginTop: "15px" }}> <span1 class="span1">1</span1>
                  <div style={{ fontWeight: "bold", marginTop: '4px', }}>Th??ng tin gi??? h??ng</div></div>
                <div style={{ display: "flex", marginLeft: "568px", fontSize: "15px", marginBottom: "10px", marginTop: "15px" }}> <span1 class="span1">2</span1>
                  <div style={{ fontWeight: "bold", marginTop: '4px' }}>Th??ng tin ????n h??ng</div></div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <table className="table border-card" style={{ marginLeft: "20px", fontSize: "15px" }}>
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col"></th>
                        <th scope="col"><div style={{ width: "105px", marginLeft: "25px" }}>T??N S???N PH???M</div></th>
                        <th scope="col"><div style={{ width: "75px" }}>SIZE</div></th>
                        <th scope="col"><div style={{ width: "75px" }}>S??? L?????NG</div></th>
                        <th scope="col"><div style={{ width: "75px" }}>T???NG TI???N</div></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.carts.map((cat) => (
                        <tr>
                          <th scope="row">{cat.id}</th>
                          <td>
                            <img
                              className="img-sm"
                              style={{ marginLeft: "42px" }}
                              src={`http://localhost:8080/images/${cat.image}`}
                              style={{ width: "100px", height: "100px" }}
                            />
                          </td>
                          <td><div className="title-order">{cat.title}</div></td>
                          <td><div style={{ marginLeft: "7px" }}>{cat.sizek}</div></td>
                          <td><div style={{ marginLeft: "27px" }}>{cat.quantity}</div></td>
                          <td>
                            <var className="price">
                              <NumberFormat
                                style={{ marginLeft: "7px" }}
                                value={cat.price * cat.quantity}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                              ??
                            </var>
                          </td>
                          <td className="text-right">
                            <a
                              onClick={(e) => this.submitDelete(cat.id)}
                            >
                              {" "}
                              <i class="fas fa-trash" style={{ color: "black" }}></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="col-md-7 " style={{ fontSize: "12px", marginTop: "10px" }}>

                  {/* <h6 style={{marginLeft:"200px",color:"red"}}>* Ki???m tra l???i th??ng tin c???a b???n tr?????c khi ?????t h??ng</h6> */}
                  <div className="card col-md-6 offset-md-3 offset-md-3 border-card">
                    <div className="card-body ">
                      <form>
                        <div className="form-group" >
                          <label htmlFor="username"> H??? v?? t??n:</label>
                          <input
                            className="form-control"
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={this.state.fullname}
                            onChange={this.changeFullNameHandler}
                            required="required"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone"> ??i???n tho???i:</label>
                          <input
                            className="form-control"
                            type="text"
                            id="phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.changePhoneHandler}
                            required="required"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username"> ?????a ch???:</label>
                          <input
                            className="form-control"
                            type="text"
                            id="address"
                            name="address"
                            value={this.state.address}
                            onChange={this.changeAddressHandler}
                            required="required"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username"> M?? ????n h??ng:</label>
                          <input
                            className="form-control"
                            placeholder="M?? ????n h??ng"
                            type="text"
                            id="id_order"
                            name="id_order"
                            value={this.state.id_order}
                            onChange={this.changeIdOrderHandler}
                            required
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username"> M?? kh??ch h??ng:</label>
                          <input
                            className="form-control"
                            placeholder="M?? kh??ch h??ng"
                            type="text"
                            id="id_order"
                            name="id_order"
                            value={this.state.user_id}
                            onChange={this.changeUserIdHandler}
                            required
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username"> Ghi ch??:</label>
                          <textarea
                            className="form-control"
                            placeholder="Ghi ch?? ????n h??ng n??y..."
                            type="text"
                            id="note"
                            name="note"
                            onChange={this.changeNoteHandler}
                            required
                          />
                        </div>
                        <div className="form-group">
                          
                          <input
                            className="form-control"
                            type="date"
                            type="hidden"
                           value={this.state.date}
                            onChange={this.changeDatedHandler}
                            required
                          />
                        </div>
                        <a >
                          <a onClick={() => this.submit()} style={{ width: "178px", marginTop: "11px", padding: "6px", fontSize: "14px", backgroundColor: "black", color: "white", textAlign: "center" }}>TI???P T???C THANH TO??N</a>
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      );
    }
    else {
      return (
        <div>
  <div style={{ height: "120px" }}></div>
          <section className="section-content padding-y">
            <div className="container">
              <img src="home/images/icons/mesCart.png" alt="" style={{ width: "250px", height: "250px", marginLeft: "370px" }} />
              <h5 style={{ marginLeft: "310px" }}>Kh??ng c?? s???n ph???m n??o trong gi??? h??ng c???a b???n !!!</h5>
              <a href="/" className="btn btn-danger" style={{ marginLeft: "423px", marginTop: "24px" }}>
                {" "}
                <i class="fa fa-angle-left" aria-hidden="true"></i> Ti???p t???c mua
                s???m{" "}
              </a>
            </div>{" "}
            {/* container .//  */}
          </section>


        </div>
      );
    }


  }
}

export default Order;
