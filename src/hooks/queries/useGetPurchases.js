import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getPurchases } from "../../services/purchases/getPurchases";

export const useGetPurchases = () => {
  const token = useSelector((store) => store.auth.token);
  const query = useQuery({
    queryKey: ["purchases"],
    queryFn: () => getPurchases(token),
  });
  return query;
};
