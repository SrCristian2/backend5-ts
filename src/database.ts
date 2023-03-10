import mongoose from "mongoose";
import { env } from "./configEnv";

mongoose.set("strictQuery", false);

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(env.MONGO_URI);
    console.log("base de datos conectada", db.connection.name);
  } catch (error:any) {
    console.log(`error al conectar a la base de datos ${error.message}`);
  }
};
