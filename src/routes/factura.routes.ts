import {
  createFactura,
  deleteFactura,
  listAllFacturas,
  listByIdFactura,
  updateFactura,
} from "../controllers/Factura.controller";
import { verifyToken } from "../middlewares/auth";
import { facturaSchema } from "../Schemas/facturaSchema";

const middleware = (req: any, reply: any, done: any) => {
  verifyToken(req, reply, done);
};

export const facturaRoutes = (fastify: any, opts: any, done: any) => {
  fastify.get("/", listAllFacturas);
  fastify.get("/:id", listByIdFactura);
  fastify.post(
    "/",
    { schema: facturaSchema, preHandler: [middleware] },
    createFactura
  );
  fastify.delete("/:id", { preHandler: [middleware] }, deleteFactura);
  fastify.put("/:id", { preHandler: [middleware] }, updateFactura);
  done();
};
