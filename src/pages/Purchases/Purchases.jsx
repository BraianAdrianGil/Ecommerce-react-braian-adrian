import { NavLink } from "react-router-dom";
import { useGetPurchases } from "../../hooks/queries/useGetPurchases";
import { useScrollTop } from "../../hooks/scroll/useScrollTop";
import HistoryComponent from "../../components/common/HistoryComponent/HistoryComponent";
import "./Purchases.css";

const Purchases = () => {
  const { data, isLoading, isError, error } = useGetPurchases();

  //Función para formatear fechas , nos aseguramos que se conviertan a string si son números y luego nos aseguramos también que mínimo tengan 2 caracteres sino les agrega un 0 al inicio. Finalmente retornamos la fecha completa adaptada a nuestro gusto.
  const productDateFormated = (productDate) => {
    const dateObject = new Date(productDate);
    const day = dateObject.getUTCDate().toString().padStart(2, "0");
    const month = dateObject.getUTCMonth().toString().padStart(2, "0");
    const year = dateObject.getUTCFullYear();
    const formatedDate = `${day}/${month}/${year}`;
    return formatedDate;
  };

  useScrollTop();

  if (isLoading)
    return (
      <div className="loader__container">
        <span className="loader"></span>
      </div>
    );
  if (isError)
    return (
      <p>{error.message ?? "Ops something went wrong loading purchases"}</p>
    );

  return (
    <section className="purchases__general__container">
      <div className="purchases__history__general__container">
        <HistoryComponent />
        <h2>My purchases</h2>
      </div>

      <section className="purchase__products__general__container">
        {data.map((productInfo) => (
          <>
            <NavLink
              to={`/product/${productInfo.productId}`}
              className="purchase__product__card__general__container"
              key={productInfo.id}
            >
              <div className="purchase__product__img__container">
                {productInfo.product.images > 0 ? (
                  <img
                    src={productInfo.product.images[2].url}
                    alt={productInfo.product.title}
                  />
                ) : (
                  <p>Image not available</p>
                )}
              </div>

              <div className="purchase__product__title">
                <p>{productInfo.product.title}</p>
              </div>

              <div className="purchase__product__date">
                <p>{productDateFormated(productInfo.createdAt)}</p>
              </div>

              <div className="purchase__product__quantity">
                <p>{productInfo.quantity}</p>
              </div>

              <div className="purchase__product__price">
                <p>
                  ${productInfo.quantity * Number(productInfo.product.price)}
                </p>
              </div>
            </NavLink>
            <div style={{ width: "100%" }}>
              <hr />
            </div>
            <button
              onClick={useScrollTop}
              className="start__fixed__button__purchase"
            >
              <i className="bx bx-chevrons-up bx-flashing"></i>
            </button>
          </>
        ))}
      </section>
    </section>
  );
};

export default Purchases;
