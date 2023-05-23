import { Request, Response } from 'express';
import ProductModel from '../models/productModel';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, color, brand, Id, description } = req.body;

    // Check if the product name is already registered
    const existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product name is already registered' });
    }

    // Create a new product
    const newProduct = new ProductModel({ name, color, brand, Id, description });
    await newProduct.save();

    return res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
