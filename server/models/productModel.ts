import mongoose, { Document, Schema } from "mongoose";

export interface Product extends Document {

productId: string,
name: string;
description: string;
price: number;
image: string;
imageId: Types.ObjectId;
stock: number;
categories: string[];

}

const ProductSchema = new Schema<IProduct>({
  productId: { type: String, required: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  stock: { type: Number, required: true },
  categories: { type: [String], required: true },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
