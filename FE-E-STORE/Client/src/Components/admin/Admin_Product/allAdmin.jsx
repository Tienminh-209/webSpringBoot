import React, { Component } from "react";
import AdminService from "../../../Service/AdminService";
import authService from "../../../Service/UserService/auth.service";
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";

class allAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      currentPage: this.props.match.params.page,
      size: 10,
      disabled1: "",
      disabled2: "",
      showAdminBoard: false,
      currentUser: undefined,
    };
 
  
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.findAll = this.findAll.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.viewProduct = this.viewProduct.bind(this);
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
    if (this.state.currentPage > 1)   this.props.history.push("/all-product-admin/page="+(this.state.currentPage -= 1));
  
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  nextPage() {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition)   this.props.history.push("/all-product-admin/page="+(this.state.currentPage += 1));
  
    this.findAll(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  findAll(currentPage) {
    currentPage -= 1;
    AdminService.getAllAdmin(currentPage, this.state.size)
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
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    if (user !== null) {
  
      if (user.roles.includes("ROLE_ADMIN") === false) {
        authService.logout();
        this.props.history.push("/login-admin");
        
       
      }
    //   if (user.roles.includes("ROLE_ADMIN") === false) {
    //  
    // }
    }else{
      this.props.history.push("/login-admin");
    }
    this.changcurrentPage(this.state.currentPage);
    this.findAll(this.state.currentPage);
  
  }


  addProduct() {
    this.props.history.push('/admin-add-product');
    localStorage.setItem("pagePresent",this.state.currentPage);
  }
  editProduct(id) {
    this.props.history.push('/admin-update-product/' + id);
    localStorage.setItem("pagePresent",this.state.currentPage);
  }
  viewProduct(id) {
    this.props.history.push(`/view-product/${id}`);
    localStorage.setItem("pagePresent",this.state.currentPage);
  }

  deleteProduct(id) {
    AdminService.deleteProduct(id).then(res => {
      this.setState({ content: this.state.content.filter(product => product.id !== id) });
    });
  }
  render() {
    return (
      <div className="sb-top4-fixed">
        <HeaderAdmin />
        <div id="layoutSidetop4">
          <MenuAdmin />
          <div id="layoutSidetop4_content">
            <button style={{ width: "198px", height: "38px", marginTop: "40px", marginBottom: "20px", marginLeft: "20px" }} type="text" className="btn btn-success" onClick={this.addProduct}><i class="far fa-plus-square"></i> Thêm sản phẩm mới</button>
            <table class="table table-bordered" style={{ marginLeft: "20px", textAlign: "center" }}>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>#</th>
                  <th >Hình ảnh</th>
                  <th >Tên sản phẩm</th>
                  <th style={{ width: "130px" }}>Thương hiệu</th>
                  <th >Giá</th>
                  <th >Chất liệu</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.content.map((allproduct) => (
                  <tr>
                    <th scope="row">{allproduct.id}</th>
                    <td><img style={{ width: "70px", height: "100px" }} src={`http://localhost:8080/images/${allproduct.image}`} alt="" /></td>
                    <td style={{ textAlign: "center" }}>{allproduct.title}</td>
                    <td>{allproduct.brands}</td>
                    <td>{allproduct.price}</td>
                    <td>{allproduct.material}</td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <div style={{ backgroundColor: "#4ea8ff", width: "30px" }} onClick={() => this.viewProduct(allproduct.id)}><i style={{ color: "black" }} class="fas fa-eye"></i></div>
                        <div style={{ marginLeft: "10px", backgroundColor: "#ffb700", width: "30px" }} onClick={() => this.editProduct(allproduct.id)}><i style={{ color: "black" }} class="fas fa-edit"></i></div>
                        <div style={{ marginLeft: "10px", backgroundColor: "#fb2929", width: "30px" }} onClick={() => this.deleteProduct(allproduct.id)}><i style={{ color: "black" }} class="fas fa-trash-alt"></i> </div>
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

export default allAdmin;
