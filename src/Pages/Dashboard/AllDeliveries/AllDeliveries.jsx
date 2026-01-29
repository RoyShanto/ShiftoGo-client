import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AllDeliveries = () => {
    const [incompleteDeliveries, setIncompleteDeliveries] = useState([]);
    const [completedDeliveries, setCompletedDeliveries] = useState([]);

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.email) return; // 🔐 wait for user

        axiosSecure.get("/parcels").then(res => {
            const incomplete = res.data.filter(d => d.deliveryStatus !== "complete" && d.assign_rider_email === user.email);
            const complete = res.data.filter(d => d.deliveryStatus === "complete" && d.assign_rider_email === user.email);

            setIncompleteDeliveries(incomplete);
            setCompletedDeliveries(complete);
        });
    }, [axiosSecure, user]);

    console.log(incompleteDeliveries)
    // 🔹 Mark delivery as complete
    const handleCompleteDelivery = async (parcel) => {
        // Optimistic UI
        setIncompleteDeliveries(prev =>
            prev.filter(d => d._id !== parcel._id)
        );

        setCompletedDeliveries(prev => [
            { ...parcel, deliveryStatus: "complete" },
            ...prev
        ]);

        try {
            await axiosSecure.patch(`/parcels/${parcel._id}/completeDelivery`,
                { deliveryStatus: "complete", deliveryDate: new Date().toISOString() });
            await axiosSecure.patch(`/riders/${user?.email}/currentStatus`, { currentStatus: "available", });

        } catch (error) {
            alert("Failed to complete delivery", error);

            // rollback
            setCompletedDeliveries(prev =>
                prev.filter(d => d._id !== parcel._id)
            );
            setIncompleteDeliveries(prev => [...prev, parcel]);
        }
    };

    return (
        <div className="p-6 space-y-10">
            {/* ================= INCOMPLETE DELIVERY ================= */}
            <div>
                <h2 className="text-xl font-bold mb-4">
                    Incomplete Deliveries ({incompleteDeliveries.length})
                </h2>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Parcel</th>
                                <th>weight(kg)</th>
                                <th>Receiver</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {incompleteDeliveries.length ? (
                                incompleteDeliveries.map((delivery, index) => (
                                    <tr key={delivery._id}>
                                        <td>{index + 1}</td>
                                        <td>{delivery.parcelName}</td>
                                        <td>{delivery.weight}</td>
                                        <td>{delivery.receiverName}</td>
                                        <td>{delivery.receiverAddress}, {delivery.receiverDistrict}, {delivery.receiverDivision} </td>
                                        <td>{delivery.receiverContactNo}</td>
                                        <td>
                                            <button onClick={() => handleCompleteDelivery(delivery)}
                                                className="btn btn-xs btn-success"  >
                                                Complete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No incomplete deliveries
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= COMPLETED DELIVERY ================= */}
            <div>
                <h2 className="text-xl font-bold mb-4">
                    Completed Deliveries ({completedDeliveries.length})
                </h2>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Parcel</th>
                                <th>Weight(kg)</th>
                                <th>Receiver</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Completed At</th>
                            </tr>
                        </thead>

                        <tbody>
                            {completedDeliveries.length ? (
                                completedDeliveries.map((delivery, index) => (
                                    <tr key={delivery._id}>
                                        <td>{index + 1}</td>
                                        <td>{delivery.parcelName}</td>
                                        <td>{delivery.weight}</td>
                                        <td>{delivery.receiverName}</td>
                                        <td>{delivery.receiverAddress}, {delivery.receiverDistrict}, {delivery.receiverDivision} </td>
                                        <td>{delivery.receiverContactNo}</td>
                                        <td>
                                            {delivery.deliveryDate
                                                ? new Date(delivery.deliveryDate).toLocaleDateString()
                                                : "—"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No completed deliveries
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllDeliveries;
