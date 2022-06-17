import axios from 'axios';
import { CategoryModal } from '../model/Category';
import { ProductModal } from '../model/Product';

class ProductController {

    async getProductList () {
        return axios.get('http://localhost:8080/products').then(res => {
            return res.data
        })
    }

    async onAddProduct (product: ProductModal) {
        return axios.post('http://localhost:8080/product/add', product)
    }

    async onUpdateProduct (product: ProductModal) {
        return axios.put(`http://localhost:8080/product/update/${product.productId}`, product)
    }

    async onDeleteProduct (id: number) {
        return axios.delete(`http://localhost:8080/product/delete/${id}`)
    }

    async getProductDetail (id: any) {
        return axios.get(`http://localhost:8080/product/${id}`).then(res => {
            return res.data
        })
    }

    async getProductWithCategory (catId: number) {
        return axios.get(`http://localhost:8080/products/category/${catId}`).then(res => {
            return res.data
        })
    }

}

export const productController = new ProductController();