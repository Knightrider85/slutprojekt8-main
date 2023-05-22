import express from "express";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";

const router = express.Router();

//första utkast
//fortsätt todo
router.get("/product/:id", (req, res) => {
  // Logic for the product page route
  const productId = req.params.id;
  res.send(`Product Page - ID: ${productId}`);
});

export const productRouter = express
  .Router()
  .post("/product", addProduct)
  .delete("/products/:id", deleteProduct)
  .put("/products/:id", updateProduct);
