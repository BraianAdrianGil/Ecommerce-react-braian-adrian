import { axiosInstance } from "../../api/axiosInstance";

export const getOneProductById = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    else
      throw new Error(
        `Something went wrong with the request of the product with id : ${id}`
      );
  }
};
