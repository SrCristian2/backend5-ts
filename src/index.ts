import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import multer from "fastify-multer";
import { connectDb } from "./database";
import { categoryRoutes } from "./routes/category.routes";
import { facturaRoutes } from "./routes/factura.routes";
import { productRoutes } from "./routes/product.routes";
import { userRoutes } from "./routes/user.routes";
import { env } from "./configEnv";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";


// const fastify = Fastify({
//   logger: true,
// });

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(connectDb)
fastify.register(cors, { origin: "*" });
fastify.register(formBody);
fastify.register(multer.contentParser);

//ROUTES
fastify.register(categoryRoutes,{prefix:"/category"})
fastify.register(facturaRoutes,{prefix:"/factura"})
fastify.register(productRoutes,{prefix:"/product"})
fastify.register(userRoutes,{prefix:"/user"})


const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: env.HOST });
    console.log("servidor escuchando por el puerto 4000");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
