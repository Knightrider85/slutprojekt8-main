import express from 'express';
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/productController';

const productRouter = express.Router();

productRouter.post('/api/products', addProduct);
productRouter.delete('/api/products/:productId', deleteProduct);
productRouter.put('/api/products/:productId', updateProduct);
productRouter.get('/api/products/all', getAllProducts);

export default productRouter;
