import { Link, useNavigate } from "react-router-dom";
import SignUpForm from "../../components/registerPageComponents/SignUpForm/SignUpForm";
import { useCreateUser } from "../../hooks/queries/useCreateUser";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { mutate } = useCreateUser();
  const navigate = useNavigate();
  const onSendDataRegister = (formData) => {
    mutate(formData);
    navigate("/login");
  };
  return (
    <section className="register__general__container">
      <h2>
        <span>Welcome!</span> Enter your information to register and continue
      </h2>
      <SignUpForm onSendDataRegister={onSendDataRegister} />
      <p className="register__already__have__account__container">
        Already have an account?
        <Link to={"/login"}>
          <span>Log in</span>
        </Link>
      </p>
    </section>
  );
};

export default RegisterPage;
