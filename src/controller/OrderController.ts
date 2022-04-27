import axios from 'axios';
import { CartModal } from '../model/Cart';
import { OrderModal } from '../model/Order';
import { OrderProductModal } from '../model/OrderProduct';

class OrderController {

    async checkOut (order: OrderModal) {
        return axios.post('http://localhost:8080/order/checkout', order).then(res => {
            return res.data
        })
    }

    async addToCart (cartItem: OrderProductModal) {
        return axios.post('http://localhost:8080/cart/add', cartItem)
    }

    async getOrderList () {
        return axios.get('http://localhost:8080/orders/list').then(res => {
            return res.data
        })
    }

}

export const orderController = new OrderController();