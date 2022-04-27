import axios from 'axios';
import { CategoryModal } from '../model/Category';

class CategoryController {

    async getCategoryList () {
        return axios.get('http://localhost:8080/categories').then(res => {
            return res.data
        })
    }

    async onAddCategory (category: CategoryModal) {
        return axios.post('http://localhost:8080/category/add', category)
    }

    async onUpdateCategory (category: CategoryModal) {
        return axios.put(`http://localhost:8080/category/update/${category.categoryId}`, category)
    }

    async onDeleteCategory (id: number) {
        return axios.delete(`http://localhost:8080/category/delete/${id}`)
    }

}

export const categoryController = new CategoryController();