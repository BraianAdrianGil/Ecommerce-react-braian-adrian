import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "../../services/cart/addProductToCart";
import { useSelector } from "react-redux";

export const useAddProductToCart = () => {
  const { token } = useSelector((store) => store.auth);
  //Retorna el objeto queryClient que gestiona todo el cache de React Query
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ quantity, productId }) =>
      addProductToCart({ token, quantity, productId }), //Si todo sale bien con el mutation modificamos el backend pero los datos viejos siguen reflejados en el navegador porque no recarga el cache del queryclient. Por eso usamos on success invalidamos(hacer que recargue la app) en este caso useCart.js que contiene con la key que pusimos abajo. On success es asíncrono.
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return mutation;
};
