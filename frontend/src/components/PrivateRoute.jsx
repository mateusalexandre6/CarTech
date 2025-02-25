import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import propTypes from "prop-types";
import LoadingScreen from "./LoadingCustom/LoadingCustom";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, status } = useSelector((state) => state.auth);
  
  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  

  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: propTypes.arrayOf(propTypes.string), // Roles permitidas
};

export default PrivateRoute;
