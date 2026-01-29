import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const SendParcel = () => {
    const { handleSubmit, register, setValue, watch, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()



    const [location, setLocation] = useState([]);
    useEffect(() => {
        fetch('./data/coverageMap.json')
            .then(res => res.json())
            .then(data => setLocation(data))
    }, [])
    const division = [...new Set(location.map(item => item.region))];

    const [senderSelectedDivision, setSenderSelectedDivision] = useState("")
    const [receiverSelectedDivision, setReceiverSelectedDivision] = useState("")
    // console.log(senderSelectedDivision, receiverSelectedDivision)

    const senderDistricts = location.filter(l => l.region === senderSelectedDivision)
    const receiverDistricts = location.filter(l => l.region === receiverSelectedDivision)
    // console.log(senderDistricts, receiverDistricts)

    const [senderSelectedDistrict, setSenderSelectedDistrict] = useState("")
    const [receiverSelectedDistrict, setReceiverSelectedDistrict] = useState("")
    // console.log(senderSelectedDistrict, receiverSelectedDistrict)

    const senderAddress = location.filter(l => l.district === senderSelectedDistrict)
    const receiverAddresses = location.filter(l => l.district === receiverSelectedDistrict)
    // console.log(senderAddress, receiverAddresses)



    // console.log(districts)

    const productType = watch("productType")
    useEffect(() => {
        if (productType === "Document") {
            setValue("weight", null); // or null if you want null
        } else {
            setValue("weight", ""); // clear the field when not Document
        }
    }, [productType]);

    // const deliveryCharge = 50000;
    const [deliveryCharge, setDeliveryCharge] = useState(0)

    const onSubmit = async (values) => {
        // console.log(values);
        const { weight, yourDistrict, receiverDistrict, senderName, receiverName, senderContactNo, receiverContactNo } = values;

        const now = new Date();
        const pad = (n) => n.toString().padStart(2, "0");
        const day = pad(now.getDate());
        const month = pad(now.getMonth() + 1);
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());

        const sender = senderName.split(" ")[0];
        const receiver = receiverName.split(" ")[0];

        const trackId = `${sender}-${day}${month}-${hours}${minutes}-${senderContactNo}-${receiverContactNo}-${receiver}`;
        // console.log(trackId, now.toISOString())



        let charge = 0;
        if (productType === "Document") {
            charge = yourDistrict === receiverDistrict ? 60 : 80;
        }
        else if (productType === "Not-Document" && weight > 0 && weight <= 3) {
            charge = yourDistrict === receiverDistrict ? 110 : 150;
        }
        else if (productType === "Not-Document" && weight > 3) {
            charge = yourDistrict === receiverDistrict ? weight * 40
                : (weight * 40) + 40;
        }
        else {
            console.log("Something Wrong..!")
            return;
        }

        setDeliveryCharge(charge);
        // console.log("৳", charge);




        const parcelInfo = {
            ...values,
            trackingId: trackId,
            deliveryCharge: charge,
            createdBy: user?.email,
            creationDate: new Date().toISOString(),
            paymentStatus: "unpaid",
            deliveryStatus: "pending"
        };


        console.log(parcelInfo)

        // fetch("http://localhost:3000/parcels", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(parcelInfo)
        // });


        try {
            const res = await axiosSecure.post('/parcels', parcelInfo);
            console.log(res.data);

            // open modal ONLY after success
            document.getElementById('my_modal_1').showModal();
        } catch (error) {
            alert("Parcel creation failed!", error);
        }





    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='pt-20 px-28 bg-white rounded-4xl mb-16'>
                <div className='mb-12'>
                    <h1 className='text-6xl font-extrabold mb-12'>Send A Parcel</h1>
                    <p className='font-extrabold text-2xl'>Enter your parcel details</p>
                </div>
                <hr className='border-t border-gray-200 mb-7' />

                <div className='flex mb-7'>
                    <div className='mr-12'>
                        <input type="radio" {...register("productType")} value="Document" className="radio radio-accent mr-3" defaultChecked />
                        <label className='font-semibold'>Document</label>
                    </div>
                    <div>
                        <input type="radio" {...register("productType")} value="Not-Document" className="radio radio-accent mr-3" />
                        <label className='font-semibold'>Not-Document</label>
                    </div>
                </div>
                <div className='flex gap-7'>
                    <div className='w-1/2'>
                        <label className="font-medium text-sm">Parcel Name</label>
                        <input type="text" {...register("parcelName", {
                            required: "Parcel Name is required"
                        })} className="input rounded-md w-full" placeholder="Parcel Name" />
                        {errors.parcelName && <p className='text-red-400'>{errors.parcelName.message}</p>}
                    </div>
                    <div className='w-1/2'>
                        <label className="font-medium text-sm">Parcel Weight (KG)</label>
                        <input type="number" step="any" disabled={productType === "Document"} {...register("weight", {
                            required: productType !== "Document" ? "Parcel Weight is required" : false,
                            valueAsNumber: true,
                        })} className="input rounded-md w-full disabled:bg-gray-200 disabled:cursor-not-allowed" placeholder="Parcel Weight (KG)" />
                        {errors.weight && <p className='text-red-400'>{errors.weight.message}</p>}
                    </div>
                </div>
                <hr className='border-t border-gray-200 my-7' />

                <div className='flex gap-12'>
                    <div className='w-1/2'>
                        <h5 className='font-extrabold text-lg mb-7'>Sender Details</h5>
                        <div>
                            <label className="font-medium text-sm">Sender Name</label>
                            <input type="text" {...register("senderName", {
                                required: "Sender Name is required",
                            })} className="input rounded-md w-full" placeholder="Sender Name" />
                            {errors.senderName && <p className='text-red-400'>{errors.senderName.message}</p>}
                        </div>

                        <div className='mt-5'>
                            <label className="font-medium text-sm">Sender Phone No</label>
                            <input type="number" {...register("senderContactNo", {
                                required: "Sender Contact No is required"
                            })} className="input rounded-md w-full" placeholder="Sender Phone No" />
                            {errors.senderContactNo && <p className='text-red-400'>{errors.senderContactNo.message}</p>}
                        </div>

                        <div className='mt-5'>
                            <label className="font-medium text-sm">Your Division</label>
                            <select defaultValue="Select your Division" {...register("yourDivision")}
                                className="select rounded-md w-full"
                                onChange={r => setSenderSelectedDivision(r.target.value)}>
                                <option disabled={true}>Select your Division</option>
                                {
                                    division.map((d, inx) => <option value={d} key={inx}>{d}</option>)
                                }
                            </select>
                        </div>

                        <div className='mt-5'>
                            <label className="font-medium text-sm">Your District</label>
                            <select defaultValue="Select your District" {...register("yourDistrict")} className="select rounded-md w-full"
                                onChange={d => setSenderSelectedDistrict(d.target.value)}>
                                <option disabled={true}>Select your District</option>
                                {
                                    senderDistricts.map((d, inx) => <option value={d.district} key={inx}>{d.district}</option>)
                                }
                            </select>
                        </div>

                        <div className='mt-5'>
                            <label className="font-medium text-sm">Address</label>
                            <select defaultValue="Select your Address" {...register("yourAddress")} className="select rounded-md w-full">
                                <option disabled={true}>Select your Address</option>
                                {
                                    senderAddress[0]?.covered_area.map((a, idx) => <option value={a} key={idx}>{a}</option>)
                                }
                            </select>
                        </div>

                        <div className='mt-10'>
                            <label className="font-medium text-sm">Pickup Instruction</label>
                            <fieldset className="fieldset rounded-md w-full">
                                <textarea {...register("pickupInstruction", {
                                    required: "Pickup Instruction is required"
                                })} className="textarea w-full h-24" placeholder="Pickup Instruction"></textarea>
                            </fieldset>
                            {errors.pickupInstruction && <p className='text-red-400'>{errors.pickupInstruction.message}</p>}
                        </div>

                    </div>
                    <div className='w-1/2'>
                        <h5 className='font-extrabold text-lg mb-7'>Receiver Details</h5>

                        <div>
                            <label className="font-medium text-sm">Receiver Name</label>
                            <input type="text" {...register("receiverName", {
                                required: "Receiver Name is required"
                            })} className="input rounded-md w-full" placeholder="Receiver Name" />
                            {errors.receiverName && <p className='text-red-400'>{errors.receiverName.message}</p>}
                        </div>

                        <div className='mt-5'>
                            <label className="font-medium text-sm">Receiver Contact No</label>
                            <input type="number" {...register("receiverContactNo", {
                                required: "Receiver Contact No is required"
                            })} className="input rounded-md w-full" placeholder="Receiver Contact No" />
                            {errors.receiverContactNo && <p className='text-red-400'>{errors.receiverContactNo.message}</p>}
                        </div>
                        <div className='mt-5'>
                            <label className="font-medium text-sm">Receiver Division</label>
                            <select defaultValue="Select Receiver Division" {...register("receiverDivision")}
                                className="select rounded-md w-full"
                                onChange={r => setReceiverSelectedDivision(r.target.value)}>
                                <option disabled={true}>Select Receiver Division</option>
                                {
                                    division.map((d, inx) => <option value={d} key={inx}>{d}</option>)
                                }
                            </select>
                        </div>
                        <div className='mt-5'>
                            <label className="font-medium text-sm">Receiver District</label>
                            <select defaultValue="Select your District" {...register("receiverDistrict")} className="select rounded-md w-full"
                                onChange={d => setReceiverSelectedDistrict(d.target.value)}>
                                <option disabled={true}>Select your District</option>
                                {
                                    receiverDistricts.map((d, inx) => <option value={d.district} key={inx}>{d.district}</option>)
                                }
                            </select>
                        </div>

                        <div className='mt-5'>
                            <label className="font-medium text-sm">Receiver Address</label>
                            <select defaultValue="Select Receiver Address" {...register("receiverAddress")} className="select rounded-md w-full">
                                <option disabled={true}>Select Receiver Address</option>
                                {
                                    receiverAddresses[0]?.covered_area.map((a, inx) => <option value={a} key={inx}>{a}</option>)
                                }
                            </select>
                        </div>

                        <div className='mt-10'>
                            <label className="font-medium text-sm">Delivery Instruction</label>
                            <fieldset className="fieldset rounded-md w-full">
                                <textarea {...register("deliveryInstruction", {
                                    required: "Delivery Instruction is required"
                                })} className="textarea w-full h-24" placeholder="Delivery Instruction"></textarea>
                            </fieldset>
                            {errors.deliveryInstruction && <p className='text-red-400'>{errors.deliveryInstruction.message}</p>}
                        </div>
                    </div>
                </div>

                <p className='my-12 text-lg font-semibold'>* PickUp Time 4pm-7pm Approx.</p>
                <button className='btn bg-[#CAEB66] px-16 mb-56'>Proceed to Confirm Booking</button>

            </form>




            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Delivery Charge: {"৳" + deliveryCharge}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => navigate('/dashboard/myParcels')} > OK </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default SendParcel;