import { axiosInstance } from "../../api/axiosInstance";

export const getLoggedUser = async (token) => {
  try {
    const res = await axiosInstance.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    else
      throw new Error(
        "Ops something went wrong  with de get logged user request"
      );
  }
};
