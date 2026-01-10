import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [role, setRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchRole = async () => {
            try {
                const res = await axiosSecure.get(`/users/${user.email}`);
                setRole(res.data.role);
            } catch (error) {
                console.error("Failed to fetch user role", error);
                setRole(null);
            } finally {
                setRoleLoading(false);
            }
        };

        fetchRole();
    }, [user?.email, axiosSecure]);

    return { role, roleLoading };
};

export default useUserRole;
