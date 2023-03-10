import fs from "fs-extra";
import path from "path";

export const deleteImg = async (nameImage: string) => {
  try {
    await fs.unlink(path.resolve(__dirname, "../storage/imgs", nameImage));
  } catch (error: any) {
    console.log("error en la funcion deleteImg", error.message);
  }
};
