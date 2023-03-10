import dotenv from "dotenv";

dotenv.config();

export const env = {
  MONGO_URI: process.env.MONGO_URI || "",
  HOST: process.env.HOST || "",
  CLOUD_NAME: process.env.CLOUD_NAME || "",
  API_KEY: process.env.API_KEY || "",
  API_SECRET: process.env.API_SECRET || "",
  SECRET: process.env.SECRET || "",
};
