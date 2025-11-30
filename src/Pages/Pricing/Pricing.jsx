import React from 'react';

const Pricing = () => {
    return (
        <div className='mb-32 bg-white rounded-4xl px-24 pb-36 pt-20'>
            <div className='mb-12'>
                <h1 className='font-extrabold text-5xl mb-4'>Pricing Calculator</h1>
                <p className='text-gray-400'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>
            </div>
            <hr className='border-t border-gray-200 mb-12' />
            <h3 className='text-3xl font-extrabold text-center mb-12'>Calculate Your Cost</h3>
            <div className='flex justify-around items-center'>
                <div className='w-1/2'>
                    <label className="font-medium text-sm">Parcel type</label>
                    <select defaultValue="Select Parcel type" className="select rounded-md w-full">
                        <option disabled={true}>Select Parcel type</option>
                        <option>Crimson</option>
                        <option>Crimson</option>
                        {/* {
                            district.map((d, inx) => <option key={inx}>{d}</option>)
                        } */}
                    </select>
                    <label className="font-medium text-sm">Delivery Destination</label>
                    <select defaultValue="Select Delivery Destination" className="select rounded-md w-full">
                        <option disabled={true}>Select Delivery Destination</option>
                        <option>Crimson</option>
                        <option>Crimson</option>
                        {/* {
                            district.map((d, inx) => <option key={inx}>{d}</option>)
                        } */}
                    </select>
                    <label className="font-medium text-sm">Weight (KG)</label>
                    <input type="email" className="input rounded-md w-full" placeholder="Contact" />
                    <div className='flex justify-between '>
                        <button className="btn mt-4 text-black rounded-md border-[#CAEB66] w-3/12 ">Reset</button>
                        <button className="btn mt-4 text-black rounded-md bg-[#CAEB66] w-8/12">Calculate</button>
                    </div>
                </div>
                <div>
                    <h1 className='text-8xl font-extrabold'>50 Tk</h1>
                </div>
            </div>
        </div>
    );
};

export default Pricing; 