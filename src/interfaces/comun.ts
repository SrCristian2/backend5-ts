import mongoose from "mongoose";

export interface ICategory {
  name: string;
  description: string;
  imgUrl?: string;
  public_id?: string;
}

export interface IUploadImage {
  secure_url: string;
  public_id: string;
}

export interface IParams {
  id: string;
}

export interface IFactura {
  product: mongoose.Types.ObjectId | string;
  quantity: number;
  user: mongoose.Types.ObjectId;
  total?: number;
}

export interface IProduct {
  name: string;
  description: string;
  rate: number;
  price: number;
  stock: number;
  category: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  imgUrl?: string;
  public_id?: string;
}

export interface IUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IPayload {
  _id: mongoose.Types.ObjectId;
}
