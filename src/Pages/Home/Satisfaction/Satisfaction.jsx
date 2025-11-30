import React, { useEffect, useState } from 'react';
import logo0 from "../../../assets/illustration/live-tracking.png"
import logo1 from "../../../assets/illustration/safe-delivery.jpg"
import logo2 from "../../../assets/illustration/call-support.png"

const Satisfaction = () => {
    const logo = [logo0, logo1, logo2]
    const [satisfaction, setSatisfaction] = useState([]);
    useEffect(() => {
        fetch('./data/satisfaction.json')
            .then(res => res.json())
            .then(data => setSatisfaction(data))
    }, [])
    return (
        <div className='py-20'>
            <div>
                {
                    satisfaction.map((s, idx) =>
                        <div key={idx} className='flex items-center bg-white p-8 my-6 rounded-xl'>
                            <div className="w-full max-w-64">
                                <img src={logo[idx]} alt="icon" className="w-full h-full" />
                            </div>
                            <div className="mx-12 border-l border-dashed border-gray-300 h-16"></div>
                            <div>
                                <h2 className='text-2xl font-extrabold mb-4'>{s.title}</h2>
                                <p className='text-base font-medium text-gray-500'>{s.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Satisfaction;