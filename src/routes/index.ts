import express from "express";
import { userRouter } from "./users";
import { productRouter } from "./products";
import { orderRouter } from "./orders";
import { authRouter } from "./auths";

export const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/auth", authRouter);
