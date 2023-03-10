import { Type } from "@sinclair/typebox";

export const userSchema = {
  body: Type.Object({
    name: Type.String(),
    lastname: Type.String(),
    email: Type.String(),
    password: Type.String(),
  
  }),
};
