import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    return user ? <Navigate to="/" /> : children;
};

export default GuestRoute;
