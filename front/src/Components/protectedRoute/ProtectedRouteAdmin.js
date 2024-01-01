import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteAdmin({ children }) {
    const { user } = useContext(AuthContext);

    if (user == null) {
        // L'utilisateur n'est pas connecté, redirection vers la page de connexion
        return <Navigate to="/Forms" />;
    }

    if ((user.adherent && user.adherent.admin !== 1)) {
        // L'utilisateur n'est pas administrateur, redirection vers une page d'autorisation insuffisante
        return <Navigate to="/" />;
    }

    // L'utilisateur est connecté et est administrateur, rendu des composants enfants
    return children;
}
