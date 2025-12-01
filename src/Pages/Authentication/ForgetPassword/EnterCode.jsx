import React from 'react';

const EnterCode = () => {
    return (
        <div className="my-36">
            <fieldset className="fieldset w-full">
                <h1 className='font-extrabold text-[42px] w-full'>Enter Code</h1>
                <p className='mb-5'>Enter 6 digit code that we sent in your email address</p>
                <div className='flex gap-5'>
                    <input type="text" className="border border-gray-300 w-8 h-10 rounded-md text-2xl text-center" />
                    <input type="text" className="border border-gray-300 w-8 h-10 rounded-md text-2xl text-center" />
                    <input type="text" className="border border-gray-300 w-8 h-10 rounded-md text-2xl text-center" />
                    <input type="text" className="border border-gray-300 w-8 h-10 rounded-md text-2xl text-center" />
                    <input type="text" className="border border-gray-300 w-8 h-10 rounded-md text-2xl text-center" />
                    <input type="text" className="border border-gray-300 w-8 h-10 rounded-md text-2xl text-center" />

                </div>

                <button className="btn text-black mt-4 mb-3 bg-[#CAEB66]">Verify Code</button>
            </fieldset>
        </div>
    );
};

export default EnterCode;