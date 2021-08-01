import React, { Component } from "react";
import Marquee from "react-fast-marquee";
import ProductService from "../../Service/ProductService";
class DealOf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hotsales: [],
    };
  }
  componentDidMount() {
    ProductService.getHotSale().then((res) => {
      this.setState({ hotsales: res.data });
    });
  }
  render() {
    return (
      <div>
      <header className="header header-import" style={{backgroundColor:"#fafafa"}}>
        {/* Header Main */}
        <div className="header_main" style={{ marginBottom: "0" }}>
          <div className="container">
            <div className="row">
              {/* Logo */}
              <div className="col-lg-1 col-sm-3 col-3 order-1">
                <div className="logo_container">
                  <div className="logo">
                    <a href="/" style={{ color: "red" }}>
                     <img src="../../home/images/icons/logo.png" alt="" style={{width:"217px",height:"88px",marginLeft:"-89px"}}/>
                    </a>
                  </div>
                </div>
              </div>
              {/* Search */}
              <div className="col-lg-5 col-12 order-lg-2 order-3 text-lg-left text-right">
           <Search/>
              </div>
              {/* Wishlist */}
              <div className="col-lg-4 col-9 order-lg-3 order-2 text-lg-left text-right" style={{marginLeft:"167px"}}>
                <div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
                  <div className="wishlist d-flex flex-row align-items-center justify-content-end" >
                  <div className=" row title" style={{fontWeight:"500"}}>
                    {currentUser ? (
                      <div style={{display:"flex",width:"372px",marginBottom:"0px"}}>
                        <div>
                          <Link to={"/client-user"} className="nav-link">
                            <a href="/client-user" style={{color:"black"}}>Đơn hàng</a>
                          </Link>
                        </div>
                        <div>
                          <Link className="nav-link">
                            <a href="/client-user" style={{color:"black"}}>{currentUser.username}</a>
                          </Link>
                        </div>

                        <div>
                          <a
                            href="/"
                            className="nav-link"
                            onClick={this.logOut}
                            style={{color:"black"}}
                          >
                            Đăng xuất
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div style={{display:"flex",width:"295px",marginBottom:"0px"}}>
                        <div style={{color:"black"}}>
                          <Link to={"/login"} className="nav-link" style={{color:"black"}} >
                            <div className="user_icon">
                              <img
                                src="../home/images/icons/user.png"
                                alt=""
                              />
                            </div>{" "}
                            Đăng nhập
                          </Link>
                        </div>
                        <div>
                          <Link to={"/register"} className="nav-link" style={{color:"black"}}>
                            Đăng kí
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  </div>
                  {/* Cart */}
                  <div className="cart" style={{marginTop:"20px"}}>
                    <div className="cart_container d-flex flex-row align-items-center justify-content-end">
                      <div className="cart_icon">
                       <a href="/cart"><img src="../home/images/icons/cart.png" alt="" /></a>
                      
                      </div>
                      <div className="cart_content">
                        <div className="cart_text font-family-all">
                          <a href="/cart"><i class="fas fa-shopping-cart" style={{width:"28px",height:"23px"}}></i></a>
                        </div>
                        <div className="cart_price"><strong>
                        <NumberFormat
                          value={tong} 
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        đ
                      </strong></div>
                      </div>
                      <div className="cart_count">
                      {tongsp}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    );
  }
}

export default DealOf;
