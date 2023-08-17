import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getLoggedUser } from "../../services/user/getLoggedUser";

export const useLoggedUser = () => {
  const token = useSelector((store) => store.auth.token);

  const query = useQuery({
    queryFn: () => getLoggedUser(token),
    queryKey: ["user"],
  });
  return query;
};
