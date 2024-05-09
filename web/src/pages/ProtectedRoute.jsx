import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ authPage = false, children }) => {
  const { userToken } = useSelector((state) => state.authReducer);

  if (authPage && userToken) {
    return <Navigate to={"/"} replace />;
  }
  if (!authPage && !userToken) {
    const pathname = window.location.pathname;
    return <Navigate to={`/auth/login?redirect=${pathname}`} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
