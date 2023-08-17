import { useId, useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ handleLogin }) => {
  //Hook from react, to generate randomId. (I used it on labels)
  const emailId = useId();
  const passwordId = useId();
  //====Show password===========================================
  const [showPassword, setShowPassword] = useState(false);
  //====FormData================================================
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // const target = e.target;
    // const value = e.target.value;

    const newFormData = { ...formData, [name]: value }; // copiamos el objeto de la variable de estado formData  y creamos una propiedad [name]:value que viene del e.target , porque la propiedad [name] es igual a la que hay en formData la sobrescribe y se queda con la ultima que es igual. En este caso la que creamos que es el name del input
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    handleLogin(formData);
  };

  //   const handleSubmit = (e) => {
  //     console.log(e);
  //     e.preventDefault();
  //     const formData = new FormData(e.target);
  //     const newData = Object.fromEntries(formData.entries());
  //     onLogin(newData);
  //   };

  return (
    <form onSubmit={handleSubmit} className="login__form__general__container">
      <div className="login__email__container">
        <label htmlFor={emailId}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          id={emailId}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
      </div>

      <div className="login__password__container">
        <label htmlFor={passwordId}>Password</label>

        <div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            id={passwordId}
            onChange={handleChange}
            required
            placeholder="xxx-xxx-xxx"
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
      <button className="login__form__submit__btn">Login</button>
    </form>
  );
};

export default LoginForm;
