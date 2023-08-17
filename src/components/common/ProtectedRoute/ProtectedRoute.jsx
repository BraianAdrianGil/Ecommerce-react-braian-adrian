import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const location = useLocation();
  //use location se usa para dar el state al componente Navigate para saber de donde venia luego de hacer login y lo lleve ahi;
  if (!isLogged)
    return <Navigate to={"/login"} state={{ from: location.pathname }} />;
  else return <>{children}</>;
};

export default ProtectedRoute;
