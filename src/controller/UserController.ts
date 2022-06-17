import axios from "axios";
import { CategoryModal } from "../model/Category";
import { UserModal } from "../model/User";

class UserController {
  async getAccountList() {
    return axios.get("http://localhost:8080/users").then((res) => {
      return res.data;
    });
  }

  async onAddAccount(user: UserModal) {
    return axios.post("http://localhost:8080/user/add", user).then((res) => {
      return res.data;
    });
  }

  async isLogin(user: UserModal) {
    return axios.post("http://localhost:8080/login", user).then((res) => {
      return res.data;
    });
  }

  async isRegister(user: UserModal) {
    return axios.post("http://localhost:8080/register", user).then((res) => {
      return res.data;
    });
  }

  async userUpdate(user: UserModal) {
    return axios.put(`http://localhost:8080/account/update/${user.userId}`, user).then((res) => {
      return res.data;
    });
  }

  async onDeleteAccount(id: number) {
    return axios.delete(`http://localhost:8080/user/delete/${id}`);
  }

  async onSendPassword(email: string) {
    return axios.get(`http://localhost:8080/user/reset/password/${email}`).then((res) => {
      return res.data;
    });
  }
}

export const userController = new UserController();
