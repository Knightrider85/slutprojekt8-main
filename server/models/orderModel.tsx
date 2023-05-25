import mongoose, { InferSchemaType, Schema } from "mongoose";
import { ProductSchema } from "./productModel";
import { IUser } from "./userModel";

// export interface Order {
//   orderNumber: string;
//   totalCost: number;
//   products: Product[];
//   customerId: ObjectId;
//   deliveryAddress: Address;
//   isShipped: boolean;
//   createdAt: Date;
// }
type Address = InferSchemaType<typeof AddressSchema>;
type Order = InferSchemaType<typeof OrderSchema>;

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
});


const OrderSchema = new Schema({
  orderNumber: { type: String, required: true },
  totalCost: { type: Number, required: true },
  products: { type: [ProductSchema], required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  deliveryAddress: { type: AddressSchema, required: true },
  isShipped: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Order = mongoose.model<IUser>("Order", OrderSchema);

export default Order;
