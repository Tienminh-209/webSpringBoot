import React, { Component } from 'react';
import ProductService from '../../Service/ProductService';
import Footer from '../home/Footer';
import Header from '../home/Header';
import Menu from '../home/Menu';
import { confirmAlert } from 'react-confirm-alert';
class Feedbacck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            email: '',
            topic: '',
            description: '',
            date:'',
            
        }
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeTopicHandler = this.changeTopicHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.saveFeedBack1 = this.saveFeedBack1.bind(this);
    }

    saveFeedBack1 = (e) => {
        e.preventDefault();
        let feedback = {
            email: this.state.email,
            topic: this.state.topic,
            description: this.state.description,
            date: this.state.date,
        };
        // console.log("product => " + JSON.stringify(feedback));
        ProductService.saveFeedback(feedback).then((res) => {
        });
        alert("Cảm ơn phản hồi của bạn.");
        window.location.reload(false)
    };
    submit = () => {
        confirmAlert({
            message: 'Cảm ơn bạn đã đóng góp ý kiến!!!!',
            buttons: [
                {
                    label: 'OK',
                    onClick: () => this.saveFeedBack1(),
                },
            ]
        });
    };
    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    changeTopicHandler = (event) => {
        this.setState({ topic: event.target.value });
    }

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }
    changeDateHandler = (event) => {
        this.setState({ date: event.target.value });
    }
    render() {
        return (
            <div style={{ backgroundColor: "#fafafa" }}>
  <div style={{ height: "90px" }}></div>
                <div className="text-new"><i style={{ width: "23px", height: "23px", color: "#ff2b2b" }} class="fas fa-book-open"></i>Phản hồi khách hàng</div>
                <div className="row">
                    <div className="col-md-5" style={{ backgroundColor: "white", marginBottom: "30px", padding: "18px 80px 20px 75px", marginLeft: "40px" }}>
                        <div className="contact-info">
                            <h2>Our Office</h2>
                            <div>
                                <div class="feedback"><i className="fa fa-map-marker" /> 412 Lê Văn Sỹ. P14.Q3. TPHCM</div>
                                <div class="feedback"><i className="fa fa-envelope" /> cskh@eshop.com</div>
                                <div class="feedback"><i className="fa fa-phone" /> 0355223384</div>
                            </div>

                        </div>
                        <div className="social" style={{ display: "flex" }}>
                            <i class="fab fa-facebook-square" style={{ color: "#224fa2", marginRight: "20px" }}></i>
                            <i class="fab fa-instagram-square" style={{ color: "#d21429", marginRight: "20px" }}></i>
                            <i class="fab fa-youtube " style={{ color: "red", marginRight: "20px" }}></i>
                            <i class="fab fa-tiktok " style={{ color: "#000000", marginRight: "20px" }}></i>
                        </div>
                    </div>
                    <div className="col-md-5" style={{ backgroundColor: "white", marginLeft: "40px", marginBottom: "30px" }}>
                        <form>
                            <div className="form-group">
                                <label> Email: </label>
                                <input type="email" placeholder="Email của bạn ...." className="form-control"
                                    value={this.state.email} onChange={this.changeEmailHandler} />
                            </div>
                            <div className="form-group">
                                <label>Góp ý: </label>
                                <textarea className="form-control"
                                    value={this.state.description} onChange={this.changeDescriptionHandler} />
                            </div>
                            <div className="form-group">
                                <label> Chủ đề: </label>
                                <select  class="form-select" aria-label="Default select example" style={{ width: "211px", marginTop: "5px", marginLeft: "8px", fontSize: "15px" }} value={this.state.topic} onChange={this.changeTopicHandler}>
                                    <option value="Chất lượng sản phẩm" selected>Chất lượng sản phẩm</option>
                                    <option value="Đóng gói, giao hàng">Đóng gói, giao hàng</option>
                                    <option value="Thái độ nhân viên">Thái độ nhân viên</option>
                                    <option value="Hợp tác">Hợp tác</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label> Ngày phản hồi: </label>
                                <input type="date"  className="form-control"
                                    value={this.state.date} onChange={this.changeDateHandler} />
                            </div>
                            <button style={{ backgroundColor: "black", width: "100px" }} onClick={this.saveFeedBack1}><span style={{ color: "white" }}>Gửi</span></button>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Feedbacck;