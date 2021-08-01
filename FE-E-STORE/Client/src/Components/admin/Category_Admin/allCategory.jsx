import React, { Component } from 'react';
import AdminService from '../../../Service/AdminService';
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";

class allCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
          content: [],
          currentPage: 1,
          size: 10,
          disabled1: "",
          disabled2: "",
        };
    
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.findAll = this.findAll.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
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
        AdminService.getAllCategory(currentPage, this.state.size)
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
      }
      addCategory() {
        this.props.history.push('/admin-add-category');
      }
      editCategory(id){
        this.props.history.push('/admin-update-category/'+id);
      }
      deleteCategory(id) {
        AdminService.deleteCategory(id).then(res => {
          this.setState({ content: this.state.content.filter(content => content.id !== id) });
        });
      }
      render() {
        return (
          <div className="sb-top4-fixed">
            <HeaderAdmin />
            <div id="layoutSidetop4">
              <MenuAdmin />
              <div id="layoutSidetop4_content">
              <button style={{width:"200px",height:"38px",marginTop:"40px",marginBottom:"20px",marginLeft:"20px"}}  type="text" className="btn btn-success" onClick={this.addCategory}><i class="far fa-plus-square"></i> Thêm nhóm sản phẩm</button>
                <table class="table table-bordered" style={{ marginLeft: "20px",textAlign:"center" }}>
                  <thead>
                    <tr style={{textAlign:"center"}}>
                      <th>#</th>
                      <th >Tên sản phẩm</th>
                      <th >Đường dẫn</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.content.map((allproduct) => (
                      <tr>
                        <th scope="row">{allproduct.id}</th>
                        <td style={{textAlign:"center"}}>{allproduct.title}</td>
                        <td>{allproduct.link}</td>
                        <td>
                        <div style={{display:"flex"}}>
                      <div style={{ marginLeft: "10px",backgroundColor:"#ffb700",width:"30px",borderRadius:"3px" }}  onClick={() => this.editCategory(allproduct.id)}><i style={{color:"black"}} class="fas fa-edit"></i></div>
                      <div style={{ marginLeft: "10px",backgroundColor:"#fb2929",width:"30px",borderRadius:"3px"  }} onClick={() => this.deleteCategory(allproduct.id)}><i style={{color:"black"}} class="fas fa-trash-alt"></i> </div>
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


export default allCategory;