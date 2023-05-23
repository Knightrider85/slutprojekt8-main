import { Address } from "cluster";
import mongoose, { ObjectId, Schema } from "mongoose";
import { Product } from "./productModel";
import { IUser } from "./userModel";

export interface Order {
  orderNumber: string;
  totalCost: number;
  products: Product [];
  customerId: ObjectId;
  deliveryAddress: Address;
  isShipped: boolean;
  createdAt: Date;
}


const OrderSchema = new Schema({

  orderNumber: { type: String, required: true },
  totalCost: { type: Number, required: true, unique: true },
  products: {type: Product [], required: true},
  customerId: {type: ObjectId, required: true},
  deliveryAddress: { type: Address, required: true },
  isShipped: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
});


const Order = mongoose.model<IUser>("Order", OrderSchema);

export default Order;
