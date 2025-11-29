import { useEffect, useState } from "react";


const OurServices = () => {
    const [services, setServices] = useState([])
    useEffect(()=>{
        fetch('./data/services.json')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])
    return (
        <div className='bg-cyan-950 text-white mt-[100px] p-[100px] text-center rounded-lg'>
            <h2 className='text-4xl font-bold'>Our Services</h2>
            <p className='mt-4 text-gray-100 font-medium'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
            <div className="grid grid-cols-3 gap-3 mt-8">
                {
                    services.map(s => 
                    <div className="bg-white text-black rounded-lg p-8 space-y-4 hover:bg-gray-100">
                        <p className="bg-linear-to-t from-white-500 to-base-300 border border-gray-100 rounded-full inline p-6 mt-6">img</p>
                        <h2 className="text-2xl font-bold mt-8">{s.title}</h2>
                        <p className="text-base font-medium">{s.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OurServices;