import { useSelector } from "react-redux";
import { useAddProductToCart } from "../../../hooks/queries/useAddProductToCart";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/queries/useCart";
import "./ProductCard.css";

const ProductCard = ({ productData }) => {
  const { isLogged } = useSelector((store) => store.auth);
  const { data, isLoading } = useCart();
  const { mutate } = useAddProductToCart();
  const navigate = useNavigate();

  const isProductInCart = data?.some(
    (cartProduct) => cartProduct.product.id === productData.id
  );

  const isAddToCartBtnVisible = !isLogged || (isLogged && !isProductInCart);

  const handleAddProductToCartButton = (e) => {
    e.preventDefault();
    if (!isLogged) navigate("/login");
    else mutate({ quantity: 1, productId: productData.id });
  };

  return (
    <article className="product__card__general__container">
      <div className="product__card__img__general__container">
        <img
          src={productData.images[0].url}
          alt={productData.title + " image 1"}
          className="product__card__first__img"
        />
        <div>
          <img
            src={productData.images[1].url}
            alt={productData.title + " image 2"}
            className="product__card__second__img"
          />
        </div>
      </div>

      <section className="product__card__info">
        <h3 className="product__card__brand">{productData.brand}</h3>
        <h2 className="product__card__title">{productData.title}</h2>
        <span className="product__card__price">Price:</span>
        <span className="product__card__price__amount">
          {productData.price}
        </span>
      </section>

      {isAddToCartBtnVisible ? (
        <button
          onClick={handleAddProductToCartButton}
          className="product__add__button"
          disabled={isLoading}
        >
          <i className="bx bxs-cart-add"></i>
        </button>
      ) : (
        <p className="product__cart__add__btn__already__in">
          This product is already in cart
        </p>
      )}
    </article>
  );
};

export default ProductCard;
