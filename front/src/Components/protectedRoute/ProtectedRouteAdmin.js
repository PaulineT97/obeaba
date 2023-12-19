import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteAdmin ({ children }) {
    const {user} = useContext(AuthContext);
    return user.adherent.admin ? children : <Navigate to="/Forms" />;
}