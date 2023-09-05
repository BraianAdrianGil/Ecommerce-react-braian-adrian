import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";
import { useCreatePurchase } from "../../../hooks/queries/useCreatePurchase";
import CartProduct from "../CartProduct/CartProduct";
import "./Cart.css";

const Cart = ({ isCartVisible }) => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const { data, isLoading, isError, error } = useCart();
  const createPurchaseMutation = useCreatePurchase();

  //acc es acumular (sumar) en vez de sum seria acc.
  const reducer = (sum, data) => {
    const quantity = Number(data?.quantity);
    const price = Number(data?.product?.price ?? 0);
    return sum + quantity * price;
  };
  const total = data?.reduce(reducer, 0) ?? 0;

  //classnames to make it dinamic
  const classNames = `cart__general__container__not__visible ${
    isCartVisible && "cart__general__container__visible"
  }`;

  const handleCheckout = () => {
    createPurchaseMutation.mutate();
  };

  if (isLoading) return <p></p>;

  if (isError)
    return <p>{error.message ?? "Ops something went wrong loading cart"}</p>;

  return (
    <section className="cart__background__glass__container">
      <div className={classNames}>
        {!data.length && (
          <div className="empty__cart__general__container">
            <h3>My shopping bag</h3>
            <div>
              <img src="https://i.imgur.com/xkTcfE2.png" alt="" />
            </div>
            <h4>Your bag is empty</h4>
            <p>
              You can add items to your shopping bag by clicking on the
              &#34;+&#34; button on the products page.
            </p>
          </div>
        )}

        {Boolean(data.length) && (
          <ul className="products__cart__item__general__container">
            <h4 className="product__cart__title">My shopping bag</h4>
            {data.map((cartProduct) => (
              <div key={cartProduct.productId}>
                <li className="product__card__item__container">
                  <CartProduct cartProduct={cartProduct} />
                </li>
              </div>
            ))}
          </ul>
        )}
        <div className="checkout__general__container">
          <div className="checkout__total__container">
            <span>Total:</span> <span>${total.toFixed(2)}</span>
          </div>
          <div className="cart__checkout__btn__container">
            <button
              className="cart__checkout__btn"
              onClick={handleCheckout}
              disabled={
                createPurchaseMutation.isLoading || isLoading || !data.length
              }
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
