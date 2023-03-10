// import { userSchema } from "../Schemas/userSchema.js";

import { login, register } from "../controllers/user.controller";
import { userSchema } from "../Schemas/userSchema";

export const userRoutes = (fastify: any, opts: any, done: any) => {
  fastify.post("/register", {schema:userSchema},register);
  fastify.post("/login", login);
  done();
};
