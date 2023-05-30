import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    isAdmin: boolean;
    userId: string;
    name: string;
    email: string;
    phone: number;
    address?: string;
    password: string;
    isSignedIn: false;
}

const UserSchema = new Schema<IUser>({
    isAdmin: {type: Boolean, default: false},
    userId: {type: String, required: false},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: false},
    address: {type: String, required: false},
    password: {type: String, required: true},
    isSignedIn: { type: Boolean, default: false }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User