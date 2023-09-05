import { useNavigate, useParams } from "react-router-dom";
import { useProductById } from "../../hooks/queries/useProductById";
import ProductList from "../../components/homeComponents/ProductList/ProductList";
import { useEffect, useState } from "react";
import { useAddProductToCart } from "../../hooks/queries/useAddProductToCart";
import { useSelector } from "react-redux";
import { useCart } from "../../hooks/queries/useCart";
import { useUpdateCart } from "../../hooks/queries/useUpdateCart";
import HistoryComponent from "../../components/common/HistoryComponent/HistoryComponent";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const updateCartProduct = useUpdateCart();
  const { mutate, isLoading: isLoadingAddProductToCart } =
    useAddProductToCart();
  const { isLogged } = useSelector((store) => store.auth);
  //cart query lo hacemos asi porque ya tenemos una desustructuracion de una query y se llaman iguales las desustrucraciones entonces almacenamos todo en cart query
  const cartQuery = useCart();
  const { data, isLoading, isError, error } = useProductById(id);
  //Verificamos si el producto de product detail ya esta en el carrito, para mostrar add to cart o update in cart
  const isProductInCart =
    cartQuery.data?.some((cartProduct) => cartProduct.productId === data?.id) ??
    false;

  //Encontramos el producto y lo devolvemos
  const cartProductId = cartQuery.data?.find(
    (cartProduct) => cartProduct.productId === data?.id
  )?.id;

  const quantityInCart =
    cartQuery.data?.find((cartProduct) => cartProduct.productId === Number(id))
      ?.quantity ?? 1;
  const [quantity, setQuantity] = useState(quantityInCart);

  const plus = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const minus = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleAddToCartDetailBtn = () => {
    if (!isLogged) navigate("/login");
    else mutate({ quantity, productId: id });
  };
  const handleUpdate = () => {
    updateCartProduct.mutate({ cartProductId, newQuantity: quantity });
  };

  useEffect(() => {
    setQuantity(Number(quantityInCart));
  }, [quantityInCart]);

  const prevImage = () => {
    if (currentIndex === 0) setCurrentIndex(data.images.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const nextImage = () => {
    if (currentIndex === data.images.length - 1) setCurrentIndex(0);
    else setCurrentIndex(currentIndex + 1);
  };

  const handleImagePreviewClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading)
    return (
      <div className="loader__container">
        <span className="loader"></span>
      </div>
    );

  if (isError) return <p>{error.message ?? "Couldn't load product"}</p>;

  return (
    <section className="product__detail__general__container">
      <div className="history__product__detail__general__container">
        <HistoryComponent productTitle={data.title} />
      </div>

      <section className="product__detail__first__section__general__container">
        <div className="product__detail__gallery">
          <ul className="product__detail__img__carousel">
            <button
              className=" product__detail__arrow product__detail__arrow__left"
              id="prevBtn"
              onClick={prevImage}
            >
              <i className="bx bx-chevron-left"></i>
            </button>
            <button
              className="product__detail__arrow product__detail__arrow__right"
              id="nextBtn"
              onClick={nextImage}
            >
              <i className="bx bx-chevron-right"></i>
            </button>
            {data.images.map((image, index) => (
              <li
                key={image.url}
                style={{ display: index === currentIndex ? "flex" : "none" }}
              >
                <img src={image.url} alt={data.title} />
              </li>
            ))}
          </ul>
          <div className="product__detail__images__preview">
            <ul>
              {data.images.map((image, index) => (
                <li
                  key={image.url}
                  className={index === currentIndex ? "img__preview" : ""}
                >
                  <button onClick={() => handleImagePreviewClick(index)}>
                    <img src={image.url} alt="" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="product__detail__description__buy__general__container">
          <h3>{data.brand}</h3>
          <h2>{data.title}</h2>

          <div className="product__detail__description">
            <p>{data.description}</p>
            <section>
              <div className="product__detail__price__quantity__general__container">
                <div className="product__description__price">
                  <span>Price:</span>
                  <p>${data.price}</p>
                </div>

                <div className="product__description__quantity">
                  <span>Quantity</span>
                  <div>
                    <button onClick={minus}>-</button>
                    <span className="product__quantity">{quantity}</span>
                    <button onClick={plus}>+</button>
                  </div>
                </div>
              </div>

              <div className="product__detail__add__update__button__general__container">
                {!isProductInCart && (
                  <button
                    onClick={handleAddToCartDetailBtn}
                    disabled={isLoadingAddProductToCart}
                  >
                    Add to cart <i className="bx bxs-cart-add"></i>
                  </button>
                )}

                {isProductInCart && (
                  <button onClick={handleUpdate}>Update in cart</button>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="product__detail__similar__section__general__container">
        <h2>Discover similar items</h2>
        <ProductList
          categories={data.categoryId}
          excludeProductId={[data.id]}
        />
      </section>
    </section>
  );
};

export default ProductDetail;
