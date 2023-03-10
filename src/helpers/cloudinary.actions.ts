import cloudinary from "./cloudinary.config";
import { deleteImg } from "./deleteImg";

export const subirImageACloudinary = async (file: any) => {
  try {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path
    );
    deleteImg(file.filename);
    return {
      secure_url,
      public_id,
    };
  } catch (error:any) {
    console.log("error en subirImageACloudinary", error.message);
  }
};

export const eliminarImagenCloudinary = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error:any) {
    console.log("error en eliminarImagenCloudinary", error.message);
  }
};
