import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  productId: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
  stock: number;
  category: string;
  color: string;
}

export const ProductSchema = new Schema<IProduct>({
  productId: { type: String, required: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageId: { type: String, required: false },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
