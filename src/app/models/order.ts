// @ts-ignore
import pool from '../utils/database'
import IOrder from '../interfaces/order'

export class Order {
    async getOrders(): Promise<IOrder[]> {
        try {
            // @ts-ignore
            const connection = await pool.connect();
            const sql = 'SELECT * FROM orders';

            const result = await connection.query(sql);
            connection.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async createOrder(o: IOrder): Promise<IOrder> {
        try {
            const sql =
                'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const connection = await pool.connect();

            const result = await connection.query(sql, [o.user_id, o.status]);
            connection.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }

    async updateOrder(o: IOrder): Promise<IOrder> {
        try {
            const sql = `UPDATE orders SET user_id = $2, status = $3 WHERE id = $1 RETURNING *`;
            // @ts-ignore
            const connection = await pool.connect();

            const result = await connection.query(sql, [
                o.id,
                o.user_id,
                o.status,
            ]);
            connection.release();

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update order ${o.id}. Error: ${err}`);
        }
    }

    async getOrderById(id: number): Promise<IOrder> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            // @ts-ignore
            const connection = await pool.connect();

            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    async deleteOrder(id: number): Promise<IOrder> {
        try {
            // @ts-ignore
            const conn = await pool.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';

            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }

}
