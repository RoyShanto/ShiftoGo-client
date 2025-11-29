import React, { useEffect, useState } from 'react';
import { FaShippingFast, FaGlobe, FaBoxes, FaMoneyBillWave, FaBuilding, FaUndo, } from "react-icons/fa";

const ICON_MAP = {
    FaShippingFast: FaShippingFast,
    FaGlobe: FaGlobe,
    FaBoxes: FaBoxes,
    FaMoneyBillWave: FaMoneyBillWave,
    FaBuilding: FaBuilding,
    FaUndo: FaUndo,
};

const HowItWorks = () => {
    const [process, setProcess] = useState([])
    useEffect(() => {
        fetch('/data/howItWorks.json')
            .then(res => res.json())
            .then(data => setProcess(data))
    }, [])

    return (
        <div className='mt-[100px]'>
            <h2 className='font-extrabold text-4xl'>How it Works</h2>
            <section className="w-full">
                <div className="container mx-auto">
                    <div className="flex gap-4 pt-8 px-2">
                        {
                            process.map((s, idx) => {
                                const IconComponent = ICON_MAP[s.icon];
                                return (
                                    <article key={idx} className="bg-white border border-gray-200 rounded-xl p-4 w-64" >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 border border-gray-100 mt-8 mb-7">
                                            {IconComponent && <IconComponent size={28} className="text-primary" />}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-extrabold leading-5">{s.title}</h3>
                                            <p className="mt-4 text-xs text-gray-600 leading-5">{s.description}</p>
                                        </div>
                                    </article>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;