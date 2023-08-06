import { OrderModel } from '../../models/order';

const orderModel = new OrderModel();

describe('Order Model', () => {
  it('should create a order', async () => {
    const result = await orderModel.createOrder({
        user_id: 2,
        status: 'Order'
      });
    expect(result.user_id === 1);
  });

  it('should update a order', async () => {
    const order = await orderModel.getOrderById(5);

    const result = await orderModel.updateOrder({
        id: order.id,
        user_id: 2,
        status: 'Shipping'
      });
    expect (result.id === 5);
  });

  it('should return a list of orders', async () => {
    const result = await orderModel.getOrders();
    expect(result.length).toEqual(2);
  });

  it('should return the correct order by id', async () => {
    const order = await orderModel.getOrderById(5);
    expect (order.id === 5);
  });

  it('should add a product to order', async () => {
    const order = await orderModel.addProductToOrder({
        order_id: 5,
        product_id: 2,
        quantity: 2
      });
    expect (order.order_id === 5);
  });

  it('should delete the order', async () => {
    await orderModel.deleteOrder(6);
    const ordersCurrent = await orderModel.getOrders();
    expect(ordersCurrent.length).toEqual(1);
  });
  
});
