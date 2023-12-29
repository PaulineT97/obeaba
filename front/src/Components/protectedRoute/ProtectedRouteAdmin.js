import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteAdmin({ children }) {
    const { user } = useContext(AuthContext);

    if (user == null) {
        // L'utilisateur n'est pas connecté, redirection vers la page de connexion
        return <Navigate to="/Forms" />;
    }

    return user.adherent && user.adherent.admin ? children : <Navigate to="/Forms" />;

}

