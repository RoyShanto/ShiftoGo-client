import React from 'react';

const ResetPassword = () => {
    return (
        <div className="my-36">
            <fieldset className="fieldset w-full">
                <h1 className='font-extrabold text-[42px] w-full'>Reset Password</h1>
                <p className='mb-5'>Reset your password</p>
                <label className="font-medium text-sm">New Password</label>
                <input type="text" className="input w-full" placeholder="New Password" />
                <label className="font-medium text-sm">Confirm Password</label>
                <input type="text" className="input w-full" placeholder="Confirm Password" />
                <button className="btn text-black mt-4 mb-3 bg-[#CAEB66]">Reset Password</button>
                
            </fieldset>
        </div>
    );
};

export default ResetPassword;