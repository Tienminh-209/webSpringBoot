import ReactStars from "react-rating-stars-component";
import React, { Component } from "react";
import ProductService from "../../Service/ProductService";
import NumberFormat from "react-number-format";
import { quantity, add, onChange } from 'cart-localstorage';
import { confirmAlert } from 'react-confirm-alert';
const ratingChanged = (newRating) => {
  console.log(newRating);
};
class ProductHot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      currentPage: 1,
      size: 8,
      disabled1: "",
      disabled2: "",
      sizek:''
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.hotBest = this.hotBest.bind(this);
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
    this.hotBest(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  nextPage() {
    let condition = Math.ceil(this.state.totalElements / this.state.size);
    if (this.state.currentPage < condition) this.state.currentPage += 1;
    this.hotBest(this.state.currentPage);
    this.changcurrentPage(this.state.currentPage);
  }
  hotBest(currentPage) {
    currentPage -= 1;
    ProductService.getHotBest(currentPage, this.state.size)
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
    this.hotBest(this.state.currentPage);
  }
  AddCart(id, title, price, image,sizek, e) {
    if ((localStorage.getItem("cart_id")) == null) {
      var crypto = require("crypto");
      var id_order = crypto.randomBytes(3).toString("hex");
      localStorage.setItem("cart_id", id_order);
    } else {
      id_order = (localStorage.getItem("cart_id"));
    }
    add({
      id: id,
      title: title,
      price: price,
      image: image,
      id_order,
      sizek:this.state.sizek,
    });
    window.location.reload(false);
    onChange();
  
  }
  DeleteAddCart(id) {
    quantity(id, -1)
  }
  submit = (id,title,price,image,sizek,e) =>{
    confirmAlert({
      message: 'Thêm vào giỏ hàng thành công!!!!',
      buttons: [
        {
          label: 'OK',
          onClick: () => this. AddCart(id, title, price, image,sizek, e),
          
        },
      ]
    });
  };
  render() {
    return (
      <div>
        <div>

<h2 className="section-title-product" style={{marginLeft:"545px"}}>
  Sản phẩm nổi bật
</h2>

</div>
<div>
<div style={{marginLeft:"30px",marginRight:"30px"}}>
        <div className="home-product">
          <div className="row sm-gutter">
            {this.state.content.map((hotnew) => (
              <div className="col-md-3">
                <a className="home-product-item">
                  <a href={"http://localhost:3000/detail-product/" + hotnew.id}><div className="home-product-item-img" style={{ backgroundImage: `url(${`http://localhost:8080/images/${hotnew.image}`}` }}>  </div></a>
                
                 <a href={"http://localhost:3000/detail-product/" + hotnew.id}><h4 className="home-product-item-name">{hotnew.title}</h4></a>
                  <div className="home-product-item__price">
                    <span className="home-product-item__price-old"><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></span>
                    <span className="home-product-item__price-current"><NumberFormat value={hotnew.price-(hotnew.price*hotnew.discount/100)} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>đ</sup></span>
                  </div>
                  <div className="home-product-item__action">
                    <span className="home-product-item__like home-product-item__like--liked">
                    Còn lại: {hotnew.amount} sản phẩm
                    </span>
                    <div className="home-product-item__rating">
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                    </div>
                    <span className="home-product-item__sold">22 đã bán</span>
                  </div>
                  <div className="home-product-item__origin">
                    <span className="home-product-item__brand">.</span>
                    <span className="home-product-item__origin-name" style={{fontSize:"16px"}}>{hotnew.brands}</span>
                  </div>
                  <div className="home-product-item__favourite">
                    <i className="fas fa-check" />
                    <span>HOT</span>
                  </div>
                  <div className="home-product-item__sale-off">
                    <span className="home-product-item__sale-off-percent">-{hotnew.discount}%</span>
                  </div>
                </a>
              </div>
            ))}

          </div>
        </div>
        {/* <a href="http://localhost:3000/product/san-pham-noi-bat"> <button style={{width:"137px",marginLeft:"575px",marginTop:"17px",padding:"6px",fontSize:"14px",backgroundColor:"white",color:"black"}}>XEM THÊM</button></a> */}
      </div>
</div>
      </div>
    );
  }
}

export default ProductHot;
