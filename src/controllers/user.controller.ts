import { userModel } from "../models/User";
import { response } from "../helpers/Response";
import { encryptPassword } from "../helpers/encryptPassoword";
import { generateToken } from "../helpers/generateToken";
import mongooseErrorHandler from "mongoose-validation-error-message-handler";
import { FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../interfaces/comun";

export const register = async (req: FastifyRequest<{Body:IUser}>, reply: FastifyReply) => {
  try {
    const { email, password, name, lastname } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return response(
        reply,
        409,
        false,
        "",
        "el email ya existe en otro registro"
      );
    }

    const passwordEncrypt = encryptPassword(password);

    const newUser = new userModel({
      email,
      password: passwordEncrypt,
      name,
      lastname,
    });

    await newUser.save();

    const token = generateToken({ _id: newUser._id });

    response(
      reply,
      201,
      true,
      { ...newUser.toJSON(), password: null, token },
      "Usuario creado"
    );
  } catch (error: any) {
    const errorValidation = mongooseErrorHandler(error);
    errorValidation.name === "MongooseValidatorError"
      ? response(reply, 400, false, "", error.message)
      : response(reply, 500, false, "", error.message);
  }
};

export const login = async (req: FastifyRequest<{Body:IUser}>, reply: FastifyReply) => {
  try {
    const { password, email } = req.body;
    const user = await userModel.findOne({ email });

    if (user && user.matchPassword(password)) {
      const token = generateToken({ _id: user._id });
      return response(
        reply,
        200,
        true,
        { ...user.toJSON(), password: null, token },
        "Bienvenido"
      );
    }
    response(reply, 400, false, "", "email o password incorrectos");
  } catch (error: any) {
    response(reply, 500, false, "", error.message);
  }
};
