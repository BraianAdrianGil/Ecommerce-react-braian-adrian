import { axiosInstance } from "../../api/axiosInstance";

export const login = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post("/users/login", { email, password });

    return res.data;
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
  }
};
