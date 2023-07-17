import express from 'express'
import ProductController from '../app/controllers/ProductsController'
import authToken from '../app/middlewares/auth';

const productsRouter = express.Router()
const controller = new ProductController()

productsRouter.get('/', controller.getProducts)
productsRouter.get('/:id', controller.getProductsById)
productsRouter.post('/create', controller.createProduct)
productsRouter.put('/:id', controller.updateProduct)
productsRouter.delete('/:id', authToken, controller.deleteProduct)

export default productsRouter