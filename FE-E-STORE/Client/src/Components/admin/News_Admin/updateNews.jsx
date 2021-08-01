import React, { Component } from 'react';
import AdminService from '../../../Service/AdminService';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react';
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";
var image = [];
class updateNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // step 2
            id: this.props.match.params.id,
            title: '',
            description: '',
            description_short: '',
            image: "",
            category_new: ''
        };
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeDescriptionShortHandler = this.changeDescriptionShortHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.updateNews = this.updateNews.bind(this);
    }
    // step 3
    componentDidMount() {
        AdminService.getNewsById(this.state.id).then((res) => {
            let news = res.data;
            this.setState({
                title: news.title,
                description: news.description,
                description_short: news.description_short,
                image: news.image,
                category_new: news.category_new,
            });
        });
    }
    updateNews = (e) => {
        e.preventDefault();
        let news = {
            title: this.state.title,
            description: this.state.description,
            description_short: this.state.description_short,
            image: this.state.image,
            category_new: this.state.category_new
        };
        this.addProductImage(image);
        AdminService.updateNews(news, this.state.id).then((res) => {
            this.props.history.push("/all-new-admin");
        });
    };
    addProductImage = async (productId) => {
        await AdminService.addImage(productId);
    };
    changeProductImage = (e) => {

        image = [];
        let file = e.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        this.setState({ image: file.name });
        image = imageData;

    }
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeDescriptionHandler = (event, editor) => {
        const data = editor.getData();
        this.setState({ description: data });
        console.log("STATE", { data });
    };
    changeDescriptionShortHandler = (event, editor) => {
        const data = editor.getData();
        this.setState({ description_short: data });
        console.log("STATE", { data });
    };
    changeCategoryHandler = (event) => {
        this.setState({ category_new: event.target.value });
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
                                <i class="far fa-plus-square"></i> Cập nhật tin tức
                            </h3>
                            <div style={{ backgroundColor: "white", marginLeft: "40px", marginTop: "20px", marginRight: "30px" }}>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label> Tiêu đề: </label>
                                            <input

                                                className="form-control"
                                                value={this.state.title}
                                                onChange={this.changeTitleHandler}
                                            />
                                        </div>
                                        <div style={{display:"flex"}}>   <div className="form-group">
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

                                            <div><img style={{ width: "100px",marginLeft:"5px" }} src={`http://localhost:8080/images/${this.state.image}`} alt="" /></div></div>
                                        <div className="form-group">
                                            <label> Mô tả ngắn: </label>
                                            {/* <input
                                    
                                            className="form-control"
                                            data={this.state.description}
                                            onChange={this.changeDescriptionHandler}
                                        /> */}
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onInit={(editor) => {
                                                    //// Here the editor is ready to be used
                                                }}
                                                data={this.state.description_short}
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
                                            <label> Mô tả tin tức: </label>
                                            {/* <input
                                    
                                            className="form-control"
                                            data={this.state.description}
                                            onChange={this.changeDescriptionHandler}
                                        /> */}
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onInit={(editor) => {
                                                    //// Here the editor is ready to be used
                                                }}
                                                data={this.state.description}
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
                                            <label> Thể loại tin tức: </label>
                                            <select class="form-select"
                                                value={this.state.category_new}
                                                onChange={this.changeCategoryHandler}
                                            >
                                                <option value="1">Tin tức mới</option>
                                                <option value="2">Tin tức nổi bật</option>
                                                <option value="3">Lời khuyên, chia sẻ</option>
                                                <option value="4">Sự kiện</option>
                                            </select>
                                        </div>
                                        <div style={{ display: "flex" }}
                                        >
                                            <div
                                                style={{ backgroundColor: "black", width: "150px", borderRadius: "15px", height: "35px" }}
                                                onClick={this.updateNews}
                                            >
                                                <div style={{ color: "white", textAlign: "center", marginTop: "5px" }}>Lưu tin tức</div>
                                            </div>
                                            <div
                                                style={{ backgroundColor: "black", width: "150px", borderRadius: "15px", height: "35px", marginLeft: "5px" }}
                                                onClick={this.cancel.bind(this)}
                                            >
                                                <div style={{ color: "white", textAlign: "center", marginTop: "5px" }}>Hủy</div>
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


export default updateNews;