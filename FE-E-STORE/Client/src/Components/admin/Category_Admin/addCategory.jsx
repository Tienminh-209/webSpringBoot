import React, { Component } from 'react';
import AdminService from '../../../Service/AdminService';
import CategoryService from '../../../Service/CategoryService';
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

class addCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            // image: '',
            // imageDatas: [],
            title: '',
            link: '',
            parent_id: '1',
            loading: false,
            message: "",
            status: 'false',
            categorys: [],

        }
        // this.changeProductImage = this.changeProductImage.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeLinkHandler = this.changeLinkHandler.bind(this);
        this.changeParentIdHandler = this.changeParentIdHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
    }
    saveCategory = (e) => {
        e.preventDefault();
        let category = {
            title: this.state.title,
            link: this.state.link,
            parent_id: this.state.parent_id,
            status: this.state.status,
        };
        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AdminService.CreateCategory(category).then(
                () => {
                    this.props.history.push('/all-category-admin');
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
    componentDidMount() {
        CategoryService.getParentId().then((res) => {
            this.setState({ categorys: res.data });
        });
    }
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeLinkHandler = (event) => {
        this.setState({ link: event.target.value });
    }
    changeParentIdHandler = (event) => {
        this.setState({ parent_id: event.target.value });
    }
    changeStatusHandler = (event) => {
        this.setState({ status: event.target.value });
    }
    cancel() {
        this.props.history.push('/all-category-admin');
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
                                <i class="far fa-plus-square"></i> Thêm nhóm sản phẩm
                            </h3>
                            <div style={{ backgroundColor: "white", marginLeft: "40px", marginTop: "20px", marginRight: "30px" }}>
                                <div className="card-body">
                                    <Form
                                        onSubmit={this.saveCategory}
                                        ref={(c) => {
                                            this.form = c;
                                        }}
                                    >
                                        <div className="form-group">
                                            <label htmlFor="username">Tên nhóm sản phẩm:</label>
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
                                            <label htmlFor="password">Đường dẫn</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="password"
                                                value={this.state.link}
                                                onChange={this.changeLinkHandler}
                                                validations={[required]}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Cấp cha</label>
                                            <select class="form-select" aria-label="Default select example" style={{ width: "101px", marginTop: "5px", marginLeft: "8px", fontSize: "15px" }} onChange={this.changeParentIdHandler}>
                                                <option value="0" selected>Cấp cha mới</option>
                                                {this.state.categorys.map((category) => (
                                                    <option value={category.id} selected>{category.title}</option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Có phải cấp cha</label>
                                            <select class="form-select" aria-label="Default select example" style={{ width: "101px", marginTop: "5px", marginLeft: "8px", fontSize: "15px" }} onChange={this.changeStatusHandler}>

                                                <option value="true" selected>Đúng</option>
                                                <option value="false" selected>Sai</option>

                                            </select>
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

export default addCategory;