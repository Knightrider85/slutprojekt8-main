import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./productModel";
import { IUser } from "./userModel";

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
 
  totalCost: { type: Number, required: false },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  quantity: [{ type: Number, required: true }],
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
