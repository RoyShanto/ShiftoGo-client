import React from 'react';
import { BiMessageError } from 'react-icons/bi';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex items-center flex-col bg-white pt-20 mb-80 rounded-4xl'>
            <BiMessageError className='text-9xl text-red-400' />
            <p className='font-extrabold text-7xl'>Error 404</p>
            <Link to={'/'} className='btn bg-[#CAEB66] rounded-lg mt-24 mb-20'>Go Home</Link>
        </div>
    );
};

export default Error;