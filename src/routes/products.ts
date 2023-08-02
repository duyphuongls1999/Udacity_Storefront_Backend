import express from "express";
import { ProductController } from "../controllers/ProductController";
import { authToken } from "../middlewares/auth";

export const productRouter = express.Router();
const controller = new ProductController();

productRouter.get("/", authToken, controller.getProducts);
productRouter.get("/:id", authToken, controller.getProductsById);
productRouter.post("/", authToken, controller.createProduct);
productRouter.put("/:id", authToken, controller.updateProduct);
productRouter.delete("/:id", authToken, controller.deleteProduct);
