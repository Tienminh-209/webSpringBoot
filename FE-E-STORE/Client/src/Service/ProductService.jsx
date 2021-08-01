import axios from "axios";
const EMPLOYEE_API_BASE_URL_HOT_SALE = "http://localhost:8080/sale";
const EMPLOYEE_API_BASE_URL_SEARCH = "http://localhost:8080/search?keyword=";
const EMPLOYEE_API_BASE_URL_ALLPRODUCT = "http://localhost:8080/product";
class ProductService {
  getHotNew(page) {
    return axios.get("http://localhost:8080/new?page=" + page);
  }

  getHotNewInPageOrther(page) {
    return axios.get("http://localhost:8080/newinpageorther?page=" + page);
  }
  getHotBest(page) {
    return axios.get("http://localhost:8080/best?page=" + page);
  }
  getHotBestInPageOrther(page) {
    return axios.get("http://localhost:8080/bestinpageorther?page=" + page);
  }
  getHotSale() {
    return axios.get(EMPLOYEE_API_BASE_URL_HOT_SALE);
  }
  getAllProduct(page) {
    return axios.get("http://localhost:8080/product?page=" + page);
  }
  getProductById(productId) {
    return axios.get(
      EMPLOYEE_API_BASE_URL_ALLPRODUCT + "/" + "detail" + "/" + productId
    );
  }
  getPagination(page) {
    return axios.get("http://localhost:8080/product?page=" + page);
  }
  getproductRelated(id) {
    return axios.get(EMPLOYEE_API_BASE_URL_ALLPRODUCT + "/" + "related" + "/" + id);
  }
  getSearch(keyword) {
    return axios.get("http://localhost:8080/?keyword=" + keyword);
  }
  findByTitle(title) {
    return axios.get(`http://localhost:8080/tutorials?title=${title}`);
  }
  // Product 
  getProduct_AoThun(page) {
    return axios.get("http://localhost:8080/ao-thuns?page=" + page);
  }
  getProduct_AoSoMi(page) {
    return axios.get("http://localhost:8080/ao-somis?page=" + page);
  }
  getProduct_AoKhoac(page) {
    return axios.get("http://localhost:8080/ao-khoacs?page=" + page);
  }
  getProduct_Polo(page) {
    return axios.get("http://localhost:8080/ao-polos?page=" + page);
  }
  getProduct_QuanShort(page) {
    return axios.get("http://localhost:8080/quan-short?page=" + page);
  }
  getProduct_QuanJean(page) {
    return axios.get("http://localhost:8080/quan-jean?page=" + page);
  }
  getProduct_QuanTay(page) {
    return axios.get("http://localhost:8080/quan-tay?page=" + page);
  }
  getProduct_PhuKien(page) {
    return axios.get("http://localhost:8080/phu-kiens?page=" + page);
  }
  getProduct_Giay(page) {
    return axios.get("http://localhost:8080/do-bos?page=" + page);
  }
  getProduct_DoBo(page) {
    return axios.get("http://localhost:8080/do-bos?page=" + page);
  }
  getProduct_DayLung(page) {
    return axios.get("http://localhost:8080/that-lungs?page=" + page);
  }
  getProduct_ViDa(page) {
    return axios.get("http://localhost:8080/vi-das?page=" + page);
  }
  getProduct_MuNon(page) {
    return axios.get("http://localhost:8080/mu-nons?page=" + page);
  }
  getProduct_TuiXach(page) {
    return axios.get("http://localhost:8080/tui-xachs?page=" + page);
  }
  getProduct_MatKinh(page) {
    return axios.get("http://localhost:8080/mat-kinhs?page=" + page);
  } 
  getProduct_BoDoVest(page) {
    return axios.get("http://localhost:8080/do-bo-vest-nam?page=" + page);
  }
  getProduct_BoDoNi(page) {
    return axios.get("http://localhost:8080/do-bo-ni-nam?page=" + page);
  }
  getAllProductNoPaginiton() {
    return axios.get("http://localhost:8080/productall");
  }

  // Product End
  getSearch(keyword) {
    return axios.get("http://localhost:8080/search", {
      params: {
        keyword
      }
    });
  }
  getVoucher() {
    return axios.get("http://localhost:8080/voucher");
  }
  // save-Feed-Back
  saveFeedback(feedback) {
    return axios.post("http://localhost:8080/feedback", feedback);
  }
  //get-all-feedback
  getAllFeedback(page) {
    return axios.get("http://localhost:8080/feedback?page=" + page);
  }
  deleteImages(id) {
    return axios.get("http://localhost:8080/admin/delete-product-image/" + id);
  }
  getAllSlider() {
    return axios.get("http://localhost:8080/slider");
  }
  getFilter(price_small, price_large, brands,cateid) {
    return axios.get("http://localhost:8080/filter", {
      params: {
        price_small,
        price_large,
        brands,
        cateid
      },
    });
  }
}

export default new ProductService();
