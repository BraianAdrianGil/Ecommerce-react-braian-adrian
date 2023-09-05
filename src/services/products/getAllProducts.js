import { axiosInstance } from "../../api/axiosInstance";

export const getAllProducts = async (title, categories) => {
  try {
    const params = { title, category: categories };
    const res = await axiosInstance.get("/products/", { params });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
