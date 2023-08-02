import { OrderModel } from '../models/order';
import { Request, Response } from 'express';

const orderModel = new OrderModel();

export class OrderController {
  async getOrders(req: Request, res: Response) {
    try {
      const orders = await orderModel.getOrders();
      return res.status(200).json({
        message: 'Successfully get all orders data!',
        result: orders,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const { user_id, product_id, quantity, status } = req.body;

      if (!user_id) {
        return res.status(400).json({
          message: 'Missing user id!',
        });
      }
      if (!product_id) {
        return res.status(400).json({
          message: 'Missing product id!',
        });
      }
      if (!quantity) {
        return res.status(400).json({
          message: 'Missing quantity',
        });
      }
      if (!status) {
        return res.status(400).json({
          message: 'Missing status!',
        });
      }

      const orderCreate = await orderModel.createOrder({
        user_id: parseInt(user_id as string),
        status: status as string,
        product_id: parseInt(product_id as string),
        quantity: parseInt(quantity as string),
      });

      return res.status(200).json({
        message: 'Successfully created order!',
        result: orderCreate,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const { user_id, product_id, quantity, status } = req.body;
      const id = req.params.id;

      if (!user_id) {
        return res.status(400).json({
          message: 'Missing user id!',
        });
      }
      if (!status) {
        return res.status(400).json({
          message: 'Missing status!',
        });
      }
      if (!product_id) {
        return res.status(400).json({
          message: 'Missing product id!',
        });
      }
      if (!quantity) {
        return res.status(400).json({
          message: 'Missing quantity!',
        });
      }

      const order = await orderModel.getOrderById(parseInt(req.params.id));
      if (Object.keys(order).length === 0) {
        res.status(404).json({
          message: `Not found order ${req.params.id}!`,
        });
      }

      const orderUpdate = await orderModel.updateOrder({
        id: parseInt(id as string),
        user_id: parseInt(user_id as string),
        status: status as string,
        product_id: parseInt(product_id as string),
        quantity: parseInt(quantity as string),
      });
      res.status(200).json({
        message: 'Successfully updated order!',
        result: orderUpdate,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await orderModel.getOrderById(parseInt(req.params.id));
      if (Object.keys(order).length === 0) {
        res.status(404).json({ status: `Not found order ${req.params.id}` });
      }
      res.status(200).json({
        message: 'Successfully getted order!',
        result: order,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const order = await orderModel.getOrderById(parseInt(req.params.id));
      if (Object.keys(order).length === 0) {
        res.status(404).json({
          message: `Not found order ${req.params.id}!`,
        });
      }
      await orderModel.deleteOrder(parseInt(req.params.id as string));
      res.status(200).json({
        message: `Successfully deleted order ${req.params.id}!`,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
