import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userAccess, allowedAccess, children }) => {
  if (!allowedAccess.includes(userAccess)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
