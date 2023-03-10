import { Type } from "@sinclair/typebox";

export const productSchema = {
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
    rate: Type.Number(),
    price: Type.Number(),
    user: Type.String(),
  }),
};
