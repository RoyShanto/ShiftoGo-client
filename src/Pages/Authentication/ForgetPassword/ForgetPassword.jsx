import React from 'react';
import { Link } from 'react-router';

const ForgetPassword = () => {
    return (
        <div className="my-36">
            <fieldset className="fieldset w-full">
                <h1 className='font-extrabold text-[42px] w-full'>Forgot Password</h1>
                <p className='mb-5'>Enter your email address and we’ll send you a reset link.</p>
                <label className="font-medium text-sm">Email</label>
                <input type="email" className="input w-full" placeholder="Email" />
                <button className="btn text-black mt-4 mb-3 bg-[#CAEB66]">Send</button>
                <p className='text-gray-400'>Remember your password? <Link to={'/login'} className='text-[#CAEB66]'>Login</Link></p>
            </fieldset>
        </div>
    );
};

export default ForgetPassword;