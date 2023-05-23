import mongoose, { Schema } from "mongoose";
import { IUser } from "./userModel";



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
