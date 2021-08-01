import axios from "axios";
class AdminService {
    //    PRODUCT_START
    getAllAdmin(page) {
        return axios.get("http://localhost:8080/admin/all-product?page=" + page);

    }
    CreateProduct(product) {
        return axios.post("http://localhost:8080/admin/addProduct", product);
    }
    async addImage(imageData) {
        return axios.post(`http://localhost:8080/admin/addimage`, imageData
        , {
            onUploadProgress: progressEvent => {
                console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
            }
        });
    }
    async addProductImage(imageData, productId, type) {
        const response = await axios.post(`http://localhost:8080/admin/add-product-image/${productId}`, imageData, {
            onUploadProgress: progressEvent => {
                console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
            },
            params: {
                type
            }
        });
    }
    updateprolated(productrelated, id) {
        return axios.put(
          "http://localhost:8080/admin/productrelated/" + id,
          productrelated
        );
      }
      updateimages(productimages,id) {
        return axios.put(
          "http://localhost:8080/admin/product-images/"+id,
          productimages
        );
      }
    getProductById(productId) {
        return axios.get("http://localhost:8080/admin" + '/' + productId);
    }
    updateProduct(product, productId) {
        return axios.put("http://localhost:8080/admin" + '/' + productId, product);
    }
    updateProductRelated(product, productId) {
        return axios.put("http://localhost:8080/admin/productrelated" + '/' + productId, product);
    }
    deleteProduct(productId) {
        return axios.delete("http://localhost:8080/admin" + '/' + productId);
    }
    // PRODUCT_END
    // CATEGORY_START
    getAllCategory(page) {
        return axios.get("http://localhost:8080/admin/all-category?page=" + page);

    }
    CreateCategory(category) {
        return axios.post("http://localhost:8080/admin/addCategory", category);
    }
    async addCategoryImage(imageData, productId, type) {

        const response = await axios.post(`http://localhost:8080/admin/add-product-image/category/${productId}`, imageData, {
            onUploadProgress: progressEvent => {
                console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
            },
            params: {
                type
            }
        });
    }
    getCategoryById(categoryId) {
        return axios.get("http://localhost:8080/admin/category" + '/' + categoryId);
    }
    updateCategory(category, categoryId) {
        return axios.put("http://localhost:8080/admin/category" + '/' + categoryId, category);
    }
    deleteCategory(categoryId) {
        return axios.delete("http://localhost:8080/admin/category" + '/' + categoryId);
    }
    // CATEGORY_END
      // News_START
      getAllNew(page) {
        return axios.get("http://localhost:8080/admin/all-news?page=" + page);
    }
    CreateNews(news) {
        return axios.post("http://localhost:8080/admin/addNews", news);
    }
    // async addImageNews(imageData) {
    //     return axios.post(`http://localhost:8080/admin/addimage`, imageData
    //     , {
    //         onUploadProgress: progressEvent => {
    //             console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
    //         }
    //     });
    // }
    getNewsById(newsId) {
        return axios.get("http://localhost:8080/admin/new" + '/' + newsId);
    }
    updateNews(news, newsId) {
        return axios.put("http://localhost:8080/admin/news" + '/' + newsId, news);
    }
    deleteNews(newsId) {
        return axios.delete("http://localhost:8080/admin/news" + '/' + newsId);
    }
    // New_END
}
export default new AdminService();