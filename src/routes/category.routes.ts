import {
  createCategory,
  deleteCategory,
  listAllCategories,
  listByIdCategory,
  updateCategory,
} from "../controllers/Category.controller";
import { verifyToken } from "../middlewares/auth";
import { upload } from "../middlewares/imgUpload";
import { categorySchema } from "../Schemas/category.Schema";

const middleware = (req: any, reply: any, done: any) => {
  verifyToken(req, reply, done);
};

export const categoryRoutes = (fastify: any, opts: any, done: any) => {
  fastify.get("/", listAllCategories);
  fastify.get("/:id", listByIdCategory);
  fastify.post(
    "/",
    {
      schema: categorySchema,
      preValidation: [middleware, upload.single("img")],
    },
    createCategory
  );
  fastify.delete("/:id", { preHandler: [middleware] }, deleteCategory);
  fastify.put(
    "/:id",
    { preHandler: [middleware, upload.single("img")] },
    updateCategory
  );
  done();
};
