import express from "express";
import {Authentication} from "../utils/Authentication";
import { UserModel } from "../models/user";

const userModel = new UserModel();

export class AuthenticationController {
  async login(req: express.Request, res: express.Response) {
    try {
      const { username, password } = req.body;
      const user = await userModel.getUserByUsername(username as string);
      if (user) {
        const passwordMatch = await Authentication.passwordCompare(
          password as string,
          user.password as string
        );
        if (passwordMatch) {
          // @ts-ignore
          const res_token = await Authentication.generateToken(user.id, user.username);
          return res.status(200).json({
            message: "Successfully login!",
            token: res_token,
          });
        } else {
          return res.status(400).json({
            message: "Wrong password!",
          });
        }
      } else {
        return res.status(400).json({
          message: "Wrong username!",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async register(req: express.Request, res: express.Response) {
    try {
      const { username, password, passwordConfirm } = req.body;
      if (!username || !password || !passwordConfirm) {
        return res.status(400).json({
          message: "Missing username, password or passwordConfirm!",
        });
      }

      if (password !== passwordConfirm) {
        return res.status(400).json({
          message: "Password and password confirm not match!",
        });
      }

      const user = await userModel.getUserByUsername(username as string);
      if (user) {
        return res.status(400).json({
          message: "Username is exist!",
        });
      }

      const hashedPassword = await Authentication.passwordHash(
        password as string
      );

      await userModel.createUser({
        username: req.body.username as string,
        first_name: req.body.first_name as string,
        last_name: req.body.last_name as string,
        password: hashedPassword,
      });

      res.status(200).json({
        message: "Successfully register user!",
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
