import mongoose, { Document } from "mongoose";
import { productModel } from "./Product";
const { Schema, model } = mongoose;

interface ICategory extends Document {
  name: string;
  description: string;
  imgUrl?: string;
  public_id?: string;
  setImg(image: { secure_url: string; public_id: string }): void;
}

const categorySchema = new Schema(
  {
    name: { type: String, required: [true, "el campo name es obligatorio"] },

    description: {
      type: String,
      // required: [true, "el description name es obligatorio"],
    },

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

categorySchema.methods.setImg = function setImg({
  secure_url,
  public_id,
}: image) {
  this.imgUrl = secure_url;
  this.public_id = public_id;
};

categorySchema.pre("deleteOne", { document: true }, async function (this:ICategory) {
  await productModel.deleteMany({ category: this._id.toString() });
});

export const categoryModel = model<ICategory>("category", categorySchema);
