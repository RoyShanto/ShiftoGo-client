import { Navigate } from "react-router";
import useUserRole from "../hooks/useUserRoll";

const AdminRoute = ({ children }) => {
    const { role, roleLoading } = useUserRole()
    // ⏳ Wait until role is loaded
    if (roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (role !== "admin") return <Navigate to="/error" replace />;

    return children;
};

export default AdminRoute;