import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../store/slices/authSlice";
import { useCart } from "../../../hooks/queries/useCart";
import "./HeaderComponent.css";

const HeaderComponent = ({ handleCartVisible, isCartVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged } = useSelector((store) => store.auth);
  const userTo = isLogged ? "/profile" : "/login";
  const { data } = useCart();

  const handleLogout = () => {
    dispatch(reset());
    navigate("/login");
  };

  const handleCartClick = () => {
    if (isLogged) handleCartVisible();
    else navigate("/login");
  };

  return (
    <div className="header">
      <Link to={"/"} className="header__title">
        <h1>E-commerce</h1>
      </Link>

      <ul className="header__list__general__container">
        <li className="header__list__item__general__container">
          <NavLink to={userTo} className="nav__link">
            <i className="bx bx-user header__list__item"></i>
          </NavLink>
        </li>
        <li className="header__list__item__general__container">
          <NavLink to={"/purchases"} className="nav__link">
            <i className="bx bx-box header__list__item"></i>
          </NavLink>
        </li>
        <li className="header__list__item__general__container">
          <NavLink
            className={isCartVisible ? "nav__link" : "nav__link__cart"}
            onClick={handleCartClick}
            to="#"
          >
            <i className="bx bx-cart header__list__item">
              {isLogged && (
                <div className="header__cart__icon__total__container">
                  <span>{data?.length ?? 0}</span>
                </div>
              )}
            </i>
          </NavLink>
        </li>

        {isLogged && (
          <button
            type="button"
            onClick={handleLogout}
            className="header__log__out__button__container"
          >
            <i className="bx bx-log-out header__list__item"></i>
          </button>
        )}
      </ul>
    </div>
  );
};

export default HeaderComponent;
