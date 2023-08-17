import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/queries/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = ({ title, categories, excludeProductId }) => {
  //useQuery se usa solamente para hacer peticiones de tipo get.
  //useMutation se usa para hacer peticiones de tipo post/put/patch/delete
  const { data, isLoading, isError } = useProducts(title, categories);
  if (isLoading)
    return (
      <div className="loader__container">
        <span className="loader"></span>
      </div>
    );
  if (isError) return <p>Ops, algo salio mal</p>;
  //isError y isLoading me los da reactQuery . Que lo estoy usando a traves de useProducts()
  if (data.length === 0)
    return <p className="no__product__found">No products found</p>;

  return (
    <div className="products__list__grid">
      {data
        .filter((product) => !excludeProductId?.includes(product.id))
        .map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product__list__item"
          >
            <ProductCard productData={product} />
          </Link>
        ))}
    </div>
  );
};

export default ProductList;
