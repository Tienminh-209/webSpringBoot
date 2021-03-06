import ReactStars from "react-rating-stars-component";
import React, { Component } from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ProductService from "../../Service/ProductService";
import NumberFormat from "react-number-format";
import Carousel from "react-elastic-carousel";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import {
  list,
  add,
  quantity,
  remove,
  onChange,
} from "cart-localstorage";
import { confirmAlert } from 'react-confirm-alert';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import NewsService from "../../Service/NewsService";
const ratingChanged = (newRating) => {
  console.log(newRating);
};
class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      currentPage: 1,
      product: {},
      productimage: [],
      productrelate: [],
      event: [],
      phukien: [],
      carts: list(),
      allquan: '1',
      sizek: 'M',
    };
    this.changeimage = this.changeimage.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.ListEvent = this.ListEvent.bind(this);
    this.ListPK = this.ListPK.bind(this);
    this.ValueSizeChange = this.ValueSizeChange.bind(this);
  }
  ListEvent(currentPage) {
    currentPage -= 1;
    ProductService.getHotNewInPageOrther(currentPage, this.state.sizenew)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          event: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      });
  }
  ListPK(currentPage) {
    currentPage -= 1;
    ProductService.getProduct_TuiXach(currentPage, this.state.sizenew)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          phukien: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      });
  }
  componentDidMount() {
    this.ListPK(this.state.currentPage);
    this.ListEvent(this.state.currentPage);
    ProductService.getProductById(this.state.id).then((res) => {
      let product = res.data;
      this.setState({
        productimage: product.productimage,
        image: product.image,
        product: res.data,
      });
    });
    ProductService.getproductRelated(this.state.id).then((res) => {
      this.setState({ productrelate: res.data });
    });
  }
  changeimage(change) {
    this.setState({ image: change });
  }
  AddCart(id, title, price, image, sizek, e) {
    const quan = Number(this.state.allquan);
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
      sizek: this.state.sizek,

    }, quan);
    window.location.reload(false);
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
  }
  handleValueChange(e) {
    const value = e.target.value;
    this.setState({ allquan: value });
  }
  ValueSizeChange(e) {
    const value = e.target.value;
    this.setState({ sizek: value });
  }
  submit = (id, title, price, image, e) => {
    const x = this.state.allquan;
    const name = this.state.product.title;
    confirmAlert({
      message: 'Th??m v??o gi??? h??ng th??nh c??ng__' + x + '__' + name + '!!!',
      buttons: [
        {
          label: 'OK',
          onClick: () => this.AddCart(id, title, price, image, e),

        },
      ]
    });
  };

  render() {
    const totalprice = this.state.product.price;
    const totalpricesale = this.state.allquan * (this.state.product.price - (this.state.product.price * this.state.product.discount) / 100);
    const pricesale = (this.state.product.price - (this.state.product.price * this.state.product.discount) / 100);
    return (
      <div>
  <div style={{ height: "90px" }}></div>
        {/* section-header.// */}
        <div>
          {/* ========================= SECTION CONTENT ========================= */}
          <section className="section-content bg-white padding-y">
            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
              {/* ============================ ITEM DETAIL ======================== */}
              <div className="row">
                <aside className="col-md-2">
                  <div className="">
                    <article className="gallery-wrap">
                      {/* slider-product.// */}
                      <div className="thumbs-wrap">
                        {this.state.productimage.map((listimg) => (
                          <img
                            className="item-thumb"
                            onClick={() => this.changeimage(listimg.image)}
                            src={`http://localhost:8080/images/${listimg.image}`}
                            alt="logo"
                          />
                        ))}
                      </div>{" "}
                      {/* slider-nav.// */}
                    </article>{" "}
                    {/* gallery-wrap .end// */}
                  </div>{" "}
                  {/* card.// */}
                </aside>
                <aside className="col-md-4">
                  <div >
                    <article className="gallery-wrap">
                      <div className="img-big-wrap">
                        <div>
                          {" "}
                          <TransformWrapper>
                            <TransformComponent>
                              <img style={{ width: "355px" }} src={`http://localhost:8080/images/${this.state.image}`} alt="test" />
                            </TransformComponent>
                          </TransformWrapper>
                          {/* <InnerImageZoom className="zoom"  src={`${process.env.PUBLIC_URL}/../${this.state.image}`} zoomSrc={`${process.env.PUBLIC_URL}/../${this.state.image}`} /> */}

                        </div>
                      </div>{" "}
                    </article>{" "}
                    {/* gallery-wrap .end// */}
                  </div>{" "}
                  {/* card.// */}
                </aside>
                <main className="col-md-6">
                  <article className="product-info-aside">
                    <h2 className="title mt-3 title">
                      {this.state.product.title}
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
                    </h2>


                    <div style={{ display: "flex" }}>
                      <div className="title">Gi?? b??n:</div>
                      <div className="price-detail" > <NumberFormat
                        value={totalpricesale}
                        displayType={"text"}
                        thousandSeparator={true}
                      />  <sup>??</sup></div>
                      <del><div  > <NumberFormat
                        value={totalprice}
                        displayType={"text"}
                        thousandSeparator={true}
                      />  <sup>??</sup></div></del>
                    </div>{" "}
                    <div style={{ display: "flex", marginTop: "10px" }} >
                      <div className="title" style={{ marginTop: "10px" }}>K??ch c???:</div>
                      <div>
                        <select class="form-select" aria-label="Default select example" style={{ width: "101px", marginTop: "5px", marginLeft: "8px", fontSize: "15px" }} onChange={this.ValueSizeChange}>
                          <option value="M" selected>M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                        </select></div>
                      <div>
                        <select class="form-select" aria-label="Default select example" style={{ width: "101px", marginTop: "5px", marginLeft: "8px", fontSize: "15px" }} onChange={this.handleValueChange}>
                          <option value="1" selected>1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10" >10</option>
                        </select></div>
                      <div className="form-group col-md" >
                        <a className="btn  btn-dark" style={{ marginRight: "10px", marginTop: "4px", height: "36px" }} onClick={(e) => this.submit(this.state.product.id, this.state.product.title,pricesale, this.state.product.image, this.state.sizek)} >
                          <i style={{ color: "white" }} className="fas fa-shopping-cart" />{" "}
                          <span style={{ color: "white" }}>Th??m v??o gi??? h??ng</span>
                        </a>
                      </div>
                    </div>
                    <div><img src="../home/images/banners/bannerDetail.jpg" alt="" style={{ width: "642px", height: "106px", marginTop: "17px" }} /></div>

                    <div className="product-policy" style={{ marginTop: "20px" }}>
                      <p>
                      </p>
                      <ul className="no-bullets">
                        <li>
                          <span className="icon">
                            <img src="//theme.hstatic.net/200000053174/1000707876/14/pro_policy_icon1.png?v=272" alt="?????i tr??? <strong>mi???n ph?? 15 ng??y</strong> b???t c??? l???i s???n ph???m khi nh???n h??ng" />
                          </span>
                          <span className="info">?????i tr??? <strong>mi???n ph?? 15 ng??y</strong> b???t c??? l???i s???n ph???m khi nh???n h??ng</span>
                        </li>
                        <li>
                          <span className="icon">
                            <img src="//theme.hstatic.net/200000053174/1000707876/14/pro_policy_icon2.png?v=272" alt="Tr??? h??ng ho??n ti???n v?? c?? b??u t?? l???y h??ng t???n n??i" />
                          </span>
                          <span className="info">Tr??? h??ng ho??n ti???n v?? c?? b??u t?? l???y h??ng t???n n??i</span>
                        </li>
                        <li>
                          <span className="icon">
                            <img src="//theme.hstatic.net/200000053174/1000707876/14/pro_policy_icon3.png?v=272" alt="MI???N PH?? SHIP T??? <strong>600K</strong>" />
                          </span>
                          <span className="info">MI???N PH?? SHIP T??? <strong>600K</strong></span>
                        </li>
                        <li>
                          <span className="icon">
                            <img src="//theme.hstatic.net/200000053174/1000707876/14/pro_policy_icon4.png?v=272" alt="Ship h??ng v?? ki???m tra h??ng t???i nh?? tr?????c khi thanh to??n" />
                          </span>
                          <span className="info">Ship h??ng v?? ki???m tra h??ng t???i nh?? tr?????c khi thanh to??n</span>
                        </li>
                        <li>
                          <span className="icon">
                            <img src="//theme.hstatic.net/200000053174/1000707876/14/pro_policy_icon5.png?v=272" alt="????ng t??i, h???p <strong>mi???n ph??</strong> v???i t???t c??? ????n h??ng" />
                          </span>
                          <span className="info">????ng t??i, h???p <strong>mi???n ph??</strong> v???i t???t c??? ????n h??ng</span>
                        </li>
                        <li>
                          <span className="icon">
                            <img src="//theme.hstatic.net/200000053174/1000707876/14/pro_policy_icon6.png?v=272" alt="Cam k???t gi?? t???t nh???t v???i ch???t l?????ng t???t nh???t" />
                          </span>
                          <span className="info">Cam k???t gi?? t???t nh???t v???i ch???t l?????ng t???t nh???t</span>
                        </li>
                      </ul>
                    </div>


                    {/* row.// */}
                  </article>
                  {/* product-info-aside .// */}
                </main>{" "}
                {/* col.// */}
              </div>{" "}
              <section className="section-name padding-y bg">
                <div >
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="title" style={{
                        fontWeight: "bold",
                        fontSize: "15px"
                      }}><i class="fa fa-align-left" aria-hidden="true"></i> M?? T???:</h5>
                      <div className="title">{ReactHtmlParser(this.state.product.description)}</div>
                      <h5 className="title" style={{
                        marginTop: "10px", fontWeight: "bold",
                        fontSize: "15px"
                      }}><i class="fa fa-align-left" aria-hidden="true"></i> THI???T K???:</h5>
                      <div className="title">{ReactHtmlParser(this.state.product.design)}</div>
                      <h5 className="title" style={{
                        marginTop: "10px", fontWeight: "bold",
                        fontSize: "15px"
                      }}><i class="fa fa-align-left" aria-hidden="true"></i> TH??NG TIN CHI TI??T:</h5>
                      <table className="table table-bordered title" style={{ fontWeight: "bold", color: "black" }}>
                        <tbody><tr> <th colSpan={2}>Th??ng s???:</th> </tr>
                          <tr> <td>Th????ng hi???u</td><td>{this.state.product.brands}</td> </tr>
                          <tr> <td>Ch???t li???u</td><td>{this.state.product.material}</td> </tr>
                          <tr> <td>Gi???m</td> <td> {this.state.product.discount} %</td></tr>
                          <tr> <td>S??? l?????ng</td> <td> C??n l???i {this.state.product.amount} s???n ph???m</td></tr>
                        </tbody></table>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          marginTop: "10px",
                        }}
                      >
                        <i class="fa fa-align-left" aria-hidden="true"></i> H?????NG
                        D???N CH???N SIZE
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <div className="title" style={{ marginBottom: "3px" }}><i style={{ width: "10px" }} sty class="fas fa-circle"></i> Size M: 50-57kg / Cao 1m53 ??? 1m68</div>
                        <div className="title" style={{ marginBottom: "3px" }}><i style={{ width: "10px" }} sty class="fas fa-circle"></i> Size L: 58-64kg / Cao 1m57 ??? 1m70</div>
                        <div className="title" style={{ marginBottom: "3px" }}><i style={{ width: "10px" }} sty class="fas fa-circle"></i> Size XL: 65-70kg / Cao 1m66 ??? 1m76</div>
                        <div className="title" style={{ marginBottom: "3px" }}><i style={{ width: "10px" }} sty class="fas fa-circle"></i>  Size XXL: 71-76kg / Cao 1m70 ??? 1m85</div>
                      </div>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          marginTop: "20px",
                        }}
                      >
                        <i class="fa fa-align-left" aria-hidden="true"></i> H?????NG
                        D???N B???O QU???N
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <div className="title" style={{ marginBottom: "3px" }}><i style={{ width: "10px" }} sty class="fas fa-circle"></i> Gi???t m??y v???i chu k??? trung b??nh v?? v??ng quay ng???n</div>
                        <div className="title" style={{ marginBottom: "3px" }}><i style={{ width: "10px" }} sty class="fas fa-circle"></i> Gi???t v???i nhi???t ????? t???i ??a 30 ????? C</div>
                        <div className="title" style={{ marginBottom: "3px" }}><i style={{ width: "10px" }} sty class="fas fa-circle"></i> S???y ??? nhi???t ????? th?????ng </div>
                        <div className="title" style={{ marginBottom: "3px" }}><i style={{ width: "10px" }} sty class="fas fa-circle"></i> L?? ???i ??? nhi???t ????? th???p</div>
                      </div>
                    </div> {/* col.// */}
                    <aside className="col-md-4">
                      <div>
                        <header className="section-heading heading-line">
                          <p className="title-section text-uppercase" style={{ color: "black" }}>S???n ph???m m???i</p>
                        </header>
                        {this.state.event.map((hotnew) => (

                          <div className="row">
                            <div className="col-md-3">
                              <a className="img-wrap" href="#">
                                <span className="badge badge-danger"> NEW </span>
                                <a href={"http://localhost:3000/detail-product/" + hotnew.id}> <img style={{ width: "128px", height: "123px", marginTop: "-29px", marginBottom: "15px" }} src={`http://localhost:8080/images/${hotnew.image}`} /></a>
                              </a>
                            </div> {/* col.// */}
                            <div className="col-md-6" style={{ width: "72%", marginTop: "14px" }}>
                              <div>
                                <a className="title" style={{ color: "black", fontSize: "16px" }} href={"http://localhost:3000/detail-product/" + hotnew.id}>{hotnew.title}</a>
                              </div> {/* info-main.// */}
                              <div>
                                <NumberFormat style={{ color: "black", marginLeft: "3px", fontWeight: "bold" }} value={hotnew.price - (hotnew.price * hotnew.discount / 100)} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup>
                                <del style={{ color: "black", marginLeft: "10px", fontSize: "16px" }}><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup></del>

                              </div> {/* info-main.// */}
                            </div> {/* col.// */}

                          </div>

                        ))}

                      </div>
                    </aside> {/* col.// */}
                  </div> {/* row.// */}
                </div> {/* container .//  */}
              </section>

              {/* row.// */}
              {/* ================ ITEM DETAIL END .// ================= */}
            </div>{" "}
            {/* container .//  */}
          </section>
        </div>
        <div>
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase title">S???n ph???m li??n quan</h4>
          </header>
          <div className="row">
            <Carousel itemsToShow={4} style={{ height: "460px" }}>

              {this.state.productrelate.map((hotnew) => (
                <div className="col-md-3">
                  <a href={"http://localhost:3000/detail-product/" + hotnew.id}>
                    <img
                      src={`http://localhost:8080/images/${hotnew.image}`}
                      style={{ width: "260px", height: "345px", marginLeft: "-97px" }}
                    />
                  </a>
                  <div className="title-product-news-tab" style={{ marginLeft: "-100px" }}>{hotnew.title}</div>
                  <div>
                    <del style={{ color: "#666", marginLeft: "-100px", fontSize: "16px" }}><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup></del>
                    <NumberFormat className="price-tab" style={{ color: "#000000", marginLeft: "10px", fontSize: "18px" }} value={hotnew.price - (hotnew.price * hotnew.discount) / 100} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup>
                  </div>
                </div>
              ))}



            </Carousel>
            {/* <a href="http://localhost:3000/product/san-pham-moi"> <button style={{width:"137px",marginLeft:"618px",marginTop:"11px",padding:"6px",fontSize:"14px",backgroundColor:"white",color:"black"}}>XEM TH??M</button></a> */}
          </div>
        </div>
        <div>
          <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase title">Ph??? ki???n mua k??m</h4>
          </header>
          <div className="row">
            <Carousel itemsToShow={4} style={{ height: "460px" }}>

              {this.state.phukien.map((hotnew) => (
                <div className="col-md-3">
                  <a href={"http://localhost:3000/detail-product/" + hotnew.id}>
                    <img
                      src={`http://localhost:8080/images/${hotnew.image}`}
                      style={{ width: "260px", height: "345px", marginLeft: "-97px" }}
                    />
                  </a>
                   <div className="title-product-news-tab" style={{ marginLeft: "-100px" }}>{hotnew.title}</div>
                  <div>
                    <del style={{ color: "#666", marginLeft: "-100px", fontSize: "16px" }}><NumberFormat value={hotnew.price} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup></del>
                    <NumberFormat className="price-tab" style={{ color: "#000000", marginLeft: "10px", fontSize: "18px" }} value={hotnew.price - (hotnew.price * hotnew.discount) / 100} displayType={'text'} thousandSeparator={true} /><sup style={{ fontSize: "12px" }}>??</sup>
                  </div>
                </div>
              ))}



            </Carousel>
            {/* <a href="http://localhost:3000/product/san-pham-moi"> <button style={{width:"137px",marginLeft:"618px",marginTop:"11px",padding:"6px",fontSize:"14px",backgroundColor:"white",color:"black"}}>XEM TH??M</button></a> */}
          </div>
        </div>
        <div id="comment" className="border">
          <h5 className="title" style={{ fontWeight: "bold", marginLeft: "34px" }}>B??NH LU???N</h5>
          <div class="fb-comments" style={{ marginLeft: "30px" }} data-href="http://localhost:3000" data-width="1300" data-numposts="1"></div>
        </div>
      </div>
    );
  }
}

export default Detail;
