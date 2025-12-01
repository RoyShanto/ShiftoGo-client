import React, { useEffect, useState } from 'react';

const SendParcel = () => {
    const [district, setDistrict] = useState([])
    useEffect(() => {
        fetch('./data/district.json')
            .then(res => res.json())
            .then(data => setDistrict(data))
    }, [])
    return (
        <div className='pt-20 px-28 bg-white rounded-4xl mb-16'>
            <div className='mb-12'>
                <h1 className='text-6xl font-extrabold mb-12'>Send A Parcel</h1>
                <p className='font-extrabold text-2xl'>Enter your parcel details</p>
            </div>
            <hr className='border-t border-gray-200 mb-7' />

            <div className='flex mb-7'>
                <div className='mr-12'>
                    <input type="radio" name="radio-6" className="radio radio-accent mr-3" defaultChecked />
                    <label className='font-semibold'>Document</label>
                </div>
                <div>
                    <input type="radio" name="radio-6" className="radio radio-accent mr-3" />
                    <label className='font-semibold'>Not-Document</label>
                </div>
            </div>
            <div className='flex gap-7'>
                <div className='w-1/2'>
                    <label className="font-medium text-sm">Parcel Name</label>
                    <input type="email" className="input rounded-md w-full" placeholder="Parcel Name" />
                </div>
                <div className='w-1/2'>
                    <label className="font-medium text-sm">Parcel Weight (KG)</label>
                    <input type="email" className="input rounded-md w-full" placeholder="Parcel Weight (KG)" />
                </div>
            </div>
            <hr className='border-t border-gray-200 my-7' />

            <div className='flex gap-12'>
                <div className='w-1/2'>
                    <h5 className='font-extrabold text-lg mb-7'>Sender Details</h5>
                    <label className="font-medium text-sm">Sender Name</label>
                    <input type="email" className="input rounded-md w-full mb-5" placeholder="Sender Name" />
                    <label className="font-medium text-sm">Address</label>
                    <input type="email" className="input rounded-md w-full mb-5" placeholder="Address" />
                    <label className="font-medium text-sm">Sender Phone No</label>
                    <input type="email" className="input rounded-md w-full mb-5" placeholder="Sender Phone No" />
                    <label className="font-medium text-sm">Your District</label>
                    <select defaultValue="Select your District" className="select rounded-md w-full mb-5">
                        <option disabled={true}>Select your District</option>
                        {
                            district.map((d, inx) => <option key={inx}>{d}</option>)
                        }
                    </select>
                    <label className="font-medium text-sm">Pickup Instruction</label>
                    <fieldset className="fieldset rounded-md w-full mb-5">
                        <textarea className="textarea w-full h-24" placeholder="Pickup Instruction"></textarea>
                    </fieldset>
                </div>
                <div className='w-1/2'>
                    <h5 className='font-extrabold text-lg mb-7'>Receiver Details</h5>

                    <label className="font-medium text-sm">Receiver Name</label>
                    <input type="email" className="input rounded-md w-full mb-5" placeholder="Receiver Name" />
                    <label className="font-medium text-sm">Receiver Address</label>
                    <input type="email" className="input rounded-md w-full mb-5" placeholder="Address" />
                    <label className="font-medium text-sm">Receiver Contact No</label>
                    <input type="email" className="input rounded-md w-full mb-5" placeholder="Receiver Contact No" />
                    <label className="font-medium text-sm">Receiver District</label>
                    <select defaultValue="Select your District" className="select rounded-md w-full mb-5">
                        <option disabled={true}>Select your District</option>
                        {
                            district.map((d, inx) => <option key={inx}>{d}</option>)
                        }
                    </select>
                    <label className="font-medium text-sm">Delivery Instruction</label>
                    <fieldset className="fieldset rounded-md w-full mb-5">
                        <textarea className="textarea w-full h-24" placeholder="Delivery Instruction"></textarea>
                    </fieldset>
                </div>
            </div>

            <p className='my-12 text-lg font-semibold'>* PickUp Time 4pm-7pm Approx.</p>
            <button className='btn bg-[#CAEB66] px-16 mb-56'>Proceed to Confirm Booking</button>

        </div>
    );
};

export default SendParcel;