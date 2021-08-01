import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./Components/home/Home";
import Detail from "./Components/details/Detail";
import Login from "./Components/user/login.component";
import Profile from "./Components/user/profile.component";
import Register from "./Components/user/register.component";
import BoardUser from "./Components/user/board-user.component";
import BoardModerator from "./Components/user/board-moderator.component";
import BoardAdmin from "./Components/user/board-admin.component";
import Cart from "./Components/shoppingCart/Cart";
import Order from "./Components/shoppingCart/Order";
import AoPolo_Product from "./Components/product/AoPolo_Product";
import AoThun_Product from "./Components/product/AoThun_Product";
import AoSoMi_Product from "./Components/product/AoSoMi_Product";
import AoKhoac_Product from "./Components/product/AoKhoac_Product";
import QuanShort_Product from "./Components/product/QuanShort_Product";
import QuanJean_Product from "./Components/product/QuanJean_Product";
import QuanTay_Product from "./Components/product/QuanTay_Product";
import PhuKien_Product from "./Components/product/PhuKien_Product";
import Giay_Product from "./Components/product/Giay_Product";
import AdminProduct from "./Components/admin/AdminProduct";
import allAdmin from "./Components/admin/Admin_Product/allAdmin";
import addProduct_Admin from "./Components/admin/Admin_Product/addProduct_Admin";
import UserClient from "./Components/infoUser/UserClient";
import UserClientDetail from "./Components/infoUser/UserClientDetail";
import ChangeUser from "./Components/infoUser/ChangeUser";
import infoStore from "./Components/infoStore/infoStore";
import CSĐH from "./Components/infoStore/CSĐH";
import CSBH from "./Components/infoStore/CSBH";
import CSBM from "./Components/infoStore/CSBM";
import CSHT from "./Components/infoStore/CSHT";
import News from "./Components/news/News";
import SearchAll from "./Components/Search/SearchAll";
import viewProduct_Admin from "./Components/admin/Admin_Product/viewProduct_Admin";
import updateProduct_Admin from "./Components/admin/Admin_Product/updateProduct_Admin";
import SanPhamMoi_Product from "./Components/product/SanPhamMoi_Product";
import SanPhamNoiBat_Product from "./Components/product/SanPhamNoiBat_Product";
import Footer from "../src/Components/home/Footer";
import Header from "../src/Components/home/Header";
import Menu from "../src/Components/home/Menu";
import Feedbacck from "./Components/FeedBack/Feedbacck";
import allCategory from "./Components/admin/Category_Admin/allCategory";
import addCategory from "./Components/admin/Category_Admin/addCategory";
import updateCategory from "./Components/admin/Category_Admin/updateCategory";
import allNews from "./Components/admin/News_Admin/allNews";
import addNews from "./Components/admin/News_Admin/addNews";
import updateNews from "./Components/admin/News_Admin/updateNews";
import viewNews from "./Components/admin/News_Admin/viewNews";
import NewDetails from "./Components/news/NewDetails";
import AllOrder from "./Components/admin/Orders_Admin/AllOrder";
import DetailOrder from "./Components/admin/Orders_Admin/DetailOrder";
import viewFilter from "./Components/product/filter/viewFilter";
import DayLung_Product from "./Components/product/DayLung_Product";
import ViDa_Product from "./Components/product/ViDa_Product";
import MuNonProduct from "./Components/product/MuNonProduct";
import TuiXachProduct from "./Components/product/TuiXachProduct";
import MatKinhProduct from "./Components/product/MatKinhProduct";
import DoBoNiProduct from "./Components/product/DoBoNiProduct";
import BoDoVestProduct from "./Components/product/BoDoVestProduct";
import infoUser from "./Components/infoUser/infoUser";
import ChangeInfo from "./Components/infoUser/ChangeInfo";
import MenuAdmin from "./Components/admin/MenuAdmin";
import loginAdmin from "./Components/admin/loginAdmin";
import AllFeedBack from "./Components/admin/Admin_Product/FeedBack/AllFeedBack";
import login1 from "./Components/user/login1";
import slider from "./Components/Slider/slider";
function App() {
  return (
    <Router>
      <Switch>
        {/* ADMIN  */}
        {/* PRODUCT_ADMIN_START */}
        <Route path="/all-feedback" exact component={AllFeedBack}></Route>
        <Route path="/login-admin" exact component={loginAdmin}></Route>
        <Route path="/all-product-admin/page=:page" component={allAdmin}></Route>
        <Route path="/admin-add-product" component={addProduct_Admin}></Route>
        <Route
          path="/admin-update-product/:id"
          component={updateProduct_Admin}
        ></Route>
    
        <Route path="/view-product/:id" component={viewProduct_Admin}></Route>
        {/* PRODUCT_ADMIN_END */}
        {/* CATEGORY_ADMIN_START */}
        <Route path="/all-category-admin" component={allCategory}></Route>
        <Route path="/admin-add-category" component={addCategory}></Route>
        <Route
          path="/admin-update-category/:id"
          component={updateCategory}
        ></Route>
        {/*CATEGORY_ADMIN_END */}

        {/*News_ADMIN_START */}
        <Route path="/all-new-admin" component={allNews}></Route>
        <Route path="/admin-add-new" component={addNews}></Route>
        <Route path="/admin-update-new-:id" component={updateNews}></Route>
        <Route path="/view-news/:id" component={viewNews}></Route>
        {/*News_ADMIN_END */}
        {/*Order_ADMIN_START */}
        <Route path="/all-order-admin" component={AllOrder}></Route>
        <Route path="/order-details/:id" component={DetailOrder}></Route>
        {/*Order_ADMIN_END */}
        {/* END ADMIN */}
        {/* index home */}
        <div>
          <Header />
          <Menu />
          <Route path="/" exact component={Home}></Route>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/detail-product/:id" exact component={Detail}></Route>
          <Route path="/cart" exact component={Cart}></Route>
          <Route path="/order" exact component={Order}></Route>
          {/* end index home */}
          {/* user */}
          <Route path="/login" exact component={Login}></Route>
          <Route path="/login1" exact component={login1}></Route>
          <Route path="/slider" exact component={slider}></Route>
          <Route path="/profile" exact component={Profile}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          {/* end user */}
          {/* product */}
          <Route
            path="/product/ao-polo"
            exact
            component={AoPolo_Product}
          ></Route>
          <Route
            path="/product/ao-thun"
            exact
            component={AoThun_Product}
          ></Route>
          <Route
            path="/product/ao-so-mi"
            exact
            component={AoSoMi_Product}
          ></Route>
          <Route
            path="/product/ao-khoac"
            exact
            component={AoKhoac_Product}
          ></Route>
          <Route
            path="/product/quan-short"
            exact
            component={QuanShort_Product}
          ></Route>
          <Route
            path="/product/quan-jean"
            exact
            component={QuanJean_Product}
          ></Route>
          <Route
            path="/product/quan-tay"
            exact
            component={QuanTay_Product}
          ></Route>
          <Route
            path="/product/phu-kien"
            exact
            component={PhuKien_Product}
          ></Route>
          <Route path="/product/do-bo" exact component={Giay_Product}></Route>
          <Route
            path="/product/san-pham-moi"
            exact
            component={SanPhamMoi_Product}
          ></Route>
          <Route
            path="/product/san-pham-noi-bat"
            exact
            component={SanPhamNoiBat_Product}
          ></Route>
          <Route
            path="/product/day-lung"
            exact
            component={DayLung_Product}
          ></Route>
            <Route
            path="/product/vi-da"
            exact
            component={ViDa_Product}
          ></Route>
            <Route
            path="/product/mu-non"
            exact
            component={MuNonProduct}
          ></Route>
            <Route
            path="/product/balo-tui-xach"
            exact
            component={TuiXachProduct}
          ></Route>
            <Route
            path="/product/mat-kinh"
            exact
            component={MatKinhProduct}
          ></Route>
          <Route
            path="/product/do-doi"
            exact
            component={DoBoNiProduct}
          ></Route>
          <Route
            path="/product/vest-nam"
            exact
            component={BoDoVestProduct}
          ></Route>
          {/*end product */}

          {/* START-USER-CLIENT */}
          <Route exact path="/info-user" component={infoUser} />
          <Route exact path="/client-user" component={UserClient} />
          <Route
            path="/user-order-details/:id"
            component={UserClientDetail}
          ></Route>
          <Route path="/update-user/:id" component={ChangeUser}></Route>
          <Route path="/update-info/:id" component={ChangeInfo}></Route>
          {/* END-USER-CLIENT */}
          {/* Chính-sách-cửa-hàng Start */}
          <Route path="/infoStore" component={infoStore}></Route>
          <Route path="/chinh-sach-doi-hang" component={CSĐH}></Route>
          <Route path="/chinh-sach-bao-hanh" component={CSBH}></Route>
          <Route path="/chinh-sach-bao-mat" component={CSBM}></Route>
          <Route path="/chinh-sach-hoan-tien" component={CSHT}></Route>
          {/* Chính-sách-cửa-hàng End */}
          <Route path="/news" component={News}></Route>
          <Route path="/detail-news-:id" exact component={NewDetails}></Route>
          <Route path="/phan-hoi" component={Feedbacck}></Route>
          <Route path="/search/:keyword" component={SearchAll}></Route>
          <Route path="/filter/gia-thap-nhat=:price_small/gia-cao-nhat=:price_large/thuong-hieu=:brands/nhom-san-pham=:cateid" component={viewFilter}></Route>
          <Footer />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
