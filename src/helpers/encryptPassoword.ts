import bcrypt from "bcrypt";

export const encryptPassword = (password:string) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordEncriptada = bcrypt.hashSync(password, salt);
    return passwordEncriptada;
  } catch (error:any) {
    console.log("error en encryptPassword", error.message);
  }
};
