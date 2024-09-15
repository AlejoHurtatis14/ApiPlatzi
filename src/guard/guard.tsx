import { ReactNode, useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface GuardProps {
  children: ReactNode;
}

const Guard: React.FC<GuardProps> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  // Redireccionamos si esta autenticado
  if (location.pathname === "/login" && currentUser && currentUser.id > 0) {
    return <Redirect to="/products-general" />;
  }

  // Redirigmos a login si no esta autenticado
  if ((!currentUser || currentUser.id == 0) && location.pathname !== "/login") {
    return <Redirect to="/login" />;
  }

  // Si todo esta correcto dejamos el modulo que este cargando
  return <>{children}</>;
};

export default Guard;
