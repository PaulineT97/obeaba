import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);

    // return (user) ? children : <Navigate to="/Forms" />;
    if (user.adherent.admin == 1) {
        // L'utilisateur est connecté et est un administrateur, rediriger vers /Admin
        return <Navigate to="/Admin" />;
    }

    // L'utilisateur n'est pas connecté ou n'est pas un administrateur, rediriger vers /Forms
    return user.adherent ? children : <Navigate to="/Forms" />;
}





