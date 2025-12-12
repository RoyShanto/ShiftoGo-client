import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {
    const [district, setDistrict] = useState([])
    useEffect(() => {
        fetch('./data/district.json')
            .then(res => res.json())
            .then(data => setDistrict(data))
    }, [])

    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = values => console.log(values);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='pt-20 px-28 bg-white rounded-4xl mb-16'>
            <div className='mb-12'>
                <h1 className='text-6xl font-extrabold mb-12'>Send A Parcel</h1>
                <p className='font-extrabold text-2xl'>Enter your parcel details</p>
            </div>
            <hr className='border-t border-gray-200 mb-7' />

            <div className='flex mb-7'>
                <div className='mr-12'>
                    <input type="radio" {...register("radio")} value="Document" className="radio radio-accent mr-3" defaultChecked />
                    <label className='font-semibold'>Document</label>
                </div>
                <div>
                    <input type="radio" {...register("radio")} value="Not-Document" className="radio radio-accent mr-3" />
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
                    <input type="number" step="any" {...register("Weight", {
                        required: "Parcel Weight is required",
                        valueAsNumber: true,
                    })} className="input rounded-md w-full" placeholder="Parcel Weight (KG)" />
                    {errors.Weight && <p className='text-red-400'>{errors.Weight.message}</p>}
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
                        <label className="font-medium text-sm">Address</label>
                        <input type="text" {...register("senderAddress", {
                            required: "Sender Address is required"
                        })} className="input rounded-md w-full" placeholder="Address" />
                        {errors.senderAddress && <p className='text-red-400'>{errors.senderAddress.message}</p>}
                    </div>

                    <div className='mt-5'>
                        <label className="font-medium text-sm">Sender Phone No</label>
                        <input type="number" {...register("senderContactNo", {
                            required: "Sender Contact No is required"
                        })} className="input rounded-md w-full" placeholder="Sender Phone No" />
                        {errors.senderContactNo && <p className='text-red-400'>{errors.senderContactNo.message}</p>}
                    </div>

                    <div className='mt-5'>
                        <label className="font-medium text-sm">Your District</label>
                        <select defaultValue="Select your District" {...register("senderDistrict")} className="select rounded-md w-full mb-5">
                            <option disabled={true}>Select your District</option>
                            {
                                district.map((d, inx) => <option value={d} key={inx}>{d}</option>)
                            }
                        </select>
                    </div>

                    <div className='mt-5'>
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
                        <label className="font-medium text-sm">Receiver Address</label>
                        <input type="text" {...register("receiverAddress", {
                            required: "Receiver Address is required"
                        })} className="input rounded-md w-full" placeholder="Address" />
                        {errors.receiverAddress && <p className='text-red-400'>{errors.receiverAddress.message}</p>}
                    </div>

                    <div className='mt-5'>
                        <label className="font-medium text-sm">Receiver Contact No</label>
                        <input type="number" {...register("receiverContactNo", {
                            required: "Receiver Contact No is required"
                        })} className="input rounded-md w-full" placeholder="Receiver Contact No" />
                        {errors.receiverContactNo && <p className='text-red-400'>{errors.receiverContactNo.message}</p>}
                    </div>
                    <div className='mt-5'>
                        <label className="font-medium text-sm">Receiver District</label>
                        <select defaultValue="Select your District" {...register("receiverDistrict")} className="select rounded-md w-full mb-5">
                            <option disabled={true}>Select your District</option>
                            {
                                district.map((d, inx) => <option value={d} key={inx}>{d}</option>)
                            }
                        </select>
                    </div>
                    <div className='mt-5'>
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
    );
};

export default SendParcel;