import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  matchPassword(password: string): boolean;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "el campo name es requerido"],
    },

    lastname: {
      type: String,
      required: [true, "el lastname es requerido"],
    },

    email: {
      type: String,
      required: [true, "el campo email es requerido"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "el campo password es requerido"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = function (this:IUser,password:string) {
  return bcrypt.compareSync(password, this.password);
};

export const userModel = model<IUser>("user", userSchema);
