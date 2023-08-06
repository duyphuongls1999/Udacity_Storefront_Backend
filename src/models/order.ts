// @ts-ignore
import { pool } from '../config/database';
import { Order } from '../interfaces/order';
import { ProductToOrder } from '../interfaces/productToOrder';

export class OrderModel {
  async getOrders(): Promise<Order[]> {
    try {
      // @ts-ignore
      const connection = await pool.connect();
      const sql = 'SELECT * FROM public.order';

      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async createOrder(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO public.order (user_id, status) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const connection = await pool.connect();

      const result = await connection.query(sql, [o.user_id, o.status]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async updateOrder(o: Order): Promise<Order> {
    try {
      const sql = 'UPDATE public.order SET user_id = $2, status = $3 WHERE id = $1 RETURNING *';
      // @ts-ignore
      const connection = await pool.connect();

      const result = await connection.query(sql, [o.id, o.user_id, o.status]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${o.id}. Error: ${err}`);
    }
  }

  async getOrderById(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM public.order WHERE id=($1)';
      // @ts-ignore
      const connection = await pool.connect();

      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  
  async addProductToOrder(p: ProductToOrder): Promise<ProductToOrder> {
    try {
        const sql =
            'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
        // @ts-ignore
        const connection = await pool.connect();

        const result = await connection.query(sql, [
            p.order_id,
            p.product_id,
            p.quantity,
        ]);
        connection.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(`Could not add product. Error: ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'DELETE FROM public.order WHERE id=($1)';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
