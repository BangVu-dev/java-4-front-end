import axios from 'axios';
import { CategoryModal } from '../model/Category';
import { UserModal } from '../model/User';

class UserController {

    async isLogin (user: UserModal) {
        return axios.post('http://localhost:8080/login', user).then(res => {
            return res.data
        })
    }

    async isRegister (user: UserModal) {
        return axios.post('http://localhost:8080/register', user).then(res => {
            return res.data
        })
    }

    async userUpdate (user: UserModal) {
        return axios.put(`http://localhost:8080/user/update/${user.userId}`, user).then(res => {
            return res.data
        })
    }

}

export const userController = new UserController();