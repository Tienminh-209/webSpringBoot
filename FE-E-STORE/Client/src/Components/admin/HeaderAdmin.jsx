import React, { Component } from 'react';
import authService from '../../Service/UserService/auth.service';

class HeaderAdmin extends Component {
  constructor(props) {
    super(props);
    this.logoutAdmin = this.logoutAdmin.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logoutAdmin() {
    authService.logoutAdmin();
  }
    render() {
      const { currentUser } = this.state;
        return (
            <div>
               <top4 className="top1 top2 top2-top3 top2-dark bg-dark">
          {/* top4bar Brand*/}
          <a className="top2-brand ps-3" href="index.html">
           Trang quản trị E-Store
          </a>
          {/* Sidebar Toggle*/}
          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
          >
            <i className="fas fa-bars" />
          </button>
          {/* top4bar Search*/}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div style={{display:"flex"}}>
              <input
                className="form-control"
                type="text"
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="btntop4barSearch"
              />
              <div
              style={{backgroundColor:"#4ea8ff",width:"30px",marginBottom:"0"}}
              >
                <i style={{marginLeft:"7px",marginTop:"9px"}} className="fas fa-search" />
              </div>
            </div>
          </form>
          {/* top4bar*/}
          <ul className="top2-top4 ms-auto ms-md-0 me-3 me-lg-4">
            <li className="top4-top5 dropdown">
              <a
                className="top4-link dropdown-toggle"
                id="top4barDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-fw"/>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="top4barDropdown"
              >
                 {currentUser ? (
                <li>
                    <a href="">{currentUser.username}</a>
                 <a href="" onClick={this.logoutAdmin}>Đăng xuất</a>
                </li>
                    ) : (
               
                <li>
                   <a href="/login-admin">Đăng nhập</a>
                </li>
                   )}
              </ul>
            </li>
          </ul>
        </top4>
      
            </div>
        );
    }
}

export default HeaderAdmin;