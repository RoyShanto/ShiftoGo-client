import React from 'react';
import customerTop from "../../../assets/customer-top.png"

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CustomerReview = () => {
    const testimonials = [
        {
            quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
            name: "Anwlod Hassin",
            role: "Senior Product Designer"
        },
        {
            quote: "Using a posture corrector helped me stay focused and reduced my back pain during long work hours.",
            name: "Sara Ahmed",
            role: "UX Researcher"
        },
        {
            quote: "It’s a simple tool that makes a big difference in how I carry myself every day.",
            name: "John Doe",
            role: "Health Coach"
        }
    ];


    return (
        <div className='mt-[100px]'>
            <div className='flex justify-center mb-10'>
                <img src={customerTop} alt="" />
            </div>
            <div className='text-center'>
                <h2 className='text-5xl font-extrabold mb-6'>What our customers are sayings</h2>
                <p className='text-gray-400'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
            </div>
        

        <div className="max-w-2xl mx-auto p-6">
            <Carousel
                showArrows={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                autoPlay={false}
                interval={5000}
                className="rounded-lg"
            >
                {testimonials.map((item, index) => (
                    <div key={index} className="p-6">
                        <div className="card bg-base-100 shadow-xl text-center">
                            <div className="card-body">
                                <p className="text-lg italic mb-4">"{item.quote}"</p>
                                <h2 className="font-bold text-xl">{item.name}</h2>
                                <p className="text-sm text-gray-500">{item.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
</div>
    );
};

export default CustomerReview;