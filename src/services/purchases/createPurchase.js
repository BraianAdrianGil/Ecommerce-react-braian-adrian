import { axiosInstance } from "../../api/axiosInstance";

export const createPurchase = async (token) => {
  try {
    await axiosInstance.post("/purchases/", undefined, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response)
      throw typeof error.response.data === "string"
        ? error.response.data
        : new Error(
            "Ops something went wrong with the create purchase request"
          );
  }
};
