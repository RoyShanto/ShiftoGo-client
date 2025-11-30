import React, { useEffect, useState } from 'react';
import agentPending from "../../assets/agent-pending.png"

const BeARider = () => {
    const [district, setDistrict] = useState([]);
    useEffect(() => {
        fetch('./data/district.json')
            .then(res => res.json())
            .then(data => setDistrict(data))
    }, [])
    return (
        <div className='mb-32 bg-white rounded-4xl px-24 pb-36'>
            <div className='mb-4 pt-20'>
                <h1 className='font-extrabold text-6xl mb-4'>Be a Rider</h1>
                <p className='text-gray-400 mb-12'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>
                <hr className="border-t  border-gray-300" />
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <h2 className='text-3xl font-extrabold'>Tell us about yourself</h2>
                        <div className="">
                            <fieldset className="fieldset">
                                <label className="font-medium text-sm">Your Name</label>
                                <input type="email" className="input rounded-md w-full" placeholder="Your Name" />
                                <label className="font-medium text-sm">Driving License Number</label>
                                <input type="email" className="input rounded-md w-full" placeholder="Driving License Number" />
                                <label className="font-medium text-sm">Your Email</label>
                                <input type="email" className="input rounded-md w-full" placeholder="Your Email" />
                                <label className="font-medium text-sm">Your Region</label>
                                <input type="email" className="input rounded-md w-full" placeholder="Select your Region" />
                                <label className="font-medium text-sm">Your District</label>
                                <select defaultValue="Select your District" className="select rounded-md w-full">
                                    <option disabled={true}>Select your District</option>
                                    {/* <option>Crimson</option> */}
                                    {
                                        district.map((d, inx) => <option key={inx}>{d}</option>)
                                    }
                                </select>
                                <label className="font-medium text-sm">NID No</label>
                                <input type="email" className="input rounded-md w-full" placeholder="NID" />
                                <label className="font-medium text-sm">Phone Number</label>
                                <input type="email" className="input rounded-md w-full" placeholder="Phone Number" />
                                <label className="font-medium text-sm">Bike Brand Model and Year</label>
                                <input type="email" className="input rounded-md w-full" placeholder="Bike Brand Model and Year" />
                                <label className="font-medium text-sm">Bike Registration Number</label>
                                <input type="email" className="input rounded-md w-full" placeholder="Bike Registration Number" />
                                <label className="font-medium text-sm">Tell Us About Yourself</label>
                                <input type="email" className="input rounded-md w-full" placeholder="Tell Us About Yourself" />
                                <button className="btn mt-4 text-black bg-[#CAEB66]">Submit</button>
                            </fieldset>
                        </div>
                    </div>
                    <div><img className='w-[462px] h-[439]' src={agentPending} alt="" /></div>
                </div>
            </div>
        </div>
    );
};

export default BeARider;