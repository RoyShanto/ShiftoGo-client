import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const MakeAdmin = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const loginUserEmail = user.email
    console.log(loginUserEmail)

    // 🔹 Load users
    useEffect(() => {
        axiosSecure.get("/users").then(res => {
            setUsers(res.data);
        });
    }, [axiosSecure]);

    // 🔹 Toggle admin role
    const handleToggleAdmin = async (user) => {
        if (user.role === "user")
            return alert("A user cannot become an admin.")

        const newRole = user.role === "admin" ? "rider" : "admin";

        // Optimistic UI
        setUsers(prev =>
            prev.map(u =>
                u._id === user._id ? { ...u, role: newRole } : u
            )
        );

        try {
            await axiosSecure.patch(`/users/${user._id}`, { role: newRole, });
        } catch (error) {
            alert("Role update failed!", error);

            // rollback
            setUsers(prev =>
                prev.map(u =>
                    u._id === user._id ? { ...u, role: user.role } : u
                )
            );
        }
    };

    // 🔍 Filter users
    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="p-6">
            {/* Header + Search */}
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by email"
                    className="input input-success w-full max-w-96 rounded-2xl shadow-md"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <h2 className="text-xl font-bold">
                    Users List ({filteredUsers.length})
                </h2>
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Creation Date</th>
                            <th>Last Login</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span
                                        className={`badge ${user.role === "admin"
                                            ? "badge-success"
                                            : "badge-ghost"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    {new Date(user.creationDate).toLocaleDateString()}
                                </td>
                                <td>
                                    {user.lastLogin
                                        ? new Date(user.lastLogin).toLocaleDateString()
                                        : "—"}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleToggleAdmin(user)}
                                        disabled={user.email === loginUserEmail}
                                        className={`btn btn-xs ${user.role === "admin" ? "btn-error" : "btn-success"} `}
                                    >
                                        {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;
