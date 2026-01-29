import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyParcels = () => {
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [parcelDeleteId, setParcelDeleteId] = useState(null);


    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/parcels?email=${user.email}`)
            .then(res => {
                console.log(res.data);
                setParcels(res.data);
            })
            .catch(err => console.error(err));

    }, [user?.email, axiosSecure]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB");
        // new Date(date).toLocaleString();
    }


    const handleDeleteClick = (id) => {
        setParcelDeleteId(id);
        document.getElementById("delete_confirmation_modal").showModal();
    };

    const handlePayment = async () => {
        const previousParcels = [...parcels];
        // Optimistically update UI
        setParcels(prev => prev.map(p => p._id === selectedParcel._id ? { ...p, paymentStatus: "paid" } : p));
        try {
            await axiosSecure.patch(`/parcels/${selectedParcel._id}`, { paymentStatus: "paid" });
        } catch (err) {
            setParcels(previousParcels);
            alert("Payment failed!", err);
        } finally {
            document.getElementById("payment_modal").close();
        }
    }

    const handleConfirmDelete = async () => {
        if (!parcelDeleteId) return;

        const previousParcels = [...parcels];

        // Optimistic UI
        setParcels(parcels.filter(p => p._id !== parcelDeleteId));

        try {
            await axiosSecure.delete(`/parcels/${parcelDeleteId}`);
        } catch (err) {
            // Rollback
            setParcels(previousParcels);
            alert("Delete failed!", err);
        } finally {
            setParcelDeleteId(null);
            document.getElementById("delete_confirmation_modal").close();
        }
    };



    return (
        <div>
            my parcels: {parcels.length}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>#</th>
                            <th>Parcel</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Charge</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td className="font-medium">{parcel.parcelName}</td>
                                <td>{parcel.productType}</td>
                                <td>{formatDate(parcel.creationDate)}</td>
                                <td>৳{parcel.deliveryCharge}</td>

                                <td>
                                    <span
                                        className={`badge ${parcel.paymentStatus === "paid"
                                            ? "badge-success"
                                            : "badge-warning"
                                            }`}
                                    >
                                        {parcel.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`badge ${parcel.deliveryStatus === "pending"
                                            ? "badge-warning"
                                            : "badge-success"
                                            }`}
                                    >
                                        {parcel.deliveryStatus}
                                    </span>
                                </td>

                                <td className="space-x-2">
                                    <button
                                        className="btn btn-xs btn-info" onClick={() => {
                                            setSelectedParcel(parcel);
                                            document.getElementById("view_modal").showModal();
                                        }}
                                    >
                                        View
                                    </button>

                                    <button
                                        className="btn btn-xs btn-success" disabled={parcel.paymentStatus === "paid"}
                                        onClick={() => {
                                            setSelectedParcel(parcel);
                                            document.getElementById("payment_modal").showModal();
                                        }}
                                    >
                                        Pay
                                    </button>

                                    <button className="btn btn-xs btn-error" disabled={parcel.paymentStatus === "paid"}
                                        onClick={() => handleDeleteClick(parcel._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* view_modal */}
            <dialog id="view_modal" className="modal">
                <div className="modal-box max-w-5xl">
                    <h3 className="font-bold text-xl mb-6 text-center">
                        📦 Parcel Details
                    </h3>

                    {selectedParcel && (
                        <div className="space-y-6">

                            {/* ROW 1: Sender + Receiver */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Sender Info */}
                                <div className="card bg-base-200 shadow-md border border-gray-200">
                                    <div className="card-body p-4">
                                        <h4 className="card-title text-sm text-primary">
                                            Sender Info
                                        </h4>

                                        <p><span className="font-medium">Name:</span> {selectedParcel.senderName}</p>
                                        <p><span className="font-medium">Email:</span> {selectedParcel.createdBy}</p>
                                        <p><span className="font-medium">Phone:</span> {selectedParcel.senderContactNo}</p>
                                        <p><span className="font-medium">Address:</span> {selectedParcel.yourAddress}</p>
                                        <p><span className="font-medium">District:</span> {selectedParcel.yourDistrict}</p>
                                        <p><span className="font-medium">Division:</span> {selectedParcel.yourDivision}</p>
                                    </div>
                                </div>

                                {/* Receiver Info */}
                                <div className="card bg-base-200 shadow-md border border-gray-200">
                                    <div className="card-body p-4">
                                        <h4 className="card-title text-sm text-secondary">
                                            Receiver Info
                                        </h4>

                                        <p><span className="font-medium">Name:</span> {selectedParcel.receiverName}</p>
                                        <p><span className="font-medium">Phone:</span> {selectedParcel.receiverContactNo}</p>
                                        <p><span className="font-medium">Address:</span> {selectedParcel.receiverAddress}</p>
                                        <p><span className="font-medium">District:</span> {selectedParcel.receiverDistrict}</p>
                                        <p><span className="font-medium">Division:</span> {selectedParcel.receiverDivision}</p>
                                    </div>
                                </div>
                            </div>

                            {/* ROW 2: Parcel Details */}
                            <div className="card bg-base-200 shadow-md border border-gray-200">
                                <div className="card-body p-4">
                                    <h4 className="card-title text-sm text-accent">
                                        Parcel Information
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <p><span className="font-medium">Parcel:</span> {selectedParcel.parcelName}</p>
                                        <p><span className="font-medium">Type:</span> {selectedParcel.productType}</p>
                                        <p>
                                            <span className="font-medium">Weight:</span>{" "}
                                            {selectedParcel.weight ?? "N/A"} kg
                                        </p>

                                        <p>
                                            <span className="font-medium">Charge:</span>{" "}
                                            ৳{selectedParcel.deliveryCharge}
                                        </p>

                                        <p>
                                            <span className="font-medium">Payment Status:</span>{" "}
                                            <span
                                                className={`badge ${selectedParcel.paymentStatus === "paid"
                                                    ? "badge-success"
                                                    : "badge-warning"
                                                    }`}
                                            >
                                                {selectedParcel.paymentStatus}
                                            </span>
                                        </p>

                                        <p>
                                            <span className="font-medium">Delivery Status:</span>{" "}
                                            <span className="badge badge-info">
                                                {selectedParcel.deliveryStatus}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="shadow-sm shad my-2 p-2 border-2 border-gray-200">
                                        <p className="md:col-span-3">
                                            <span className="font-medium">Tracking ID:</span>{" "}
                                            <span className="font-mono text-sm bg-base-200 px-2 py-1 rounded">
                                                {selectedParcel.trackingId}
                                            </span>
                                        </p>

                                        <p className="md:col-span-3">
                                            <span className="font-medium">Created:</span>{" "}
                                            {new Date(selectedParcel.creationDate).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* Modal Actions */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


            {/* payment_modal */}
            <dialog id="payment_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-4">Payment</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handlePayment();
                    }}>
                        <label className="font-medium text-lg"> Enter Your Card Number </label>
                        <input type="text" name="cardNumber" required className="input input-bordered w-full mt-2" placeholder="Enter Your Card Number" />

                        <div className="modal-action">
                            <button type="submit" className="btn btn-error">  Submit </button>
                            <button type="button" className="btn btn-outline" onClick={() => document.getElementById("payment_modal").close()} > Cancel  </button>
                        </div>
                    </form>
                </div>
            </dialog>


            {/* delete_confirmation_modal */}
            <dialog id="delete_confirmation_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Delete</h3>
                    <p className="py-4">Are you sure you want to delete this parcel?</p>
                    <div className="modal-action">
                        <button
                            className="btn btn-error"
                            onClick={handleConfirmDelete}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => {
                                setParcelDeleteId(null);
                                document.getElementById("delete_confirmation_modal").close();
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog>



        </div>
    );
};

export default MyParcels;
