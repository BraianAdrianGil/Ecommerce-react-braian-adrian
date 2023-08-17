import { useQuery } from "@tanstack/react-query";
import { getOneProductById } from "../../services/products/getProductById";

export const useProductById = (productId) => {
  const query = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getOneProductById(productId),
  });
  return query;
};
