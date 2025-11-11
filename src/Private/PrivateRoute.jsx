import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Show loading spinner while Firebase checks authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  // If user not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user exists, allow access
  return children;
};

export default PrivateRoute;
