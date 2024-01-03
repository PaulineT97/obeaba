import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (user == null) {
        return <Navigate to="/Forms" />;
    }

    if ((user.adherent.admin == 1)) {
        return <Navigate to="/Admin" />;
    }
    return children;
}