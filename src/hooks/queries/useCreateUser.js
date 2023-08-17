import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/user/createUser";

export const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: (body) => createUser(body),
  });
  return mutation;
};
