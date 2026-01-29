import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaEye } from "react-icons/fa";

const AllRiders = () => {
    const [riders, setRiders] = useState([]);
    const [selectedRider, setSelectedRider] = useState(null);
    const [newStatus, setNewStatus] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc"); // asc | desc
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");


    // 🔹 Load riders
    useEffect(() => {
        axiosSecure.get("/riders").then(res => {
            setRiders(res.data);
        });
    }, [axiosSecure]);


    // View rider
    const handleView = (rider) => {
        setSelectedRider(rider);
        document.getElementById("view_rider_modal").showModal();
    };

    const handleAcceptRider = async (rider) => {
        // rider.status === "pending" && rider.role === "user"
        try {
            // 2️⃣ API call
            await axiosSecure.patch(`/riders/${rider._id}/acceptRider`, { status: "activate", email: rider.email });

            // 3️⃣ Rollback on error
            setRiders(prev =>
                prev.map(r =>
                    r._id === rider._id ? { ...r, status: "activate" } : r
                )
            );
        } catch (error) {
            alert("The user is not accepted as a rider!", error);
        }
    }

    const handleActivateDeactivate = async (rider) => {
        setSelectedRider(rider)
        setNewStatus(rider.status === "activate" ? "deactivate" : "activate")
        document.getElementById("confirmation_modal").showModal();
    };

    const updateStatus = async () => {
        // 1️⃣ Optimistic UI update
        setRiders(prev =>
            prev.map(r =>
                r._id === selectedRider._id ? { ...r, status: newStatus } : r
            )
        );

        try {
            // 2️⃣ API call
            await axiosSecure.patch(`/riders/${selectedRider._id}/status`, { status: newStatus, email: selectedRider.email });
        } catch (error) {
            alert("Status update failed!", error);

            // 3️⃣ Rollback on error
            setRiders(prev =>
                prev.map(r =>
                    r._id === selectedRider._id ? { ...r, status: selectedRider.status } : r
                )
            );
        }
    }

    const handleSortByStatus = () => {
        const nextOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(nextOrder);

        setRiders(prev =>
            [...prev].sort((a, b) => {
                return nextOrder === "asc"
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status);
            })
        );
    };

    const filteredRiders = riders.filter(rider =>
        rider.name.toLowerCase().includes(searchText.toLowerCase()) ||
        rider.email.toLowerCase().includes(searchText.toLowerCase()) ||
        rider.phone.includes(searchText) ||
        rider.region.toLowerCase().includes(searchText.toLowerCase()) ||
        rider.district.toLowerCase().includes(searchText.toLowerCase())
    );



    return (
        <div className="p-6">

            {/* Search Box */}
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search by name, email, phone, region..."
                    className="input input-success w-full max-w-96 rounded-2xl shadow-md"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <h2 className="text-xl font-bold mb-4">
                All Riders ({filteredRiders.length})
            </h2>

            {/* Display Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className="text-lg">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Region</th>
                            <th>Bike</th>
                            <th
                                className="cursor-pointer select-none"
                                onClick={handleSortByStatus}
                            >
                                Status {sortOrder === "asc" ? "⬆️" : "⬇️"}
                            </th>

                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredRiders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.phone}</td>
                                <td>{rider.region}</td>
                                <td>{rider.bikeModel}</td>
                                <td>
                                    <span
                                        className={`badge ${rider.status === "activate"
                                            ? "badge-success"
                                            : "badge-warning"
                                            }`}
                                    >
                                        {rider.status}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => handleView(rider)} className="btn btn-xs btn-info mr-1" > <FaEye /> </button>
                                    <button onClick={() => handleAcceptRider(rider)}
                                        disabled={rider.status !== "pending"}
                                        className="btn btn-xs btn-info mr-1" > <FaCheckCircle /> </button>

                                    <button onClick={() => handleActivateDeactivate(rider)}
                                        disabled={rider.status === "pending"}
                                        className={`btn btn-xs ${rider.status === "activate"
                                            ? "btn-error"
                                            : "btn-success"
                                            }`}
                                    >
                                        {rider.status === "activate" ? "Deactivate" : "Activate"}
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* 🔍 VIEW MODAL */}
            <dialog id="view_rider_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Rider Details</h3>

                    {selectedRider && (
                        <div className="space-y-2 text-sm">
                            <p><b>Name:</b> {selectedRider.name}</p>
                            <p><b>Email:</b> {selectedRider.email}</p>
                            <p><b>Phone:</b> {selectedRider.phone}</p>
                            <p><b>License:</b> {selectedRider.license}</p>
                            <p><b>NID:</b> {selectedRider.nid}</p>
                            <p><b>Region:</b> {selectedRider.region}</p>
                            <p><b>District:</b> {selectedRider.district}</p>
                            <p><b>Bike Model:</b> {selectedRider.bikeModel}</p>
                            <p><b>Bike Reg:</b> {selectedRider.bikeReg}</p>
                            <p><b>About:</b> {selectedRider.about}</p>
                            <p>
                                <b>Status:</b>{" "}
                                <span className={`badge ${selectedRider.status === "activate"
                                    ? "badge-success"
                                    : "badge-warning"
                                    }`}>
                                    {selectedRider.status}
                                </span>
                            </p>
                            <p><b>Current Status:</b> {selectedRider.currentStatus}</p>
                        </div>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* 🔍 CONFIRMATION MODAL */}
            <dialog id="confirmation_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">
                        Confirm {newStatus}
                    </h3>

                    <p className="py-4">
                        Are you sure you want to {newStatus}{" "}
                        <span className="font-semibold">
                            {selectedRider?.name}
                        </span>
                        ?
                    </p>

                    <div className="modal-action">
                        <form method="dialog" className="space-x-2">
                            <button
                                onClick={updateStatus}
                                className="btn btn-error"
                            >
                                Yes
                            </button>

                            <button
                                onClick={() => setSelectedRider(null)}
                                className="btn btn-outline"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AllRiders;
