import {
  eliminarImagenCloudinary,
  subirImageACloudinary,
} from "../helpers/cloudinary.actions";
import { response } from "../helpers/Response";
import { facturaModel } from "../models/Factura";
import { productModel } from "../models/Product";
import mongooseErrorHandler from "mongoose-validation-error-message-handler";
import { FastifyReply, FastifyRequest } from "fastify";
import { IParams, IProduct, IUploadImage } from "../interfaces/comun";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
    file?: any;
  }
}

export const createProduct = async (req:FastifyRequest<{Body:IProduct}>, reply:FastifyReply) => {
  try {
    const newProduct = new productModel({ ...req.body, user: req.userId });

    if (req.file) {
      const { secure_url, public_id } = await subirImageACloudinary(req.file) as IUploadImage;
      newProduct.setImg({ secure_url, public_id });
    }
    await productModel.create(newProduct);
    response(reply, 201, true, newProduct, "registro creado");
  } catch (error:any) {
    const errorValidation = mongooseErrorHandler(error);
    errorValidation.name === "MongooseValidatorError"
      ? response(reply, 400, false, "", error.message)
      : response(reply, 500, false, "", error.message);
  }
};

export const listAllProducts = async (req:FastifyRequest, reply:FastifyReply) => {
  try {
    const data = await productModel
      .find()
      .populate("category")
      .populate("user", "-password");
    response(reply, 200, true, data, "lista de productos");
  } catch (error:any) {
    response(reply, 500, false, "", error.message);
  }
};

export const listByIdProduct = async (req:FastifyRequest<{Params:IParams}>, reply:FastifyReply) => {
  try {
    const { id } = req.params;
    const data = await productModel
      .findById(id)
      .populate("category")
      .populate("user", "-password");
    if (!data) {
      return response(reply, 404, false, "", "registro no encontrado");
    }
    response(reply, 200, true, data, "registro encontrado");
  } catch (error:any) {
    response(reply, 500, false, "", error.message);
  }
};

export const deleteProduct = async (req:FastifyRequest<{Params:IParams}>, reply:FastifyReply) => {
  try {
    const { id } = req.params;
    const data = await productModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "registro no encontrado");
    }

    const factura = await facturaModel.findOne({ product: data._id });
    console.log({ factura });
    if (factura) {
      return response(
        reply,
        400,
        false,
        "",
        "este producto no se puede eliminar porque tiene al menos una factura vinculada"
      );
    }

    if (data.public_id) {
      await eliminarImagenCloudinary(data.public_id);
    }

    await data.deleteOne();
    response(reply, 200, true, "", "registro eliminado");
  } catch (error:any) {
    response(reply, 500, false, "", error.message);
  }
};

export const updateProduct = async (req:FastifyRequest<{Body:IProduct,Params:IParams}>, reply:FastifyReply) => {
  try {
    const { id } = req.params;
    const data = await productModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "registro no encontrado");
    }

    if (req.file) {
      if (data.public_id) {
        await eliminarImagenCloudinary(data.public_id);
      }
      const { secure_url, public_id } = await subirImageACloudinary(req.file) as IUploadImage;
      data.setImg({ secure_url, public_id });
      await data.save();
    }

    await data.updateOne(req.body);
    response(reply, 200, true, "", "registro actualizado");
  } catch (error:any) {
    response(reply, 500, false, "", error.message);
  }
};

