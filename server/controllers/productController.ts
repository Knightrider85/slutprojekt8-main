import { NextFunction, Request, Response } from "express";
import { ProductModel, Product } from "../models/productModel";

export const addProduct = async (
  req: Request<{}, {}, Product>,
  res: Response
) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};
