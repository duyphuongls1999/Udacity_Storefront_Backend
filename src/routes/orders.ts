import express from 'express';
import authToken from '../app/middlewares/auth';
import OrdersController from '../app/controllers/OrderController';

const ordersRouter = express.Router()
const controller = new OrdersController()

ordersRouter.get('/', authToken, controller.getOrders)
ordersRouter.post('/create', authToken, controller.createOrder)
ordersRouter.put('/:id', authToken, controller.updateOrder)
ordersRouter.get('/:id', authToken, controller.getOrderById)
ordersRouter.delete('/:id', authToken, controller.deleteOrder)

export default ordersRouter
