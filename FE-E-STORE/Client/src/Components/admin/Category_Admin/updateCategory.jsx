import React, { Component } from 'react';
import AdminService from '../../../Service/AdminService';
import CategoryService from '../../../Service/CategoryService';
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../HeaderAdmin";
import MenuAdmin from "../MenuAdmin";
class updateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // step 2
            id: this.props.match.params.id,
            status: "",
            title: "",
            link: "",
            parent_id:'',
            categorys:[]
        };
        this.changeParentIdHandler = this.changeParentIdHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);  
        this.changeLinkHandler = this.changeLinkHandler.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
    }
    // step 3
    componentDidMount() {
        CategoryService.getParentId().then((res) => {
            this.setState({ categorys: res.data });
        });
        AdminService.getCategoryById(this.state.id).then((res) => {
            let category = res.data;
            this.setState({
                parent_id:category.parent_id,
                status: category.status,
                title: category.title,
                link: category.link,
            });
        });
    }
    updateCategory = (e) => {
        e.preventDefault();
        let category = {
            parent_id:this.state.parent_id,
            status: this.state.status,
            title: this.state.title,
            link: this.state.link,
        };
        AdminService.updateCategory(category, this.state.id).then((res) => {
            this.props.history.push("/all-category-admin");
        });
    };
    changeParentIdHandler = (event) => {
        this.setState({ parent_id: event.target.value });
    };
    changeImageHandler = (event) => {
        this.setState({ status: event.target.value });
    };
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    };
    changeLinkHandler = (event) => {
        this.setState({ link: event.target.value });
    };
    cancel() {
        this.props.history.push("/all-category-admin");
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
                            <i class="far fa-plus-square"></i> Cập nhật nhóm sản phẩm
                        </h3>
                        <div style={{ backgroundColor: "white", marginLeft: "40px", marginTop: "20px", marginRight: "30px" }}>
                        <div className="card-body">
                                <form>
                               
                                    <div className="form-group">
                                        <label> Tên nhóm sản phẩm: </label>
                                        <input
                                    
                                            className="form-control"
                                            value={this.state.title}
                                            onChange={this.changeTitleHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Đường dẫn: </label>
                                        <input
                                           ư
                                            className="form-control"
                                            value={this.state.link}
                                            onChange={this.changeLinkHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                            <label>Cấp cha</label>
                                            <select  value={this.state.parent_id} class="form-select" aria-label="Default select example" style={{ width: "155px", marginTop: "5px", marginLeft: "8px", fontSize: "15px" }} onChange={this.changeParentIdHandler}>
                                                <option value="0" selected>Cấp cha mới</option>
                                                {this.state.categorys.map((category) => (
                                                    <option value={category.id} selected>{category.title}</option>
                                                ))}

                                            </select>
                                        </div>
                                <div className="form-group">
                                            <label>Có phải cấp cha</label>
                                            <select style={{width:"100px"}} value={this.state.status} class="form-select" aria-label="Default select example" style={{ width: "155px", marginTop: "5px", marginLeft: "8px", fontSize: "15px" }} onChange={this.changeStatusHandler}>

                                                <option value="true" selected>Đúng</option>
                                                <option value="false" selected>Sai</option>

                                            </select>
                                        </div>

                                    <div style={{ display: "flex" }}
                                    >
                                        <div
                                            style={{ backgroundColor: "black", width: "80px", borderRadius: "15px", height: "35px" }}
                                            onClick={this.updateCategory}
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


export default updateCategory;