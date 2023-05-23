import { Product } from './../../client/data/index';
import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
    isAdmin: boolean;
    Id: string;
    title: string;
    color: string;
    description: String;
    brand: string;
    
}

const ProductSchema = new Schema<IUser>({
    isAdmin: {type: Boolean, required: true},
    Id: {type: String, required: true},
    title: {type: String, required: true},
    color: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    brand: {type: String, required: true},
    
});

const Product = mongoose.model<IUser>('User', ProductSchema);

export default Product