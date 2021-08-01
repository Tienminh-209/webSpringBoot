import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/infos";

class OrdersService {
  CreateInfos(info) {
    return axios.post(EMPLOYEE_API_BASE_URL, info);
  }
  ListOrder(userid){
    return axios.get("http://localhost:8080/list_order"+'/'+userid);
}
ListOrderDetail(id_order){
    return axios.get("http://localhost:8080/list_order/list_product"+'/'+id_order);
}
deleteOrder(idor){
    return axios.delete("http://localhost:8080/info_order" + '/' + idor);
}
deleteOrderDetail(idor){
    return axios.delete("http://localhost:8080/order_detail" + '/' + idor);
}
//lay-tat-ca-don-hang
getAllOrder(page){
  return axios.get("http://localhost:8080/allorder?page="+page);
}
//get-info-user-by-id
getInfoUserById(idor){
  return axios.get("http://localhost:8080/info_user"+'/'+idor);
}
}

export default new OrdersService();
