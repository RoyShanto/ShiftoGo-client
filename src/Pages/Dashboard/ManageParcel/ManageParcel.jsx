import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageParcel = () => {
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [riders, setRiders] = useState([]);
    // const [parcelDeleteId, setParcelDeleteId] = useState(null);


    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user?.email) return;

        // axiosSecure.get(`/parcels?email=${user.email}`)
        axiosSecure.get(`/parcels`)
            .then(res => { setParcels(res.data); })
            .catch(err => console.error(err));
    }, [user?.email, axiosSecure]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB");
        // new Date(date).toLocaleString();
    }

    useEffect(() => {
        axiosSecure.get("riders")
            .then(res => {
                const availableRiders = res.data.filter(
                    rider => rider.currentStatus === "available"
                );
                setRiders(availableRiders);
            })
            .catch(err => {
                console.error(err);
                alert("Rider load error");
            });
    }, [axiosSecure]);


    const handleAssignRider = async (rider) => {
        const parcelInfo = {
            deliveryStatus: "rider_assigned",
            assign_rider_id: rider._id,
            assign_rider_name: rider.name,
            assign_rider_phone: rider.phone,
            assign_rider_email: rider.email
        }
        console.log("Assigned Rider:", parcelInfo);
        try {
            const parcelResult = await axiosSecure.patch(`/parcels/${selectedParcel._id}/status`, { parcelInfo });
            console.log(parcelResult.data)
            try {
                const riderResult = await axiosSecure.patch(`/riders/${rider._id}/status`, { currentStatus: "busy" });
                console.log(riderResult.data)

            } catch (err) {
                alert("Rider Update failed!", err);
            }


        } catch (err) {
            alert("Payment failed!", err);
        } finally {
            document.getElementById("assign_rider_modal").close();
        }
    };


    return (
        <div>
            Manage Parcel
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
                                        }} >
                                        View
                                    </button>

                                    <button
                                        className="btn btn-xs btn-success" disabled={parcel.paymentStatus === "unpaid" || parcel.deliveryStatus !== "pending"}
                                        onClick={() => {
                                            setSelectedParcel(parcel);
                                            document.getElementById("assign_rider_modal").showModal();
                                        }} >
                                        Assign Rider
                                    </button>

                                    {/* <button className="btn btn-xs btn-error" disabled={parcel.paymentStatus === "paid"}
                                        onClick={() => handleDeleteClick(parcel._id)}>
                                        Delete
                                    </button> */}
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
                            {/* ROW 3: Rider Details */}

                            {selectedParcel.assign_rider_email && (
                                <div className="card bg-base-200 shadow-md border border-gray-200 md:w-2xl mx-auto rounded-full">
                                    <div className="card-body p-4 text-center">
                                        <h4 className="card-title text-md text-secondary mx-auto">
                                            Rider Information
                                        </h4>
                                        <div className="flex">
                                            <p><span className="font-medium">Name:</span> {selectedParcel.assign_rider_name}</p>
                                            <p><span className="font-medium">Phone:</span> {selectedParcel.assign_rider_phone}</p>
                                            <p><span className="font-medium">Email:</span> {selectedParcel.assign_rider_email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}



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

            {/* Assign Rider Modal */}
            <dialog id="assign_rider_modal" className="modal">
                <div className="modal-box w-11/12 max-w-4xl">
                    <h3 className="font-bold text-xl mb-4">
                        Assign Rider
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Region</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {riders?.length > 0 ? (
                                    riders.map((rider, index) => (
                                        <tr key={rider._id}>
                                            <td>{index + 1}</td>
                                            <td>{rider.name}</td>
                                            <td>{rider.region}</td>
                                            <td>
                                                <span
                                                    className={`badge ${rider.status === "active"
                                                        ? "badge-success"
                                                        : "badge-error"
                                                        }`}
                                                >
                                                    {rider.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    disabled={rider.status !== "activate"}
                                                    onClick={() => handleAssignRider(rider)}
                                                    className="btn btn-xs btn-primary"
                                                >
                                                    Assign
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No riders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>



        </div>
    );
};

export default ManageParcel;