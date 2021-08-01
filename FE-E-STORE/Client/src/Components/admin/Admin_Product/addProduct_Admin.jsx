import React, { Component } from "react";
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";

import AdminService from "../../../Service/AdminService";
import CategoryService from "../../../Service/CategoryService";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react';
import { Multiselect } from "multiselect-react-dropdown";
import ProductService from "../../../Service/ProductService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Bắt buộc nhập !!!
      </div>
    );
  }
};
var image = [];
var arraynew = [];
var arrayrelated = [];
var arrayimages = [];
var seletedImage = [];
const date = new Date().toLocaleDateString();
class addProduct_Admin extends Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      // step 2
      id: this.props.match.params.id,
      title: "",
      description: "",
      image: "",
      price: "",
      amount: "",
      brands: "Yame",
      color: "",
      design: "",
      design: "",
      material: "",
      cateid: "",
      categorys: [],
      imageDatas: [],
      selectedFile: null,
      selectedValueProduct: [],
      selectedImage: " ",
      IdproductNews: " ",
      loading: false,
      message: "",
    };

    this.onSelectPro = this.onSelectPro.bind(this);
    this.onRemovePro = this.onRemovePro.bind(this);

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeImageHandler = this.changeImageHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.changeAmountHandler = this.changeAmountHandler.bind(this);
    this.changeBrandHandler = this.changeBrandHandler.bind(this);
    this.changeColorHandler = this.changeColorHandler.bind(this);
    this.changeMaterialHandler = this.changeMaterialHandler.bind(this);
    this.changeDesignHandler = this.changeDesignHandler.bind(this);
    this.changeDiscountlHandler = this.changeDiscountlHandler.bind(this);
    this.changeCateHandler = this.changeCateHandler.bind(this);
    this.saveOrupDateProduct = this.saveOrupDateProduct.bind(this);
    this.addProductImage = this.addProductImage.bind(this);
    this.changeProductImage = this.changeProductImage.bind(this);
  }
  // step 3
  componentDidMount() {
    CategoryService.getCategory().then((res) => {
      this.setState({ categorys: res.data });
    });
    ProductService.getAllProductNoPaginiton().then((response) => {
      this.setState({ product: response.data, arrayrelated: response.data });

    });

  }
  saveOrupDateProduct = (e) => {
    e.preventDefault();
    let product = {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      price: this.state.price,
      amount: this.state.amount,
      brands: this.state.brands,
      color: this.state.color,
      design: this.state.design,
      discount: this.state.discount,
      material: this.state.material,
      cateid: this.state.cateid,
    };
    console.log("product => " + JSON.stringify(product));
    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AdminService.CreateProduct(product).then(
        async (res) => {
          for (const f of this.state.imageDatas) {
            this.addProductImage(f);
          }
          this.addProductImage(image);
          let ProductNew = res.data;
          this.setState({ IdproductNews: ProductNew.id });
          console.log("id =>" + this.state.IdproductNews);

          await AdminService.updateimages(seletedImage, this.state.IdproductNews).then((res) => {

          });
          await AdminService.updateprolated(arrayrelated, this.state.IdproductNews).then((res) => {

          });
          this.props.history.push("/all-product-admin/page=" + localStorage.getItem("pagePresent"));
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }

  };
  addProductImage = async (productId) => {
    await AdminService.addImage(productId);
  };
  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  changeDescriptionHandler = (event, editor) => {
    const data = editor.getData();
    this.setState({ description: data });
  };

  changeProductImage = (e) => {

    image = [];
    let file = e.target.files[0];
    const imageData = new FormData();
    imageData.append('imageFile', file);
    this.setState({ image: file.name });
    image = imageData;

  }

  changeImageHandler = (event) => {

    let files = event.target.files;

    let imageArrays = [];
    seletedImage = [];
    for (const f of files) {
      const imageData = new FormData();
      imageData.append('imageFile', f);
      imageArrays.push(imageData);
      seletedImage.push({
        image: f.name
      });
    }
    this.setState({ imageDatas: imageArrays });
    console.log("images => " + JSON.stringify(seletedImage));
  };
  changePriceHandler = (event) => {
    this.setState({ price: event.target.value });
  };
  changeAmountHandler = (event) => {
    this.setState({ amount: event.target.value });
  };
  changeBrandHandler = (event) => {
    this.setState({ brands: event.target.value });
  };
  changeColorHandler = (event) => {
    this.setState({ color: event.target.value });
  };
  changeMaterialHandler = (event) => {
    this.setState({ material: event.target.value });
  };
  changeDesignHandler = (event, editor) => {
    const data = editor.getData();
    this.setState({ design: data });
  };
  changeDiscountlHandler = (event) => {
    this.setState({ discount: event.target.value });
  };
  changeCateHandler = (event) => {
    this.setState({ cateid: event.target.value });
  };
  cancel() {
    this.props.history.push("/all-product-admin/page=" + localStorage.getItem("pagePresent"));
  }




  onSelectPro = (selectedValueProduct) => {
    arrayrelated = [];
    if (selectedValueProduct) {
      selectedValueProduct.forEach((se) => {
        arrayrelated.push({
          product_id: se.id,
          title: `${se.title}`,
        });
      });
    }
  };
  onRemovePro = (selectedValueProduct) => {
    arrayrelated = [];
    if (selectedValueProduct) {
      selectedValueProduct.forEach((se) => {
        arrayrelated.push({
          product_id: se.id,
          title: `${se.title}`,
        });
      });
      console.log(arrayrelated);
    }
  };
  render() {
    return (
      <div className="sb-top4-fixed" style={{ backgroundColor: "#ECF0F5" }}>
        <HeaderAdmin />
        <div id="layoutSidetop4">
          <MenuAdmin />
          <div id="layoutSidetop4_content">
            <div >
           <div style={{display:"flex"}}>
              <h3 style={{ marginLeft: "36px", marginTop: "16px" }}>
                <i class="far fa-plus-square"></i> Thêm sản phẩm mới
              </h3></div>
              <div style={{ backgroundColor: "white", marginLeft: "40px", marginTop: "20px", marginRight: "30px" }}>
                <div className="card-body">
                  <Form
                    onSubmit={this.saveOrupDateProduct}
                    ref={(c) => {
                      this.form = c;
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">     <div className="form-group">
                        <label htmlFor="username">Tên sản phẩm: </label>
                        <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.title}
                          onChange={this.changeTitleHandler}
                          validations={[required]}
                        />
                      </div>
                        <div className="form-group">
                          <label htmlFor="username"> Hình ảnh: </label>
                          <input
                            name="image"
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={this.changeProductImage}
                          />
                        </div>
                        <div><img style={{ width: "100px", marginLeft: "10px" }} src={`http://localhost:8080/images/${this.state.image}`} alt="" /></div>
                        <div className="form-group">
                          <label htmlFor="username"> Hình ảnh liên quan: <p style={{ float: "right", marginLeft: "10px" }}>(Giữ Ctrl để chọn nhiều ảnh)</p></label>
                          <input
                            name="image"
                            type="file"
                            placeholder="Giữ Ctrl để chọn nhiều ảnh"
                            multiple
                            className="form-control"
                            accept="image/*"
                            onChange={this.changeImageHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Giá tiền</label>
                          <Input
                            type="number"
                            min="1"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.changePriceHandler}
                            validations={[required]}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">Số lượng</label>
                          <Input
                            type="number"
                            min="1"
                            className="form-control"
                            value={this.state.amount}
                            onChange={this.changeAmountHandler}
                            validations={[required]}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Giảm: (%) </label>
                          <Input
                            type="number"
                            min="0"
                            className="form-control"
                            value={this.state.discount}
                            onChange={this.changeDiscountlHandler}
                            validations={[required]}
                          />
                        </div>
                       
                        </div>
                      <div className="col-md-6">      <div className="form-group">
                        <label htmlFor="password">Mô tả sản phẩm:  </label>
                        < CKEditor
                          editor={ClassicEditor}

                          onInit={editor => {

                          }}
                          value={this.state.description}
                          style={{ height: "126px" }}
                          onChange={this.changeDescriptionHandler}
                        />
                      </div>
                        <div className="form-group">
                          <label htmlFor="password">Mô tả thiết kế:</label>
                          < CKEditor
                            editor={ClassicEditor}

                            onInit={editor => {

                            }}
                            value={this.state.design}
                            style={{ height: "126px" }}
                            onChange={this.changeDesignHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Chất liệu:  </label>
                          <Input
                            type="text"
                            className="form-control"
                            value={this.state.material}
                            onChange={this.changeMaterialHandler}
                            validations={[required]}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Thương hiệu:  </label>
                          <select class="form-select"
                            value={this.state.brands}
                            onChange={this.changeBrandHandler}
                            validations={[required]}
                          >
                            <option value="Yame">Yame</option>
                            <option value="HK">HK</option>
                            <option value="HAT">HAT</option>
                            <option value="E-STORE">E-STORE</option>

                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Sản phẩm liên quan:  </label>
                          <Multiselect
                            options={this.state.product} // Options to display in the dropdown
                            selectedValues={this.state.selectedValueProduct} // Preselected value to persist in dropdown
                            onSelect={this.onSelectPro} // Function will trigger on select event
                            onRemove={this.onRemovePro} // Function will trigger on remove event
                            displayValue="title" // Property name to display in the dropdown options
                            selectionLimit="6"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Nhóm sản phẩm:  </label>
                          <select class="form-select"
                            value={this.state.cateid}
                            onChange={this.changeCateHandler}
                          >
                            {this.state.categorys.map((category) => (
                              <option value={category.id}>{category.title}</option>
                            ))}


                          </select>
                        </div></div>
                    </div>


                    <div className="form-group">
                      <button
                        style={{ border: "white" }}
                        disabled={this.state.loading}
                      >

                        <div style={{ display: "flex" }}
                        >
                          <div
                            style={{ backgroundColor: "black", width: "80px", borderRadius: "15px", height: "35px" }}
                          >
                            <div style={{ color: "white", textAlign: "center", marginTop: "5px" }}><i class="far fa-save"></i> Lưu</div>
                          </div>
                          <div
                            style={{ backgroundColor: "black", width: "80px", borderRadius: "15px", height: "35px", marginLeft: "5px" }}
                            onClick={this.cancel.bind(this)}
                          >
                            <div style={{ color: "white", textAlign: "center", marginTop: "5px" }}><i class="fas fa-window-close"></i> Quay lại</div>
                          </div>
                        </div>

                      </button>
                    </div>

                    {this.state.message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {this.state.message}
                        </div>
                      </div>
                    )}
                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkBtn = c;
                      }}
                    />
                  </Form>
                </div>
              </div>
            </div>


            <FooterAdmin />
          </div>
        </div>
      </div>
    );
  }
}
export default addProduct_Admin;
