import express from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

export const authRouter = express.Router();
const controller = new AuthenticationController();

authRouter.post("/login", controller.login);
authRouter.post("/register", controller.register);
