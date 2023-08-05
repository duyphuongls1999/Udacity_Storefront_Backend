import express from 'express';
import { UserModel } from '../models/user';
import { Authentication } from '../utils/Authentication';
import { User } from '../interfaces/user';

const userModel = new UserModel();

export class UserController {
  async getUsers(_req: express.Request, res: express.Response) {
    try {
      const users = await userModel.getUsers();
      return res.status(200).json({
        message: 'Successfully getted users!',
        result: users,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getUserById(req: express.Request, res: express.Response) {
    try {
      const user = await userModel.getUserById(parseInt(req.params.id));
      if (user === null || user === undefined) {
        return res.status(404).json({
          message: `Not found product ${req.params.id}!`,
        });
      }
      return res.status(200).json({
        message: 'Successfully getted users!',
        result: user,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getUserByUsername(req: express.Request, res: express.Response) {
    try {
      const user = await userModel.getUserByUsername(req.params.username);
      return res.status(200).json({
        message: 'Successfully getted users!',
        result: user,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateUser(req: express.Request, res: express.Response) {
    try {
      const id = parseInt(req.params.id as string);
      const username = req.body.username as string;
      const first_name = req.body.first_name as string;
      const last_name = req.body.last_name as string;
      const password = req.body.password as string;

      const userById = await userModel.getUserById(id);
      if (userById === null || userById === undefined) {
        return res.status(404).json({
          message: `Not found product ${req.params.id}!`,
        });
      }

      const userByUserName = await userModel.getUserByUsernameAndNotId(username, id);
      if(userByUserName) {
        return res.status(400).json({
          message: `Username ${username} is exist!`,
        });
      }
      
      const userUpdate: User = {
        id: id,
        username : (username !='undefined' && username) ? username : userById.username,
        first_name: (first_name !='undefined' && first_name) ? first_name : userById.first_name,
        last_name: (last_name !='undefined' && last_name) ? last_name : userById.last_name,
        password: (password !='undefined' && password) ? await Authentication.passwordHash(password) : userById.password,
      };

      const userUpdated = await userModel.updateUser(userUpdate);

      return res.status(200).json({
        message: 'Successfully updated users!',
        result: userUpdated,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteUser(req: express.Request, res: express.Response) {
    try {
      const userById = await userModel.getUserById(parseInt(req.params.id as string));
      if (userById === null || userById === undefined) {
        return res.status(404).json({
          message: `Not found product ${req.params.id}!`,
        });
      }
      await userModel.deleteUser(parseInt(req.params.id as string));
      return res.status(200).json({
        message: `Successfully deleted user ${req.params.id}!`,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
