import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IUser extends Document {
    isAdmin: boolean;
    userId: string;
    name: string;
    email: string;
    phone: number;
    address?: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    isAdmin: {type: Boolean, default: false},
    userId: {type: String, required: false},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: false},
    address: {type: String, required: false},
    password: {type: String, required: true},
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User