import { axiosInstance } from "../../api/axiosInstance";

export const getAllCategories = async () => {
  try {
    const res = await axiosInstance.get("/categories/");
    return res.data;
  } catch (error) {
    // if(error.response) La petición llego hasta el backend pero el backend no respondió satisfactoriamente(respondió algo fuera del status code 200).
    if (error.response) throw error.response.data;
    else throw new Error("Algo salio mal con la petición de categorías");
  }
};
