import React from 'react';

const Faq = () => {
    return (
        <div className='mx-40 mb-[100px]'>
            <div className='text-center mb-10'>
                <h2 className='text-4xl font-extrabold mb-6'>Frequently Asked Question (FAQ)</h2>
                <p className='text-gray-400'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>
            </div>


            <div className='space-y-4 mb-10'>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title font-bold">How does this posture corrector work?</div>
                    <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-bold">Is it suitable for all ages and body types?</div>
                    <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-bold">Does it really help with back pain and posture improvement?</div>
                    <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-bold">Does it have smart features like vibration alerts?</div>
                    <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-bold">How will I be notified when the product is back in stock?</div>
                    <div className="collapse-content text-sm">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
                </div>
            </div>

            <div className='flex justify-center'>
                <button className='btn font-bold text-xl rounded-lg bg-[#CAEB66]'>See More FAQ’s</button>
            </div>

        </div>
    );
};

export default Faq;