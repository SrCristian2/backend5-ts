import jwt from "jsonwebtoken";
import { IPayload } from "../interfaces/comun";

export const generateToken = (payload:IPayload) => {
  try {
    const token = jwt.sign(payload, "abc123", {
      expiresIn: "30d",
    });
    return token;
  } catch (error:any) {
    console.log("error en generateToken", error.message);
  }
};
