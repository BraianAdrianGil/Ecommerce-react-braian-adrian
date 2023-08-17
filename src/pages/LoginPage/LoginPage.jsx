import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/loginPageComponents/LoginForm";
import { startSessionThunk } from "../../store/slices/authSlice";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from ?? "/";
  const isLogged = useSelector((store) => store.auth.isLogged);

  const [invalidCredentials, setInvalidCredentials] = useState("");

  const handleLogin = async (loginData) => {
    dispatch(startSessionThunk(loginData));
    if (!isLogged) setInvalidCredentials("❌ Invalid Credentials");
    else {
      setInvalidCredentials("");
    }
  };

  return (
    <section className="login__page__general__container ">
      <div>
        <h2>
          <span>Welcome!</span> Enter your email and password to continue
        </h2>
        <div className="login__page__test__data__general__container">
          <h4>Test data</h4>
          <ul>
            <li>
              <span>📨</span>
              <span>john@gmail.com</span>
            </li>
            <li>
              <span>🔑</span>
              <span>john1234</span>
            </li>
          </ul>
        </div>
        <LoginForm handleLogin={handleLogin} />
      </div>

      <p className="login__sign__up__container">
        Don't have an account?
        <span>
          <Link to={"/register"} className="login__sign__up__container__link">
            Sign Up
          </Link>
        </span>
      </p>
      {isLogged ? (
        <Navigate to={from ?? "/"} />
      ) : (
        <p className={invalidCredentials ? "invalid__credentials" : ""}>
          {invalidCredentials}
        </p>
      )}
      {/* Nullish operator porque puede venir null o undefined el location */}
    </section>
  );
};

export default LoginPage;
