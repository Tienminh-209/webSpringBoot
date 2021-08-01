import React, { Component } from "react";
import CategoryService from "../../Service/CategoryService";
import Search from "./Search";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorys: [],
      aoNams:[],
      quanNams: [],
      phuKiens: [],
      doBos: [],
      doDois: [],
      doNgus: [],
    };
  }
  componentDidMount() {
    CategoryService.getParentId().then((res) => {
      this.setState({ categorys: res.data });
    });
    //get-cap-cha-ao-nam
    CategoryService.getParentAoNam().then((res) => {
      this.setState({ aoNams: res.data });
    });
     //get-cap-cha-quan-nam
    CategoryService.getParentQuanNam().then((res) => {
      this.setState({ quanNams: res.data });
    });
     //get-cap-cha-phu-kien
    CategoryService.getParentPhuKien().then((res) => {
      this.setState({ phuKiens: res.data });
    });
     //get-cap-cha-do-bo
    CategoryService.getParentDoBo().then((res) => {
      this.setState({ doBos: res.data });
    });
     //get-cap-cha-do-doi
    CategoryService.getParentDoDoi().then((res) => {
      this.setState({ doDois: res.data });
    });
     //get-cap-cha-do-ngu
    CategoryService.getParentDoNgu().then((res) => {
      this.setState({ doNgus: res.data });
    });
  }
  render() {
    return (
      <div>
        <div style={{height:"31px"}}></div>
         <div className="row" style={{backgroundColor:"#fafafa",position:"fixed",zIndex:"10"}}>
       <div className="col-md-1">  <img  src={`${process.env.PUBLIC_URL}/home/images/icons/logo.png`} alt="" style={{width:"156px",height:"63px",marginLeft:"51px",marginTop:"12px"}}/></div>
       <div className="col-md-9">
       <div className="titlemenu">
        <nav className="navbar navbar-main navbar-expand pl-0" >
          <ul className="navbar-nav flex-wrap titlemenu" style={{marginLeft:"-30px",color:"black",fontWeight:"600"}}>
            <li className="nav-item">
              <a className="nav-link title" href="/"><i class="fas fa-home"></i> Trang chủ</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="http://localhost:3000/product/ao-nam"><i class="fas fa-tshirt"></i> Áo nam </a>
              <div className="dropdown-menu dropdown-large">
                <div className="row">
                  <div className="col-md-5" style={{marginLeft:"22px",width:"160px"}}>
                  {this.state.aoNams.map((hotnew) => (
                    <a href={"http://localhost:3000/"+ hotnew.link}>{hotnew.title}</a>
                  ))}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="http://localhost:3000/product/quan-nam"><img src="home/images/icons/quan-nam.png" alt="" /> Quần nam </a>
              <div className="dropdown-menu dropdown-large">
              <div className="row">
                  <div className="col-md-5" style={{marginLeft:"22px",width:"160px"}}>
                  {this.state.quanNams.map((hotnew) => (
                    <a href={"http://localhost:3000/"+ hotnew.link}>{hotnew.title}</a>
                  ))}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="http://localhost:3000/product/phu-kien"><img src="home/images/icons/phu-kien.png" alt="" /> Phụ kiện </a>
              <div className="dropdown-menu dropdown-large">
              <div className="row">
                  <div className="col-md-5" style={{marginLeft:"22px",width:"160px"}}>
                  {this.state.phuKiens.map((hotnew) => (
                    <a href={"http://localhost:3000/"+ hotnew.link}>{hotnew.title}</a>
                  ))}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="http://localhost:3000/product/do-bo"><img src="home/images/icons/sportswear.png" alt="" /> Đồ bộ </a>
              <div className="dropdown-menu dropdown-large">
              <div className="row">
                  <div className="col-md-5" style={{marginLeft:"22px",width:"160px"}}>
                  {this.state.doBos.map((hotnew) => (
                    <a  href={"http://localhost:3000/"+ hotnew.link}>{hotnew.title}</a>
                  ))}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/news"><i class="far fa-newspaper"></i> Tin tức</a>
            </li>
          </ul>
        </nav>

      </div>
       </div>
       <div className="col-md-1" style={{marginTop:"-10px"}}>
         <Search/>
       </div>
     </div>

      </div>
        );
  }
}

export default Menu;
