import { axiosInstance } from "../../api/axiosInstance";

export const getPurchases = async (token) => {
  try {
    const res = await axiosInstance.get("/purchases", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? error.response.data
        : new Error("Ops something went wrong with the get purchases request");
  }
};
