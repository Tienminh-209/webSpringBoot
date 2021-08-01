import axios from 'axios';
const EMPLOYEE_API_BASE_URL_CATEGORY = 'http://localhost:8080/category';
class CategoryService {
    getCategory() {
        return axios.get("http://localhost:8080/admin/get-all-category-chirlden");
    }
    getCategoryById(categoryId) {
        return axios.get("http://localhost:8080/category" + "/" + categoryId);
    }
    getParentId() {
        return axios.get("http://localhost:8080/admin/all-parentId");
    }
    //get-all-cap-cha-ao-nam
    getParentAoNam() {
        return axios.get("http://localhost:8080/admin/children-ao-nam");
    }
    //get-all-cap-cha-quan-nam
    getParentQuanNam() {
        return axios.get("http://localhost:8080/admin/children-quan-nam");
    }
    //get-all-cap-cha-phu-kien
    getParentPhuKien() {
        return axios.get("http://localhost:8080/admin/children-phu-kien");
    }
    //get-all-cap-cha-do-bo
    getParentDoBo() {
        return axios.get("http://localhost:8080/admin/children-do-bo");
    }
    //get-all-cap-cha-do-doi
    getParentDoDoi() {
        return axios.get("http://localhost:8080/admin/children-do-doi");
    }
    //get-all-cap-cha-do-ngu
    getParentDoNgu() {
        return axios.get("http://localhost:8080/admin/children-do-ngu");
    }
}
export default new CategoryService()