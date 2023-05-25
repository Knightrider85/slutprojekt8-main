import { Request, Response } from 'express';
import Product, { IProduct } from '../models/productModel';

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { productId, name, description, price, image, stock, categories } = req.body;

    const product: IProduct = new Product({
      productId,
      name,
      description,
      price,
      image,
      stock,
      categories,
    });

    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'An error occurred while creating the product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { name, description, price, image, stock, categories } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      { name, description, price, image, stock, categories },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'An error occurred while updating the product' });
  }
};


// Get all products

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'An error occurred while getting the products' });
  }
};


