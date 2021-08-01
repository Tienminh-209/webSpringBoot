import React, { Component } from 'react';
import AdminService from '../../../Service/AdminService';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react';
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";
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
class addNews extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            title: '',
            description: '',
            image: '',
            category_new: '',
            date: '',
            description_short: '',
            imageDatas: [],
            selectedFile: null,
            selectedImage: " ",
            IdproductNews: " ",
            loading: false,
            message: "",
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeDescriptionShortHandler = this.changeDescriptionShortHandler.bind(this);
        this.changeCategoryNewHandler = this.changeCategoryNewHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.saveNews = this.saveNews.bind(this);
        this.changeNewImage = this.changeNewImage.bind(this);
        this.addProductImage = this.addProductImage.bind(this);
    }
    saveNews = (e) => {
        e.preventDefault();
        let news = {
            title: this.state.title,
            description: this.state.description,
            description_short: this.state.description_short,
            date: this.state.date,
            image: this.state.image,
            category_new: this.state.category_new,
        };
        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AdminService.CreateNews(news).then(
                async (res) => {
                    this.addProductImage(image);
                    this.props.history.push('/all-new-admin');
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
    }
    addProductImage = async (productId) => {
        await AdminService.addImage(productId);
    };

    changeNewImage = (e) => {
        image = [];
        let file = e.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        this.setState({ image: file.name });
        image = imageData;
        console.log("image_new=>" + image);

    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeDescriptionHandler = (event, editor) => {
        const data = editor.getData();
        this.setState({ description: data });
    };
    changeDescriptionShortHandler = (event, editor) => {
        const data = editor.getData();
        this.setState({ description_short: data });
    };
    changeCategoryNewHandler = (event) => {
        this.setState({ category_new: event.target.value });
    }
    changeDateHandler = (event) => {
        this.setState({ date: event.target.value });
    }
    cancel() {
        this.props.history.push('/all-new-admin');
    }
    render() {
        return (
            <div className="sb-top4-fixed" style={{ backgroundColor: "#ECF0F5" }}>
                <HeaderAdmin />
                <div id="layoutSidetop4">
                    <MenuAdmin />
                    <div id="layoutSidetop4_content">
                        <div>
                            <h3 style={{ marginLeft: "36px", marginTop: "16px" }}>
                                <i class="far fa-plus-square"></i> Thêm tin tức
                            </h3>
                            <div style={{ backgroundColor: "white", marginLeft: "40px", marginTop: "20px", marginRight: "30px" }}>
                                <div className="card-body">
                                    <Form
                                        onSubmit={this.saveNews}
                                        ref={(c) => {
                                            this.form = c;
                                        }}
                                    >
                                       
                                        <div className="form-group">
                                            <label htmlFor="username">Tiêu đề:</label>
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
                                            <label htmlFor="password">Hình ảnh</label>
                                            <input
                                                name="image"
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={this.changeNewImage}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Mô tả ngắn: </label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onInit={(editor) => {
                                                    //// Here the editor is ready to be used
                                                }}

                                                value={this.state.description_short}
                                                onChange={this.changeDescriptionShortHandler}
                                                config={{
                                                    // plugins: [ Essentials ],
                                                    ckfinder: {
                                                        // The URL that the images are uploaded to.
                                                        uploadUrl: "/upload",

                                                        // Enable the XMLHttpRequest.withCredentials property.
                                                        withCredentials: true,

                                                        // Headers sent along with the XMLHttpRequest to the upload server.
                                                        headers: {
                                                            "X-CSRF-TOKEN": "CSFR-Token",
                                                            Authorization: "Bearer <JSON Web Token>",
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Mô tả tin tức</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onInit={(editor) => {
                                                    //// Here the editor is ready to be used
                                                }}

                                                value={this.state.description}
                                                onChange={this.changeDescriptionHandler}
                                                config={{
                                                    // plugins: [ Essentials ],
                                                    ckfinder: {
                                                        // The URL that the images are uploaded to.
                                                        uploadUrl: "/upload",

                                                        // Enable the XMLHttpRequest.withCredentials property.
                                                        withCredentials: true,

                                                        // Headers sent along with the XMLHttpRequest to the upload server.
                                                        headers: {
                                                            "X-CSRF-TOKEN": "CSFR-Token",
                                                            Authorization: "Bearer <JSON Web Token>",
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Thể loại tin tức:</label>
                                            <select className="form-select"
                                                value={this.state.category_new}
                                                onChange={this.changeCategoryNewHandler}
                                            >
                                                <option value="1">Tin tức mới</option>
                                                <option value="2">Tin tức nổi bật</option>
                                                <option value="3">Lời khuyên, chia sẻ</option>
                                                <option value="4">Sự kiện</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Ngày đăng:</label>
                                            <Input
                                                type="date"
                                                className="form-control"
                                                name="username"
                                                value={this.state.date}
                                                onChange={this.changeDateHandler}
                                                validations={[required]}
                                            />
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
                                                        <div style={{ color: "white", textAlign: "center", marginTop: "5px" }}><i class="fas fa-window-close"></i> Hủy</div>
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
        )
    }
}

export default addNews;