import { useEffect, useState } from "react";
import { useUpdateCart } from "../../../hooks/queries/useUpdateCart";
import { NavLink } from "react-router-dom";
import { useDeleteProductFromCart } from "../../../hooks/queries/useDeleteProductFomCart";
import "./CartProduct.css";

const CartProduct = ({ cartProduct }) => {
  const initialQuantity = Number(cartProduct.quantity);
  const price = Number(cartProduct.product?.price);
  const deleteQueryMutation = useDeleteProductFromCart();
  const [quantity, setQuantity] = useState(initialQuantity);
  const { mutate, isLoading } = useUpdateCart();

  const sortedImages = [...cartProduct.product.images]?.sort(
    (a, b) => a.id - b.id
  );

  const plus = () => {
    const newQuantity = quantity + 1;
    if (newQuantity) setQuantity(newQuantity);
  };
  const minus = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleUpdate = () => {
    mutate({ cartProductId: cartProduct.id, newQuantity: quantity });
  };

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleDelete = () => {
    deleteQueryMutation.mutate(cartProduct.id);
  };

  if (deleteQueryMutation.isLoading)
    return (
      <div className=" loader__container__cart__product">
        <span className="loader"></span>
      </div>
    );

  if (cartProduct.length < 0) return;
  console.log(cartProduct);
  return (
    <>
      <div className="xcxcx">
        <div className="sdsdsd">
          <NavLink
            className="product__cart__img__container"
            to={`/product/${cartProduct.productId}`}
          >
            {cartProduct.product.images.length > 0 ? (
              <div>
                <img src={sortedImages[0].url} alt="" />
              </div>
            ) : (
              <p>Image not available</p>
            )}
          </NavLink>

          <div className="product__cart__quantity__container">
            <span>{cartProduct.product?.title}</span>

            <div className="product__cart__buttons__general__container">
              <button onClick={minus}>
                <i className="bx bx-minus"></i>
              </button>
              <span>{quantity}</span>
              <button onClick={plus}>
                <i className="bx bx-plus"></i>
              </button>
            </div>
          </div>

          <div className="product__cart__remove__button__general__container">
            <button
              onClick={handleDelete}
              disabled={deleteQueryMutation.isLoading}
            >
              <i className="bx bx-trash"></i>
            </button>
          </div>
        </div>
        <div className="product__cart__item__total">
          {initialQuantity !== quantity && (
            <button
              onClick={handleUpdate}
              disabled={isLoading} // deshabilitamos el botón mientras esta cargando la query del carrito (isLoading).
              className="updateCart"
            >
              Update cart
            </button>
          )}
          <div>
            <span>Total:</span> <b>${initialQuantity * price}</b>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
