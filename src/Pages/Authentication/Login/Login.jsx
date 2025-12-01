import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';
const Login = () => {
    return (
        <div className="my-36">
            <fieldset className="fieldset w-full">
                <h1 className='font-extrabold text-[42px] w-full'>Welcome Back</h1>
                <p className='mb-5'>Login with Shiftogo</p>
                <label className="font-medium text-sm">Email</label>
                <input type="email" className="input w-full" placeholder="Email" />
                <label className="font-medium text-sm">Password</label>
                <input type="password" className="input w-full" placeholder="Password" />
                <Link to={'/forgetPassword'} className="link link-hover">Forgot password?</Link>
                <button className="btn text-black mt-4 mb-3 bg-[#CAEB66]">Login</button>
                <p>Don’t have any account? <Link to={'/registration'} className='text-[#CAEB66]'>Register</Link></p>
                <div className="divider mb-3">OR</div>
                <button className="btn text-black bg-base-200"><FaGoogle />Login with google</button>
            </fieldset>
        </div>
    );
};

export default Login;