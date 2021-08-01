import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
  logoutAdmin() {
    localStorage.removeItem("user");
    this.props.history.push("/login-admin");
  }

  register(username, email, password,address,phone) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      address,
      phone,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  updatePassword(user,userid,passw)
  {
      return axios.put("http://localhost:8080/" +'change-password/'+userid+'/'+passw,user);
  }
  getUser(userId) {
    return axios.get("http://localhost:8080/info/" + userId);
  }
}

export default new AuthService();
