import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { TbUserUp } from 'react-icons/tb';
import { Link } from 'react-router';

const Registration = () => {
    return (
        <div className="my-36">
            <fieldset className="fieldset w-full">
                <h1 className='font-extrabold text-[42px] w-full'>Create an Account</h1>
                <p className='mb-5'>Register with Shiftogo</p>


                <label className="border border-gray-200 w-14 p-1 rounded-full cursor-pointer">
                    <div className="bg-gray-200 p-3 w-11 rounded-full text-xl text-gray-500 flex items-center justify-center">
                        <TbUserUp />
                    </div>
                    <input type="file" className="hidden" />
                </label>
                <label className="font-medium text-sm">Name</label>
                <input type="text" className="input w-full" placeholder="Name" />
                <label className="font-medium text-sm">Email</label>
                <input type="email" className="input w-full" placeholder="Email" />
                <label className="font-medium text-sm">Password</label>
                <input type="password" className="input w-full" placeholder="Password" />
                <button className="btn text-black mt-4 mb-3 bg-[#CAEB66]">Register</button>
                <p>Already have an account? <Link to={'/login'} className='text-[#CAEB66]'>Login</Link></p>
                <div className="divider mb-3">OR</div>
                <button className="btn text-black bg-base-200"><FaGoogle />Login with google</button>
            </fieldset>
        </div>
    );
};

export default Registration;