import React, { useState } from 'react';

const Pricing = () => {
    const [parcelType, setParcelType] = useState('');
    const [destination, setDestination] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState(0);

    const calculatePrice = () => {
        let total = 0;

        // DOCUMENT
        if (parcelType === 'Document') {
            if (destination === 'Inside') total = 60;
            if (destination === 'Outside') total = 80;
        }

        // NON-DOCUMENT
        if (parcelType === 'Non-Document') {
            const w = Number(weight);

            if (w <= 3) {
                if (destination === 'Inside') total = 110;
                if (destination === 'Outside') total = 150;
            } else {
                const extraKg = w - 3;
                total = destination === 'Inside' ? 110 : 150;
                total += extraKg * 40;

                if (destination === 'Outside') {
                    total += 40; // extra charge
                }
            }
        }

        setPrice(total);
    };

    const resetForm = () => {
        setParcelType('');
        setDestination('');
        setWeight('');
        setPrice(0);
    };

    return (
        <div className='mb-32 bg-white rounded-4xl px-24 pb-36 pt-20'>
            <h1 className='font-extrabold text-5xl mb-12'>Pricing Calculator</h1>

            <div className='flex justify-around items-center'>
                <div className='w-1/2 space-y-3'>
                    <label className="font-medium text-sm">Parcel Type</label>
                    <select
                        className="select rounded-md w-full"
                        value={parcelType}
                        onChange={(e) => setParcelType(e.target.value)}
                    >
                        <option value="">Select Parcel type</option>
                        <option value="Document">Document</option>
                        <option value="Non-Document">Non-Document</option>
                    </select>

                    <label className="font-medium text-sm">Delivery Destination</label>
                    <select
                        className="select rounded-md w-full"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    >
                        <option value="">Select Destination</option>
                        <option value="Inside">Inside the same district</option>
                        <option value="Outside">Outside the district</option>
                    </select>

                    <label className="font-medium text-sm">Weight (KG)</label>
                    <input
                        type="number"
                        className="input rounded-md w-full"
                        placeholder="Enter weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        disabled={parcelType === 'Document'}
                    />

                    <div className='flex justify-between'>
                        <button
                            onClick={resetForm}
                            className="btn mt-4 rounded-md border w-3/12"
                        >
                            Reset
                        </button>

                        <button
                            onClick={calculatePrice}
                            className="btn mt-4 bg-[#CAEB66] w-8/12"
                        >
                            Calculate
                        </button>
                    </div>
                </div>

                <div>
                    <h1 className='text-8xl font-extrabold'>
                        {price} Tk
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
