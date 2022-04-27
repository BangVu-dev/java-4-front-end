export interface OrderProductModal {
    cartId: number;
    orderId: number;
    productId: number | undefined;
    image: string | undefined;
    productName: string | undefined;
    price: number;
    quantity: number;
}