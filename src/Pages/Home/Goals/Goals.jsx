import React from 'react';
import locationMerchant from "../../../assets/location-merchant.png"


const Goals = () => {
    return (
        <div data-aos="zoom-in-up" className='bg-cyan-950 bg-[url("assets/be-a-merchant-bg.png")] bg-no-repeat text-white flex p-20 rounded-xl'>
            <div>
                <h2 className='text-4xl font-extrabold mb-4'>Merchant and Customer Satisfaction is Our First Priority</h2>
                <p className='text-base text-gray-400 mb-8'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                <div>
                    <button className='btn bg-[#CAEB66] rounded-full text-xl mr-4'>Become a Merchant</button>
                    <button className="btn btn-outline btn-primary border-[#CAEB66] text-[#CAEB66] rounded-full text-xl">Earn with ZapShift Courier</button>
                </div>
            </div>
            <div className='w-3/4'>
                <img className='w-full h-full' src={locationMerchant} alt="location-Merchant" />
            </div>
        </div>
    );
};

export default Goals;