import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import CategoriesFilter from "../../components/homeComponents/CategoriesFilter/CategoriesFilter";
import ProductList from "../../components/homeComponents/ProductList/ProductList";
import { useScrollTop } from "../../hooks/scroll/useScrollTop";
import "./Home.css";

const Home = () => {
  const formId = useId(); // Este id enlaza los filtros de categorías de el componente CategoriesFilter con el formulario Form del section
  const submit = useSubmit(); //Nos da una función para el Form de react router dom, lo necesitamos porque los inputs check de el componente CategoriesFilter no están dentro del Form de react router dom
  const formRef = useRef(); //Da una referencia que no provoca una re-renderización. Como necesitamos enviar el Form y cuando se monta no existe aun usamos el ref con su propiedad .current
  const { title, categories } = useLoaderData();
  const [searchTitleValue, setSearchTitleValue] = useState(title ?? "");

  const onChangeCategories = useCallback(() => {
    if (!formRef.current) return;
    submit(formRef.current);
  }, [submit]);

  useEffect(() => {
    setSearchTitleValue(title);
  }, [title]); //Hacemos esto para reflejar los cambios en el input  si el usuario le da para atrás con las flechas del navegador , que tenga se mantenga el valor que tenia antes. Y toca hacerlo en un efecto porque react no controla las flechas del navegador. Entonces cada vez que la variable title (que saca su valor de la url del loader) cambia con el efecto actualiza el valor asi refleja el cambio.

  return (
    <div className="home__general__container">
      <aside>
        <CategoriesFilter
          formId={formId}
          onChangeCategories={onChangeCategories}
          initialCategories={categories}
        />
      </aside>
      <section className="home__search_filters__general__container">
        <Form
          id={formId}
          ref={formRef}
          className="home__form__general__container"
        >
          <div>
            <input
              type="search"
              name="title"
              id=""
              placeholder="What are you looking for ?"
              value={searchTitleValue}
              onChange={(e) => setSearchTitleValue(e.target.value)}
            />
            <button>
              <i className="bx bx-search-alt-2"></i>
            </button>
          </div>
        </Form>
        <ProductList title={title} categories={categories} />
      </section>
      {/*Custom hook to do top scroll */}
      <button onClick={useScrollTop} className="start__fixed__button__home">
        <i className="bx bx-chevrons-up bx-flashing"></i>
      </button>
    </div>
  );
};

export default Home;
