import { CartModal } from "./Cart";
import { OrderProductModal } from "./OrderProduct";

export interface OrderModal {
  orderId: number;
  userId: number;
  createdAt: string;
  orderStatus: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  postCode: string;
  address: string;
  message: string;
}

export interface OrderWithDetailItem extends OrderModal {
  cartProduct?: CartModal[];
}

export interface OrderWithDetail extends OrderModal {
  id: number | undefined;
  userId: number;
  image: string | undefined;
  productName: string | undefined;
  price: number | any;
  quantity: number;
}
