import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "./UserContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(userContext);          
  const userFromStorage = localStorage.getItem("user"); 

  if (!user && !userFromStorage) {
    return <Navigate to="/" replace />;            
  }

  return children;                                  
}
