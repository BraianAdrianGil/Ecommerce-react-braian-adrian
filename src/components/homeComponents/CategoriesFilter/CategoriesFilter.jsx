import { useEffect, useRef, useState } from "react";
import { useCategories } from "../../../hooks/queries/useCategories";
import "./CategoriesFilter.css";

const CategoriesFilter = ({
  formId,
  onChangeCategories,
  initialCategories = [],
}) => {
  const { data, isLoading, isError, error } = useCategories();
  const [categoryIdList, setCategoryIdList] = useState(initialCategories);
  const isFirstRender = useRef(true);
  const [rotateCategoryArrow, setRotateCategoryArrow] = useState(true);

  const addIdToList = (categoryId) => {
    const copyList = structuredClone(categoryIdList);
    copyList.push(categoryId);

    const copyWithoutRepeats = Array.from(new Set(copyList)); // El set quita los repetidos y como el set es un objeto lo convertimos en un [] con el Array.from antes

    if (copyWithoutRepeats.length === data.length) setCategoryIdList([]);
    else setCategoryIdList(copyWithoutRepeats);
  };

  const removeIdFromList = (categoryId) => {
    const listWithoutId = categoryIdList.filter((id) => id !== categoryId);
    setCategoryIdList(listWithoutId);
  };

  const handleChange = (isChecked, categoryId) => {
    if (isChecked) addIdToList(categoryId);
    else removeIdFromList(categoryId);
  };

  const handleEmpty = (isChecked) => {
    if (isChecked) setCategoryIdList([]);
  };

  const arrowRotate = rotateCategoryArrow
    ? "bx bx-chevron-up categories__arrow__up"
    : "bx bx-chevron-up categories__arrow__down";

  const showCategories = rotateCategoryArrow
    ? "categories__filter__general__container"
    : "categories__filter__hide__general__container";

  useEffect(() => {
    if (isFirstRender.current) isFirstRender.current = false;
    else onChangeCategories();
  }, [categoryIdList, onChangeCategories]);

  if (isLoading)
    return (
      <div className="loader__container">
        <span className="loader"></span>
      </div>
    );
  if (isError) return <p>{error.message ?? "Couldn't load categories"}</p>;
  if (data.length === 0)
    return <p>{error?.message ?? "There is no categories"}</p>;

  return (
    //Fieldset es una etiqueta parecida al form pero se usa para encerrar un conjunto de inputs, y todos los fieldset deben tener el atributo form que es para saber a que formulario hace referencia . Ademas debe tener la etiqueta legend
    <fieldset form={formId} className={showCategories}>
      <legend
        className="legend"
        onClick={() => setRotateCategoryArrow(!rotateCategoryArrow)}
      >
        Categories
        <i className={arrowRotate}></i>
      </legend>

      <div>
        <input
          checked={categoryIdList.length === 0} // si da true se chequea sino no se marca
          onChange={(e) => handleEmpty(e.target.checked)}
          type="checkbox"
          name="categories" // Query params
          value="" //
          id="empty-category" //label.
          form={formId} // enlace al form que pertenece este input que viene por props.
          className="check__box__cursor__pointer"
        />
        <label htmlFor="empty-category" className="check__box__cursor__pointer">
          All
        </label>
      </div>

      {data?.map((category) => (
        <div key={category.id}>
          <input
            checked={categoryIdList.includes(category.id)}
            onChange={(e) => handleChange(e.target.checked, category.id)}
            type="checkbox"
            name="categories"
            value={category.id}
            id={category.id + "category"} //Hacemos otro id , porque los productos también tiene id y pueden colisionar por el mismo id
            form={formId}
            className="check__box__cursor__pointer"
          />
          <label
            htmlFor={category.id + "category"}
            className="check__box__cursor__pointer"
          >
            {category.name}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default CategoriesFilter;
