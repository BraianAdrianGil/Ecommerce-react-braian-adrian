import "./FooterComponent.css";

const FooterComponent = () => {
  return (
    <div className="footer__component__general__container">
      <ul className="footer__component__items__general__container">
        <li className="footer__item">
          <a href="">
            <i className="bx bxl-github" style={{ color: "black" }}></i>
          </a>
        </li>
        <li className="footer__item">
          <a href="">
            <i
              className="bx bxl-linkedin-square"
              style={{ color: "#4f98d5" }}
            ></i>
          </a>
        </li>
        <li className="footer__item">
          <a href="https://api.whatsapp.com/send?phone=+598098604405&text=MENSAJE_DE_TEXTO">
            <i
              className="bx bxl-whatsapp"
              style={{ color: "rgb(70, 180, 70)" }}
            ></i>
          </a>
        </li>
      </ul>

      <div className="footer__component__rights__mail__general__container">
        <p>
          <a href="mailto:braian.adrian.gagliardo@gmail.com">
            braian.adrian.gagliardo@gmail.com
          </a>
        </p>
        <p>© 2023 Braian Adrian G. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default FooterComponent;
