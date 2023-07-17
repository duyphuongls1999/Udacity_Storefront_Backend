import express from 'express'
import { Order } from '../models/order'
import { NextFunction, Request, Response } from 'express'
import IOrder from '../interfaces/order';

const order: Order = new Order();

export default class OrdersController {
    async getOrders(req: Request, res: Response) {
        try {
            const orders = await order.getOrders();
            res.status(200).json(orders);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    async createOrder(req: Request, res: Response) {
        try {

            const {user_id, status, product_id, quantity} = req.body;

            if (!user_id) {
                return res.status(400).json({
                    error: 'Missing user id',
                });
            }
            if (!status) {
                return res.status(400).json({
                    error: 'Missing status',
                });
            }
            if (!product_id) {
                return res.status(400).json({
                    error: 'Missing product id',
                });
            }
            if (!quantity) {
                return res.status(400).json({
                    error: 'Missing quantity',
                });
            }

            const orderCreate: IOrder = await order.createOrder({
                user_id: parseInt(user_id as string),
                status: status as string,
                product_id: parseInt(product_id as string),
                quantity: parseInt(quantity as string),
            });

            res.status(201).json(orderCreate);
        } catch (e) {
            res.status(500).json(e);
        }
    };

    async updateOrder(req: Request, res: Response) {
        try {
            
            const {user_id, status, product_id, quantity} = req.body;
            const id = req.params.id;

            if (!user_id) {
                return res.status(400).json({
                    error: 'Missing user id',
                });
            }
            if (!status) {
                return res.status(400).json({
                    error: 'Missing status',
                });
            }
            if (!product_id) {
                return res.status(400).json({
                    error: 'Missing product id',
                });
            }
            if (!quantity) {
                return res.status(400).json({
                    error: 'Missing quantity',
                });
            }

            const orderById = await order.getOrderById(parseInt(req.params.id));
            if(Object.keys(orderById).length === 0) {
                res.status(404).json({ status: `Not found order ${req.params.id}` });
            }

            const orderUpdate: IOrder = await order.updateOrder({
                id: parseInt(id as string),
                user_id: parseInt(user_id as string),
                status: status as string,
                product_id: parseInt(product_id as string),
                quantity: parseInt(quantity as string),
            })
            res.status(201).json(orderUpdate);
        } catch (e) {
            res.status(400).json(e);
        }
    };

    async getOrderById(req: Request, res: Response) {
        try {
            const orderById = await order.getOrderById(parseInt(req.params.id));
            if(Object.keys(orderById).length === 0) {
                res.status(404).json({ status: `Not found order ${req.params.id}` });
            }
            res.status(200).json(orderById);
        } catch (e) {
            res.status(500).json(e);
        }
    };


    async deleteOrder(req: Request, res: Response) {
        try {
            const orderById : IOrder = await order.getOrderById(parseInt(req.params.id));
            if(Object.keys(orderById).length === 0) {
                res.status(404).json({ status: `Not found order ${req.params.id}` });
            }
            await order.deleteOrder(parseInt(req.params.id as string));
            res.status(200).json({ status: `Deleted order ${req.params.id}` });
        } catch (e) {
            res.status(500).json(e);
        }
    };
}