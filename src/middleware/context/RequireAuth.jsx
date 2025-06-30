import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login " replace />;
  }

  return children;
};

export default RequireAuth;

{
  /* <ProtectedRoute
        userAccess={accessLevel}
        allowedAccess={["Super Admin", "Admin"]}
      >
        <AdminPanel />
      </ProtectedRoute> */
}
