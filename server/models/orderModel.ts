import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./productModel";
import { IUser } from "./userModel";

export interface IOrder extends Document {
  orderNumber: string;
  userId: IUser["_id"];
  products: IProduct["_id"][];
  totalCost: number;
  name: string;
  address: string;
  city: string;
  zip: string;
  email: string;
  phone: number;
  isShipped: boolean;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true },
  totalCost: { type: Number, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  isShipped: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
