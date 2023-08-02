// @ts-ignore
import { pool } from "../config/database";
import { User } from "../interfaces/user";

export class UserModel {
  async getUsers(): Promise<User[]> {
    try {
      // @ts-ignore
      const connection = await pool.connect();
      const sql = "SELECT * FROM public.user";
      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM public.user WHERE id=($1)";
      // @ts-ignore
      const connection = await pool.connect();
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    try {
      const sql = "SELECT * FROM public.user WHERE username=($1)";
      // @ts-ignore
      const connection = await pool.connect();
      const result = await connection.query(sql, [username]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${username}. Error: ${err}`);
    }
  }

  
  async getUserByUsernameAndNotId(username: string, id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM public.user WHERE username=($1) AND id != ($2)";
      // @ts-ignore
      const connection = await pool.connect();
      const result = await connection.query(sql, [username, id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${username}. Error: ${err}`);
    }
  }

  async createUser(u: User): Promise<User> {
    try {
      // @ts-ignore
      const connection = await pool.connect();
      const sql =
        "INSERT INTO public.user (username, first_name, last_name, password) VALUES($1, $2, $3, $4)";

      const result = await connection.query(sql, [
        u.username,
        u.first_name,
        u.last_name,
        u.password,
      ]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
    }
  }

  async updateUser(u: User): Promise<User> {
    try {
      // @ts-ignore
      const connection = await pool.connect();
      const sql = `UPDATE public.user SET username = $2, first_name = $3, last_name = $4, password = $5 WHERE id = $1 RETURNING *`;

      const result = await connection.query(sql, [
        u.id,
        u.username,
        u.first_name,
        u.last_name,
        u.password,
      ]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${u.id}. Error: ${err}`);
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      // @ts-ignore
      const connection = await pool.connect();
      const sql = "DELETE FROM public.user WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
