import { number } from "yup";
import { CategoryModal } from "./Category";

export interface ProductModal {
    productId: number;
    image: string;
    productName: string;
    price: number;
    categoryId: number;
    description: string;
}

export interface ProductWithDetail extends ProductModal {
    categoryName: string;
}