import React, { Component } from "react";
import {
  total,
  list,
  quantity,
  add,
  remove,
  onChange,
} from "cart-localstorage";
import { confirmAlert } from 'react-confirm-alert';
import NumberFormat from "react-number-format";
import Header from "../home/Header";
import Footer from "../home/Footer";
import { Link } from "react-router-dom";
import AuthService from "../../Service/UserService/auth.service";
import ProductService from '../../Service/ProductService';
const tong = total();
const user = localStorage.getItem("user");
class Cart extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      carts: list(),
      voucher: "",
      voucher2: [],
    };
    this.changeValueVoucher = this.changeValueVoucher.bind(this);
  }
  AddCart(id, title, price, image, e) {
    add({ id: id, title: title, price: price, image: image });
    onChange();
  }
  DeleteAddCart(id) {
    quantity(id, -1);
  }
  RemoveAddCart(id) {
    remove(id);
    if ((localStorage.getItem("__cart")) == "[]") {
      localStorage.removeItem("__cart");
    }
    window.location.reload(false);
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  checkout() {
    if (user == null) {
      this.props.history.push(`/login`);
    } else {
      this.props.history.push(`/order`);
    }
  }
  continueShopping() {
    this.props.history.push(`/`);
  }
  logOut() {
    AuthService.logout();
  }
  changeValueVoucher(e) {
    const value = e.target.value;
    this.setState({ voucher: value });
  }
  componentDidMountVoucher() {
    ProductService.getVoucher().then((res) => {
      this.setState({ voucher2: res.data });
    });
  }
  submit = (id) => {
    confirmAlert({
      message: 'Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng.',
      buttons: [
        {
          label: 'OK',
          onClick: () => this.RemoveAddCart(id),

        },
        {
          label: 'Hủy',
          onClick: () => this.onClose
        }
      ]
    });
  };
  render() {
    const { currentUser } = this.state;
    if (localStorage.getItem("__cart") != null) {
      return (
        <div>
          <div style={{height:"90px"}}></div>
          <section className="section-content padding-y">
            <div className="container1">
              <div className="row">
                <main className="col-md-9">
                  <div className="card">
                    <table className="table table-borderless table-shopping-cart">
                      <thead className="text-muted">
                        <tr className="small text-uppercase">
                          <th scope="col-3"><div style={{marginLeft:"72px"}}>Tên sản phẩm</div></th>
                          <th scope="col" width={120}>
                           Số lượng
                          </th>
                          <th scope="col" width={120}>
                          <div style={{marginLeft:"-14px",width:"100px"}}> Giá sản phẩm</div>
                          </th>
                          <th scope="col" width={120}>
                           Tổng giá trị
                          </th>
                          <th scope="col" className="text-right" width={200}>
                            {" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.carts.map((cat) => (
                          <tr>
                            <td>
                              <figure className="itemside">
                                <div className="aside">
                                  <img
                                    className="img-sm"
                                    style={{ marginLeft: "42px" }}
                                    src={`http://localhost:8080/images/${cat.image}`}
                                    alt="logo"
                                  />
                                </div>
                                <figcaption className="info">
                                  <a href="#" className="title text-dark">
                                    {cat.title}
                                  </a>
                                  <p className="text-muted small">
                                    Size: {cat.sizek} <br />
                                  </p>
                                </figcaption>
                              </figure>
                            </td>
                            <td style={{ display: "flex" }}>
                              <a
                              style={{backgroundColor:"white",width:"21px",textAlign:"center"}}
                            type="button"
                                href=""
                                onClick={(e) =>
                                  this.AddCart(
                                    cat.id,
                                    cat.title,
                                    cat.price,
                                    cat.image,
                                    e
                                  )
                                }
                              >
                                <i
                                  class="fa fa-chevron-circle-up"
                                  aria-hidden="true"
                                  style={{color:"black"}}
                                ></i>
                              </a>
                              <a type="button" style={{backgroundColor:"white",width:"21px",textAlign:"center"}}>{cat.quantity}</a>
                              <a
                               
                              style={{backgroundColor:"white",width:"21px",textAlign:"center"}}
                                type="button"
                                href=""
                                onClick={(e) => this.DeleteAddCart(cat.id)}
                              >
                                <i
                                  class="fa fa-chevron-circle-down"
                                  aria-hidden="true"
                                  style={{color:"black"}}
                                ></i>
                              </a>
                            </td>
                            <td>
                              <div>
                                <var className="price-tab">
                                  <NumberFormat
                                  style={{marginLeft:"-18px"}}
                                    value={cat.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />
                                  đ
                                </var>
                              </div>{" "}
                              {/* price-wrap .// */}
                            </td>
                            <td>
                              <div>
                                <var className="price-tab">
                                  <NumberFormat
                                       style={{marginLeft:"-9px"}}
                                    value={cat.price * cat.quantity}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />
                                  đ
                                </var>
                              </div>{" "}
                              {/* price-wrap .// */}
                            </td>
                            <td className="text-right">
                              <a
                               
                                onClick={(e) => this.submit(cat.id)}
                              >
                                {" "}
                               <div> <i  class="fas fa-trash" style={{ color: "black",width:"100px"}}></i></div>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="card-body border-top">
                      <a href="#" className="float-md-right">
                        {/* {" "}///////////////////// */}
                        {/* {currentUser ? (
                          <div>
                            <div className="btn btn-success">
                              <a style={{color:"white"}} href="/order">
                                Thanh toán
                              </a>
                            </div>
                          </div>
                        ) : (

                        
                          <div>
                            <div className="btn btn-success">
                              <Link style={{color:"white"}} to={"/login"}>
                                Thanh toán
                              </Link>
                            </div>
                          </div>
                        )} */}
                         <button onClick={() => this.checkout()} style={{ width: "137px", marginLeft: "618px", marginTop: "11px", padding: "6px", fontSize: "14px", backgroundColor: "white", color: "black" }}>THANH TOÁN</button>
                        {/* ////////////////////// */}{" "}
                      </a>
                      <button onClick={() => this.continueShopping()} style={{ width: "160px", marginTop: "11px", padding: "6px", fontSize: "14px", backgroundColor: "white", color: "black" }}>TIẾP TỤC MUA SẮM</button>
                      {/* ////////////////////// */}{" "}
                      {/* <button onClick={()=>this.order()}>check</button> */}
                    </div>
                  </div>{" "}
                  {/* card.// */}
                  {/* <div className="alert alert-success mt-3">
                    <p className="icontext">
                      <i className="icon text-success fa fa-truck" /> Free
                      Delivery within 1-2 weeks
                    </p>
                  </div> */}
                </main>{" "}
                {/* col.// */}
                <aside className="col-md-3">
                  {/* <div className="card mb-3 ">
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label>Have coupon?</label>
                          <div className="input-group">
                            <input
                              style={{ width: "200px" }}
                              type="text"
                              className="form-control"
                              onChange={this.changeValueVoucher}
                              placeholder="Coupon code"
                            />
                            <span className="input-group-append">
                              <button onClick={() => this.Apply()} style={{ backgroundColor: "black" }}><p style={{ color: "white" }}>Apply</p></button>
    
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                 
                  </div> */}
                  {/* card .// */}
                  <div className="card">
                    <div className="card-body">
                      <dl className="dlist-align">
                        <dt>Tổng hóa đơn:</dt>
                        <dd className="text-right price-tab">
                          <strong>
                            <NumberFormat
                              value={tong}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            đ
                          </strong>
                        </dd>
                      </dl>
                      <hr />
                      <p className="text-center mb-3">
                        <img src="home/images/misc/payments.png" height={26} />
                      </p>
                    </div>{" "}
                    {/* card-body.// */}
                  </div>{" "}
                  {/* card .// */}
                </aside>
                {/* col.// */}
              </div>
            </div>{" "}
            {/* container .//  */}
          </section>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{height:"113px"}}></div>
          <section className="section-content padding-y">
            <div className="container">
              <img src="home/images/icons/mesCart.png" alt="" style={{ width: "250px", height: "250px", marginLeft: "370px" }} />
              <h5 style={{ marginLeft: "310px" }}>Không có sản phẩm nào trong giỏ hàng của bạn !!!</h5>
              <a href="/" className="btn btn-danger" style={{ marginLeft: "423px", marginTop: "24px" }}>
                {" "}
                <i class="fa fa-angle-left" aria-hidden="true"></i> Tiếp tục mua
                sắm{" "}
              </a>
            </div>{" "}
            {/* container .//  */}
          </section>
        </div>
      );
      ///////////////////////////////////////////////////
      ///////////////////////////////////////////////////


    }
  }
}

export default Cart;
