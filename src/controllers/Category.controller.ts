import {
  eliminarImagenCloudinary,
  subirImageACloudinary,
} from "../helpers/cloudinary.actions";
import { response } from "../helpers/Response";
import { categoryModel } from "../models/Category";
import { productModel } from "../models/Product";
import mongooseErrorHandler from "mongoose-validation-error-message-handler";
import { FastifyReply, FastifyRequest } from "fastify";
import { ICategory, IParams, IUploadImage } from "../interfaces/comun";


declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
    file?: any;
  }
}

export const createCategory = async (req:FastifyRequest<{Body:ICategory}>, reply:FastifyReply) => {
  try {
    const { name, description } = req.body;

    const newCategory = new categoryModel({
      name,
      description,
    });

    if (req.file) {
      const { secure_url, public_id } = await subirImageACloudinary(req.file) as IUploadImage;
      newCategory.setImg({ secure_url, public_id });
    }

    await categoryModel.create(newCategory);
    response(reply, 201, true, newCategory, "registro creado");
  } catch (error:any) {
    const errorValidation = mongooseErrorHandler(error);
    errorValidation.name === "MongooseValidatorError"
      ? response(reply, 400, false, "", error.message)
      : response(reply, 500, false, "", error.message);
  }
};

export const listAllCategories = async (req:FastifyRequest, reply:FastifyReply) => {
  try {
    const data = await categoryModel.find();
    response(reply, 200, true, data, "lista de categorias");
  } catch (error:any) {
    response(reply, 500, false, "", error.message);
  }
};

export const listByIdCategory = async (req:FastifyRequest<{Params:IParams}>, reply:FastifyReply) => {
  try {
    const { id } = req.params;
    const data = await categoryModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "registro no encontrado");
    }
    response(reply, 200, true, data, "registro encontrado");
  } catch (error:any) {
    response(reply, 500, false, "", error.message);
  }
};

export const deleteCategory = async (req:FastifyRequest<{Params:IParams}>, reply:FastifyReply) => {
  try {
    const { id } = req.params;
    const data = await categoryModel.findById(id);
    if (!data) {
      return response(reply, 404, false, "", "registro no encontrado");
    }

    const productEncontrado = await productModel.findOne({
      category: data._id,
    });
    if (productEncontrado) {
      return response(
        reply,
        400,
        false,
        "",
        "esta categoria no se puede eliminar porque tiene productos vinculados"
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

export const updateCategory = async (req:FastifyRequest<{Body:ICategory,Params:IParams}>, reply:FastifyReply) => {
  try {
    const { id } = req.params;
    const data = await categoryModel.findById(id);
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


