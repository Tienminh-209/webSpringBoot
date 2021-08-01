import React, { Component, Fragment } from "react";
import AuthService from "../../Service/UserService/auth.service";
import {
  total,
  list,
  quantity,
  add,
  remove,
  onChange,
} from "cart-localstorage";
import NumberFormat from "react-number-format";
import { Switch, Route, Link } from "react-router-dom";
import Search from "./Search";
const totalOrder=localStorage.getItem("count_order");
const tong = total();
var tongsp = list().length;
const userid = JSON.parse(localStorage.getItem("user"));
class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      carts: list(),
    };
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

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="header-position">
        <div className="row" style={{ backgroundColor: "black" }}>
          <div className="col-md-4 title" style={{ fontSize: "15px", color: "white", marginTop: "10px", marginLeft: "50px",display:"flex" }}>
            <div> Chào mừng bạn đến với E-Store</div>
            <div style={{marginLeft:"10px"}}>||</div>
            <div style={{marginLeft:"10px",fontSize: "15px"}}> Kết nối <i style={{marginLeft:"5px"}}class="fab fa-facebook-square"></i> <i style={{marginLeft:"5px"}} class="fab fa-instagram"></i></div>
          </div>
          <div className="col-md-4" style={{
            color: "white", marginTop: "9px", fontSize: "13px", marginLeft: "407px"
          }} >
            <div className="row" >
              <div className="col-md-3" ><a style={{color:"white",fontSize: "15px"}} href="/infoStore">Giới thiệu</a></div>
              <div className="col-md-3"><a style={{color:"white",fontSize: "15px"}} href="/phan-hoi">Phản hồi</a></div>
              <div className="col-md-2" >
                <a href="/cart"><i  style={{color:"white"}} class="fas fa-shopping-cart"></i> </a>
                <div style={{color:"white"}} style={{marginTop:"-30px",marginLeft:"17px"}} >{tongsp}</div>
                </div>
              <div className="col-md-3" style={{marginLeft:"-12px"}}> <li className="nav-item dropdown">
                <div className=" row title" style={{ fontWeight: "500", color: "white" ,marginTop:"2px"}}>
                  {currentUser ? (
                    <div>
                      <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="" style={{ color: "white", marginTop: "-9px", fontSize: "13px" }}>  <a href="/client-user" style={{color:"white",fontSize: "15px"}}>{currentUser.username}</a></a>
                      <div className="dropdown-menu dropdown-large">
                        <div className="row">
                          <div className="col-md-5" style={{ marginLeft: "22px", width: "160px" }}>
                            <a href="/client-user">Đơn hàng ({totalOrder})</a>
                            <a href={"/info-user" }>Quản lý tài khoản</a>
                            <a href="" onClick={this.logOut}>Đăng xuất</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="" style={{ color: "white", marginTop: "-9px", fontSize: "15px" }}>Tài khoản</a>
                      <div className="dropdown-menu dropdown-large">
                        <div className="row">
                          <div className="col-md-5" style={{ marginLeft: "22px", width: "160px" }}>
                            <a href="/login">Đăng nhập</a>
                            <a href="/register">Đăng kí</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
