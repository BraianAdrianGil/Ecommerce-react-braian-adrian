import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cart/getCart";
import { useSelector } from "react-redux";
//Como esto es un custom hook de react aca si podemos leer el estado de redux a diferencia de la petición en services

export const useCart = () => {
  const { token, isLogged } = useSelector((store) => store.auth);

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(token),
    enabled: isLogged, // Con esto nos aseguramos que el usuario este logeado antes de hacer la query , sino el cart como es parte del layout si el usuario no inicio sesión haría la petición si lo clikea y daría un error.
  });
  return query;
};
