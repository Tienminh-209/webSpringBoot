import React, { Component } from 'react';
import AdminService from '../../../Service/AdminService';
import CategoryService from '../../../Service/CategoryService';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react';
import MenuAdmin from "../MenuAdmin";
import { Multiselect } from "multiselect-react-dropdown";
import ProductService from '../../../Service/ProductService';
import axios from 'axios';
var image = [];
var arraynew = [];
var arrayrelated = [];
var arrayimages = [];
var seletedImage = [];
class updateProduct_Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // step 2
            id: this.props.match.params.id,
            title: "",
            description: "",
            image: "",
            price: "",
            price_sale: "",
            amount: "",
            brands: "",
            design: "",
            discount: "",
            color: "",
            material: "",
            size: "",
            cateid: "",
            categorys: [],
            selectedValueProduct: [],
            imageDatas: [],
            imagess: ""

        };
        console.log("datatat", this.state.imagess);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changePriceSaleHandler = this.changePriceSaleHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.changeBrandHandler = this.changeBrandHandler.bind(this);
        this.changeColorHandler = this.changeColorHandler.bind(this);
        this.changeMaterialHandler = this.changeMaterialHandler.bind(this);
        this.changeSizeHandler = this.changeSizeHandler.bind(this);
        this.changeCateHandler = this.changeCateHandler.bind(this);
        this.saveOrupDateProduct = this.saveOrupDateProduct.bind(this);
        this.changeProductImage = this.changeProductImage.bind(this);
        this.changeDesignHandler = this.changeDesignHandler.bind(this);
        this.changeDiscountHandler = this.changeDiscountHandler.bind(this);
    }
    // step 3
    componentDidMount() {
        CategoryService.getCategory().then((res) => {
            this.setState({ categorys: res.data });
        });
        // step 4
        AdminService.getProductById(this.state.id).then((res) => {
            let product = res.data;
            this.setState({
                title: product.title,
                description: product.description,
                image: product.image,
                price: product.price,
                price_sale: product.price_sale,
                amount: product.amount,
                brands: product.brands,
                design: product.design,
                discount: product.discount,
                color: product.color,
                material: product.material,
                size: product.size,
                cateid: product.cateid,
            });

            this.setState({ imagess: product.image });
            this.setState({
                selectedValueProduct: product.productrelate
            });
            arrayrelated = product.productrelate;

        });
        ProductService.getAllProductNoPaginiton().then((response) => {
            this.setState({ product: response.data });
        });
    }
    saveOrupDateProduct = (e) => {
        e.preventDefault();
        let product = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            price_sale: this.state.price_sale,
            design: this.state.design,
            discount: this.state.discount,
            amount: this.state.amount,
            brands: this.state.brands,
            color: this.state.color,
            material: this.state.material,
            size: this.state.size,
            cateid: this.state.cateid,
        };
        console.log("product => " + JSON.stringify(arrayrelated));
        this.addProductImage(image);
        AdminService.updateProduct(product, this.state.id).then((res) => {

        });

        if (seletedImage !== '[]') {
            AdminService.updateimages(seletedImage, this.state.id).then((res) => {
            });
        }
        if (this.state.selectedValueProduct !== '[]')
            AdminService.updateprolated(arrayrelated, this.state.id).then((res) => {
            });
        alert("Cập nhật sản phẩm thành công");
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
    changeDesignHandler = (event, editor) => {
        const data = editor.getData();
        this.setState({ design: data });
    };
    changeDiscountHandler = (event) => {
        this.setState({ discount: event.target.value });
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
        console.log("images => " + this.state.image);
    };
    changePriceHandler = (event) => {
        this.setState({ price: event.target.value });
    };
    changePriceSaleHandler = (event) => {
        this.setState({ price_sale: event.target.value });
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
    changeSizeHandler = (event) => {
        this.setState({ size: event.target.value });
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
                        <div>
                            <h3 style={{ marginLeft: "36px", marginTop: "16px" }}>
                                <i class="far fa-plus-square"></i> Cập nhật phẩm mới
                            </h3>
                            <div style={{ backgroundColor: "white", marginLeft: "40px", marginTop: "20px", marginRight: "30px" }}>
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label> Tên sản phẩm: </label>
                                                    <input
                                                        name="title"
                                                        className="form-control"
                                                        value={this.state.title}
                                                        onChange={this.changeTitleHandler}
                                                    />
                                                </div>
                                              <div style={{display:"flex"}}>
                                              <div className="form-group">
                                                    <label> Hình ảnh: </label>
                                                    <input
                                                        name="image"
                                                        type="file"
                                                        className="form-control"
                                                        accept="image/*"
                                                        style={{width:"100px"}}
                                                        onChange={this.changeProductImage}
                                                    />
                                                </div>
                                                <div>  <img style={{width:"100px",marginLeft:"10px"}} src={`http://localhost:8080/images/${this.state.imagess}`} alt="" /></div>
                                              </div>
                                                <div className="form-group">
                                                    <label> Hình ảnh liên quan: <p style={{ float: "right", marginLeft: "10px" }}>(Giữ Ctrl để chọn nhiều ảnh)</p></label>
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
                                                    <label> Giá tiền: </label>
                                                    <input
                                                        name="price"
                                                        className="form-control"
                                                        value={this.state.price}
                                                        onChange={this.changePriceHandler}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label> Thương hiệu: </label>
                                                    <input
                                                        name="brands"
                                                        className="form-control"
                                                        value={this.state.brands}
                                                        onChange={this.changeBrandHandler}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label> Sản phẩm liên quan: </label>
                                                    <Multiselect
                                                        options={this.state.product} // Options to display in the dropdown
                                                        selectedValues={this.state.selectedValueProduct} // Preselected value to persist in dropdown
                                                        onSelect={this.onSelectPro} // Function will trigger on select event
                                                        onRemove={this.onRemovePro} // Function will trigger on remove event
                                                        displayValue="title" // Property name to display in the dropdown options
                                                        selectionLimit="6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label> Mô tả sản phẩm: </label>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={this.state.description}
                                                        onInit={editor => {
                                                        }}
                                                        onChange={this.changeDescriptionHandler}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label> Mô tả thiết kế: </label>
                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={this.state.design}
                                                        onInit={editor => {
                                                        }}
                                                        onChange={this.changeDesignHandler}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label> Chất liệu: </label>
                                                    <input
                                                        name="material"
                                                        className="form-control"
                                                        value={this.state.material}
                                                        onChange={this.changeMaterialHandler}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label> Giảm giá: </label>
                                                    <input
                                                        name="material"
                                                        className="form-control"
                                                        value={this.state.discount}
                                                        onChange={this.changeDiscountHandler}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label> Màu sắc: </label>
                                                    <input
                                                        style={{ width: "50px" }}
                                                        type="color"
                                                        name="color"
                                                        className="form-control"
                                                        value={this.state.color}
                                                        onChange={this.changeColorHandler}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label> Số lượng: </label>
                                                    <input
                                                        name="amount"
                                                        className="form-control"
                                                        value={this.state.amount}
                                                        onChange={this.changeAmountHandler}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label> Nhóm sản phẩm: </label>
                                                    <select class="form-select"
                                                        value={this.state.cateid}
                                                        onChange={this.changeCateHandler}
                                                    >
                                                        {this.state.categorys.map((category) => (
                                                            <option value={category.id}>{category.title}</option>
                                                        ))}


                                                    </select>
                                                </div>
                                            </div>

                                        </div>






                                        <div style={{ display: "flex" }}
                                        >
                                            <div
                                                style={{ backgroundColor: "black", width: "80px", borderRadius: "15px", height: "35px" }}
                                                onClick={this.saveOrupDateProduct}
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
                                    </form>
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

export default updateProduct_Admin;