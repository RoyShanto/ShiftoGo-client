import React from 'react';

const AboutUs = () => {
    return (
        <div className='py-20 px-28 bg-white rounded-4xl mb-48'>
            <div className='mb-12'>
                <h1 className='text-6xl font-extrabold mb-4'>About Us</h1>
                <p className='text-gray-400'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>
            </div>
            <hr className='border-t border-gray-300' />
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-border space-x-12">
                <input type="radio" name="my_tabs_2" className="tab text-[28px]" aria-label="Story" defaultChecked />
                <div className="tab-content bg-base-100 mt-12 text-gray-400 text-xl">
                    <p> We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p> <br />
                    <p> We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p> <br />
                    <p> We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.</p>
                </div>

                <input type="radio" name="my_tabs_2" className="tab text-[28px]" aria-label="Mission" />
                <div className="tab-content bg-base-100 mt-12 text-gray-400 text-xl">Tab content 2</div>

                <input type="radio" name="my_tabs_2" className="tab text-[28px]" aria-label="Success" />
                <div className="tab-content bg-base-100 mt-12 text-gray-400 text-xl">Tab content 3</div>

                <input type="radio" name="my_tabs_2" className="tab text-[28px]" aria-label="Team & Others" />
                <div className="tab-content bg-base-100 mt-12 text-gray-400 text-xl">Tab content 4</div>
            </div>
        </div>
    );
};

export default AboutUs;