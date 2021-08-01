import axios from "axios";

class NewsService {
  ListNews(page) {
    return axios.get("http://localhost:8080/news?page=" + page);
  }
  ListNewsInPageOrther(page) {
    return axios.get("http://localhost:8080/newsinpageorther?page=" + page);
  }
  getNewsById(newId) {
    return axios.get( "http://localhost:8080/news/detail" + "/" + newId );
  }
  getAllNews() {
    return axios.get( "http://localhost:8080/allnews");
  }
  ////////
  ListEvent(page) {
    return axios.get("http://localhost:8080/events?page=" + page);
  }
  ListTipAndShare(page) {
    return axios.get("http://localhost:8080/tips?page=" + page);
  }
  ListNewHot(page) {
    return axios.get("http://localhost:8080/newHot?page=" + page);
  }
  ListNewNew(page) {
    return axios.get("http://localhost:8080/newNews?page=" + page);
  }
  deleteNews(newsId){
    return axios.delete("http://localhost:8080/admin/news/" + newsId);
}
  ////////////

}
export default new NewsService();
