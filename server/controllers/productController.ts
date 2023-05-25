import { Request, Response } from 'express';
import { Product, ProductModel } from "../models/productModel";

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

// Add a product

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

// Delete a product with ID
export const deleteProduct = async (req: Request, res: Response) => {

const { id } = req.params;

try {

const product = await ProductModel.findByIdAndDelete(id);
if (!product) {
return res.status(200).json(product);
}
res.status(200).json(product);

} catch (err: unknown) {
if (err instanceof Error) {
res.status(400).json(err.message);
 }
}
};

// Update a product with ID

export const updateProduct = async (
req: Request<{ id: string }>,
res: Response
) => {
const { id } = req.params;

try {
const product = await ProductModel.findByIdAndUpdate(id, req.body, {
useFindAndModify: false,
});

if (!product) {
return res.status(400).json(product);
}

await product.save();
res.status(200).json({
old: product,
new: req.body,
});

} catch (err) {
console.log("update Product error");
res.status(400).json(err);
}

};
