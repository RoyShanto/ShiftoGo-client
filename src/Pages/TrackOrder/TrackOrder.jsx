import React from 'react';

const TrackOrder = () => {
    return (
        <div className='py-20 px-28 bg-white rounded-4xl mb-48'>
            <div className='mb-12'>
                <h1 className='text-6xl font-extrabold mb-4'>Track Your Consignment</h1>
                <p className='text-gray-400 mb-12'>Now you can easily track your consignment</p>
                <div className="w-full">
                    <label className="w-1/2 input input-bordered flex items-center gap-3 rounded-full bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 20 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                        <input type="text" className="grow bg-transparent focus:outline-none" placeholder="Search tracking code here" />
                        <button className="btn rounded-full bg-[#CAEB66] border-none text-black px-6 -mx-3 hover:bg-lime-400"> Search </button>
                    </label>
                </div>
            </div>
            <hr className='border-t border-gray-300 mb-12' />
            <div className='flex gap-6'>
                <div className='bg-gray-100 p-12 rounded-4xl w-1/2'>
                    <h2 className='font-extrabold text-4xl mb-4'>Product details</h2>
                    <div className='text-lg mb-11'>
                        <p>May 31, 2025 03:41 pm</p>
                        <p>Id : <span className='text-gray-500'>148976175</span></p>
                        <p>Invoice : <span className='text-gray-500'>24227</span></p>
                        <p>Tracking Code : <span className='text-gray-500'>01JWJVEXWZ9823Q7H5H55YV7</span></p>
                    </div>
                    <div className='text-lg mb-11'>
                        <p>Name : <span className='text-gray-500'>Zahid Hossain</span></p>
                        <p>Address : <span className='text-gray-500'>Madrasha Road, Chandpur sadar, Chandpur, Chandpur, 3600, BD</span></p>
                        <p>Phone Number : <span className='text-gray-500'>01780448866</span></p>
                    </div>
                    <div className='text-lg'>
                        <p>Approved : <span className='text-gray-500'>N/A</span></p>
                        <p>Weight : <span className='text-gray-500'>KG</span></p>
                        <p>COD : <span className='text-gray-500'>৳ 0</span></p>
                        <p className='text-[#C89A01]'>Pending</p>
                    </div>
                </div>

                <div className='bg-gray-100 p-12 rounded-4xl w-1/2'>
                    <h2 className='font-extrabold text-4xl mb-12'>Tracking Updates</h2>
                    <ul className="timeline timeline-vertical">
                        <li className='mb-16'>
                            <div className="timeline-start">Jun 02, 2025 12:21 am</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 mx-5 bg-green-200 text-green-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end">Assigned to rider.</div>
                            <hr />
                        </li>
                        <li className='mb-16'>
                            <div className="timeline-start">Jun 02, 2025 12:21 am</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 mx-5 bg-green-200 text-green-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end">Assigned to rider.</div>
                            <hr />
                        </li>
                        <li className='mb-16'>
                            <div className="timeline-start">Jun 02, 2025 12:21 am</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 mx-5 bg-green-200 text-green-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end">Assigned to rider.</div>
                            <hr />
                        </li>
                        <li className='mb-16'>
                            <div className="timeline-start">Jun 02, 2025 12:21 am</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 mx-5 bg-green-200 text-green-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end">Assigned to rider.</div>
                            <hr />
                        </li>
                        <li className='mb-16'>
                            <div className="timeline-start">Jun 02, 2025 12:21 am</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 mx-5 bg-green-200 text-green-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end">Assigned to rider.</div>
                            <hr />
                        </li>
                        <li className='mb-16'>
                            <div className="timeline-start">Jun 02, 2025 12:21 am</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 mx-5 bg-green-200 text-green-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end">Assigned to rider.</div>
                            <hr />
                        </li>
                        <li className='mb-16'>
                            <div className="timeline-start">Jun 02, 2025 12:21 am</div>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 mx-5 bg-green-200 text-green-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="timeline-end">Assigned to rider.</div>
                            <hr />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;