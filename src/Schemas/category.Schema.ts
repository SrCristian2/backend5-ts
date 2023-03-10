

import { Type } from "@sinclair/typebox";

export const categorySchema = {
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
  }),
};
