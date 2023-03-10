import mongoose, { Document, Types } from "mongoose";
const { Schema, model } = mongoose;

interface IProduct extends Document {
  name: string;
  description: string;
  rate: number;
  price: number;
  stock: number;
  category: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  imgUrl?: string;
  public_id?: string;
  setImg(image: { secure_url: string; public_id: string }): void;
}

const productSchema = new Schema(
  {
    name: { type: String, required: [true, "el campo name es obligatorio"] },

    description: {
      type: String,
      required: [true, "el campo description es obligatorio"],
    },

    rate: {
      type: Number,
      min: [0, "el rate debe llevar un valor entre 0 y 5"],
      max: [5, "el rate debe llevar un valor entre 0 y 5"],
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "el campo price es obligatorio"],
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: [true, "el campo category es obligatorio"],
    },

    user: { type: Schema.Types.ObjectId, ref: "user" },

    imgUrl: {
      type: String,
      default: null,
    },

    public_id: String,
  },
  { timestamps: true }
);

interface image {
  secure_url: string;
  public_id: string;
}

productSchema.methods.setImg = function setImg(
  this: IProduct,
  { secure_url, public_id }: image
) {
  this.imgUrl = secure_url;
  this.public_id = public_id;
};

export const productModel = model<IProduct>("product", productSchema);
