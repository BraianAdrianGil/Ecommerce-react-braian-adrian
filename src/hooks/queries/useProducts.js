import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/products/getAllProducts";

export const useProducts = (title, categories) => {
  const query = useQuery({
    queryKey: ["products", { title, categories }],
    queryFn: () => getAllProducts(title, categories),
  });

  return query;
};
