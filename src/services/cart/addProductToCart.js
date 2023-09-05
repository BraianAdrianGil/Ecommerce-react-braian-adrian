import { axiosInstance } from "../../api/axiosInstance";

export const addProductToCart = async ({ token, quantity, productId }) => {
  const body = {
    quantity,
    productId,
  };

  try {
    await axiosInstance.post("/cart", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error.response) {
      throw typeof error.response.data === "string"
        ? new Error(error.response.data)
        : error.response.data;
    } else {
      throw new Error("Oops something went wrong with cart request");
    }
  }
};
