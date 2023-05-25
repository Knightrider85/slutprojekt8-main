import { Address } from "cluster";
import mongoose, { ObjectId, Schema } from "mongoose";
import { Product } from "./productModel";
import { IUser } from "./userModel";

export interface Order {
  orderNumber: string;
  totalCost: number;
  products: Product[];
  customerId: ObjectId;
  deliveryAddress: Address;
  isShipped: boolean;
  createdAt: Date;
}

const OrderSchema = new Schema({
  orderNumber: { type: String, required: true },
  totalCost: { type: Number, required: true },
  products: { type: [Schema.Types.ObjectId], ref: "Product", required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  deliveryAddress: { type: String, required: true },
  isShipped: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Order = mongoose.model<IUser>("Order", OrderSchema);

export default Order;
