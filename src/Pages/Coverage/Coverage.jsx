import React from 'react';
import map from '../../assets/map.png'

const Coverage = () => {
    return (
        <div className='py-20 px-28 bg-white rounded-4xl mb-48'>
            <div className='mb-12'>
                <h1 className='text-6xl font-extrabold mb-12'>We are available in 64 districts</h1>
                <div className="w-full">
                    <label className="w-1/2 input input-bordered flex items-center gap-3 rounded-full bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 20 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                        <input type="text" className="grow bg-transparent focus:outline-none" placeholder="Search here" />
                        <button className="btn rounded-full bg-[#CAEB66] border-none text-black px-6 -mx-3 hover:bg-lime-400"> Search </button>
                    </label>
                </div>
            </div>
            <hr className='border-t border-gray-300 mb-12' />
            <h2 className='font-extrabold text-3xl mb-12'>We deliver almost all over Bangladesh</h2>
            <img src={map} alt="" className='h-[426px] w-[1282px] border border-gray-300' />
        </div>
    );
};

export default Coverage;