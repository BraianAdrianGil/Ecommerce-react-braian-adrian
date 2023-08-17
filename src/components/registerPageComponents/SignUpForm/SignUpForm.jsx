import { useId, useState } from "react";
import "./SignUpForm.css";

const SignUpForm = ({ onSendDataRegister }) => {
  //INPUTS ID ====================================
  const signUpInputEmailId = useId();
  const signUpInputFirstNameId = useId();
  const signUpInputLastNameId = useId();
  const signUpInputPasswordId = useId();
  const signUpInputPhoneId = useId();
  //==============================================
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendDataRegister(formData);
  };
  return (
    <>
      <form
        className="sign__up__form__general__container"
        onSubmit={handleSubmit}
      >
        <div className="sign__up__form__input__general__container">
          <label htmlFor={signUpInputFirstNameId}>First name</label>
          <input
            type="text"
            name="firstName"
            placeholder="John Martin"
            id={signUpInputFirstNameId}
            value={FormData.firstName}
            onChange={handleInputsChange}
            required
          />
        </div>
        <div className="sign__up__form__input__general__container">
          <label htmlFor={signUpInputLastNameId}>Last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Doe"
            id={signUpInputLastNameId}
            value={FormData.lastName}
            onChange={handleInputsChange}
            required
          />
        </div>
        <div className="sign__up__form__input__general__container">
          <label htmlFor={signUpInputEmailId}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            id={signUpInputEmailId}
            value={FormData.email}
            onChange={handleInputsChange}
            required
          />
        </div>
        <div className="sign__up__form__input__general__container ">
          <label htmlFor={signUpInputPasswordId}>Password</label>
          <div className="sign__up__form__password__container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="xxx-xxx-xxx"
              id={signUpInputPasswordId}
              value={FormData.password}
              onChange={handleInputsChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              name="toggleButton"
            >
              <i className="bx bx-show"></i>
            </button>
          </div>
        </div>
        <div className="sign__up__form__input__general__container">
          <label htmlFor={signUpInputPhoneId}>Phone (10 characters)</label>
          <input
            type="tel"
            name="phone"
            placeholder="0123456789"
            id={signUpInputPhoneId}
            value={FormData.phone}
            onChange={handleInputsChange}
            minLength="10"
            required
          />
        </div>
        <button type="submit" className="sign__up__form__btn">
          Send
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
