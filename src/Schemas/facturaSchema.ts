
import { Type } from "@sinclair/typebox";

export const facturaSchema = {
  body: Type.Object({
    product: Type.String(),
    quantity: Type.Number(),
  }),
};
