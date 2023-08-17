import { NavLink, useLocation } from "react-router-dom";
import { useLocationPathName } from "../../../hooks/LocationPathName/useLocationPathName";
import "./HistoryComponent.css";

const HistoryComponent = ({ productTitle }) => {
  const location = useLocation();
  const getTitle = useLocationPathName(location, productTitle);

  return (
    <div className="history__general__container">
      <NavLink to={"/"} className="history__navlink">
        Home
      </NavLink>
      <i className="bx bxs-circle" style={{ color: "#f55555" }}></i>
      <b>{getTitle}</b>
    </div>
  );
};

export default HistoryComponent;
