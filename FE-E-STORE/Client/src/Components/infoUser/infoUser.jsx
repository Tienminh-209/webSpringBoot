import React, { Component } from 'react';
const userid = JSON.parse(localStorage.getItem("user"));
class infoUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname: userid.username,
            phone: userid.phone,
            address: userid.address,
            email: userid.email,
            id:userid.id
        };
        // this.submit = this.submit.bind(this);
    }
    render() {
        return (
            <div style={{ backgroundColor: "#fafafa"}}>
                  <div style={{ height: "90px" }}></div>
                <div className="row" style={{ backgroundColor: "#fafafa",marginTop:"50px" ,marginBottom:"50px"}}>
                    <div className="col-md-3" style={{marginLeft:"140px"}}>
                        <ul class="list-group title">
                            <li class="list-group-item active">Chỉnh sửa</li>
                            <li class="list-group-item"><a href={"update-info/" + this.state.id}>Chỉnh sửa thông tin</a></li>
                            <li class="list-group-item"><a href={"update-user/" + this.state.id}>Chỉnh sửa mật khẩu</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6" style={{ width: "300px" }}>
                        <div className="title" style={{ backgroundColor: "white" }}>
                            <div style={{marginBottom:"5px"}}>Thông tin của bạn:</div>
                            <div style={{marginBottom:"5px"}}>Tên đăng nhập: {this.state.fullname}</div>
                            <div style={{marginBottom:"5px"}}>Số điện thoại: {this.state.phone}</div>
                            <div style={{marginBottom:"5px"}}>Địa chỉ: {this.state.address}</div>
                            <div style={{marginBottom:"5px"}}> Email: {this.state.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default infoUser;