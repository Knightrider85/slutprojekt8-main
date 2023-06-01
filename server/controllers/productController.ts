import { Request, Response } from "express";
import * as Yup from 'yup';
import Product, { IProduct } from "../models/productModel";

const productSchema = Yup.object({
  productId: Yup.string(),
  imageId: Yup.string().required(),
  name: Yup.string().required("Please enter a title"),
  description: Yup.string().required("Please enter a description"),
  price: Yup.number()
    .moreThan(0, "Please enter a number")
    .required("Please enter a price"),
  stock: Yup.number()
    .moreThan(0, "Please enter a number")
    .required("Please enter a quantity"),
  category: Yup.string().required("Please enter a category"),
  color: Yup.string().required("Please select a color"),
});

const editProductSchema = Yup.object({
  name: Yup.string().required("Please enter a title"),
  description: Yup.string().required("Please enter a description"),
  price: Yup.number()
    .moreThan(0, "Please enter a number")
    .required("Please enter a price"),
  stock: Yup.number()
    .moreThan(0, "Please enter a number")
    .required("Please enter a quantity"),
  category: Yup.string().required("Please enter a category"),
  color: Yup.string().required("Please select a color"),
});

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      name,
      description,
      price,
      imageId,
      stock,
      category,
      color,
    } = req.body;

    const product: IProduct = new Product({
      productId,
      name,
      description,
      price,
      imageId,
      stock,
      category,
      color,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: `Error: ${error}` });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const { name, description, price, stock, category, color } = await editProductSchema.validate(req.body);

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { name, description, price, stock, category, color },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({ error });
    }
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
};

// Get all products

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { sort, order, color, category } = req.query;

    let sortParams: Record<string, any> = {};
    if (typeof sort === "string" && typeof order === "string") {
      sortParams[sort] = order === "desc" ? -1 : 1;
    }

    let filterParams: Record<string, any> = {};
    if (typeof color === "string" && color !== "None") {
      filterParams["color"] = color;
    }
    if (typeof category === "string" && category !== "None") {
      filterParams["category"] = category;
    }

    const products = await Product.find(filterParams).sort(sortParams);
    console.log(products);
    res.json({ products });
  } catch (error) {
    console.error("Error getting products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the products" });
  }
};
