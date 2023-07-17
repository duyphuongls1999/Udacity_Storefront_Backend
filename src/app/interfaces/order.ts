interface IOrder {
    id?: number,
    user_id: number,
    status: string,
    product_id: number,
    quantity: number,
};

export default IOrder;
