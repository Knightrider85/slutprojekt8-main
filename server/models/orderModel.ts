import mongoose, { Document, Schema } from "mongoose";
import { IProduct, ProductSchema } from "./productModel";

export interface IOrder extends Document {
 
  products: IProduct["_id"][];
  totalCost: number;
  quantity: number[];
  // userId: IUser["_id"];
  name: string;
  address: string;
  city: string;
  zip: string;
  email: string;
  phone: number;
  // isShipped: boolean;
  // createdAt: Date;
  orderId: string;
}

const OrderSchema = new Schema<IOrder>({
 
  
  products: [{ type: ProductSchema, required: true }],
  
  // products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  quantity: [{ type: Number, required: true }],
  totalCost: { type: Number, required: false },

  // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  // isShipped: { type: Boolean, required: false },
  // createdAt: { type: Date, required: true, default: Date.now },
  orderId: { type: String, required: true },

});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
