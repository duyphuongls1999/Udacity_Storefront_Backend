import express from 'express';
import { authToken } from '../middlewares/auth';
import { OrderController } from '../controllers/OrderController';

export const orderRouter = express.Router();
const controller = new OrderController();

orderRouter.get('/', authToken, controller.getOrders);
orderRouter.post('/', authToken, controller.createOrder);
orderRouter.put('/:id', authToken, controller.updateOrder);
orderRouter.get('/:id', authToken, controller.getOrderById);
orderRouter.delete('/:id', authToken, controller.deleteOrder);
orderRouter.post('/addProduct/', authToken, controller.addProductToOrder);
