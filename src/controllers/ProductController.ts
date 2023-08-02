import express from 'express';
import { ProductModel } from '../models/product';

const productModel = new ProductModel();

export class ProductController {
  async getProducts(_req: express.Request, res: express.Response) {
    try {
      const products = await productModel.getProducts();
      res.status(200).json({
        message: 'Successfully getted products!',
        result: products,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async getProductsById(req: express.Request, res: express.Response) {
    try {
      const product = await productModel.getProductById(
        parseInt(req.params.id)
      );
      res.status(200).json({
        message: 'Successfully getted products!',
        result: product,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async createProduct(req: express.Request, res: express.Response) {
    try {
      if (!req.body.name) {
        return res.status(400).json({
          message: 'Product name is required!',
        });
      }
      const product = await productModel.createProduct({
        name: req.body.name as string,
        price: parseFloat(req.body.price as string),
        category: req.body.category as string,
        description: req.body.description as string,
      });
      res.status(200).json({
        message: 'Successfully created products!',
        result: product,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateProduct(req: express.Request, res: express.Response) {
    try {
      if (!req.body.name) {
        return res.status(400).json({
          message: 'Product name is required!',
        });
      }
      const product = await productModel.getProductById(
        parseInt(req.params.id)
      );
      if (Object.keys(product).length === 0) {
        res.status(404).json({
          message: `Not found product ${req.params.id}!`,
        });
      }
      const productUpdate = await productModel.updateProduct({
        id: parseInt(req.params.id as string),
        name: req.body.name as string,
        price: parseFloat(req.body.price as string),
        category: req.body.category as string,
        description: req.body.description as string,
      });
      res.status(200).json({
        message: 'Successfully updated products!',
        result: productUpdate,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteProduct(req: express.Request, res: express.Response) {
    try {
      const product = await productModel.getProductById(
        parseInt(req.params.id)
      );
      if (Object.keys(product).length === 0) {
        res.status(404).json({
          message: `Not found product ${req.params.id}!`,
        });
      }
      await productModel.deleteProduct(parseInt(req.params.id as string));
      res.status(200).json({
        status: `Successfully deleted product ${req.params.id}!`,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
