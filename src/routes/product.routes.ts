import {
  createProduct,
  deleteProduct,
  listAllProducts,
  listByIdProduct,
  updateProduct,
} from "../controllers/Product.controller";
import { verifyToken } from "../middlewares/auth";
import { upload } from "../middlewares/imgUpload";
import { productSchema } from "../Schemas/productSchema";

const middleware = (req: any, reply: any, done: any) => {
  verifyToken(req, reply, done);
};

export const productRoutes = (fastify: any, opts: any, done: any) => {
  fastify.get("/", listAllProducts);
  fastify.get("/:id", listByIdProduct);
  fastify.post(
    "/",
    { schema: productSchema, preHandler: [middleware, upload.single("img")] },
    createProduct
  );
  fastify.delete("/:id", { preHandler: [middleware] }, deleteProduct);
  fastify.put(
    "/:id",
    { preValidation: [middleware, upload.single("img")] },
    updateProduct
  );
  done();
};
