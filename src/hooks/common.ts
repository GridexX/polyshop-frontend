export type ProductCatalog = {
    id: string;
    name: string;
    description: string;
    price: number;
};

export type PostProductDto = {
    name: string;
    description: string;
    price: number;
    quantity: number;
};

export type ProductAggregate = PostProductDto & {
    id: string;
};

export type PutProductDto = PostProductDto;

export type ProductCartAggregate = {
    id: string;
    name: string;
    description: string;
    price: number;
    amount: number;
};

export type AddToCartDto = {
    id: string;
    amount: number;
};

export type ExceptionMessage = {
    code: number;
    message: string;
};

export type OrderStatus =
    | "created"
    | "missing_stock"
    | "confirmed"
    | "paid"
    | "missing_payment"
    | "shipped"
    | "missing_shipping";

export type OrderDto = {
    id: number;
    date: string;
    status: OrderStatus;
};

export type Order = {
    id: number;
    date: Date;
    status: OrderStatus;
};
