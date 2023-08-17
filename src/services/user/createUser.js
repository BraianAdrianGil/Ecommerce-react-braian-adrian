import { axiosInstance } from "../../api/axiosInstance";

export const createUser = async (body) => {
  try {
    await axiosInstance.post("/users/", body);
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else
      throw new Error("Ops something went wrong with the create user request");
  }
};
