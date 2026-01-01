import React, { useEffect, useState } from 'react';
import agentPending from "../../assets/agent-pending.png"
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const BeARider = () => {
    const { user } = useAuth()
    const axiosInstance = useAxios()
    const [location, setLocation] = useState([]);
    useEffect(() => {
        fetch('./data/coverageMap.json')
            .then(res => res.json())
            .then(data => setLocation(data))
    }, [])

    const region = [...new Set(location.map(item => item.region))];

    const [selectedRegion, setSelectedRegion] = useState("")
    const districts = location.filter(l => l.region === selectedRegion)



    const { handleSubmit, setValue, register, reset, formState: { errors } } = useForm();
    useEffect(() => {
        if (user) {
            setValue("name", user?.displayName);
            setValue("email", user?.email);
        }
    }, [user, setValue]);


    const onSubmit = async (values) => {

        const formData = {
            ...values,
            status: "deactivate",
            creationDate: new Date().toISOString()

        };
        console.log(formData);

        const result = await axiosInstance.post("/riders", formData)
        console.log(result.data.message)
        reset();
    }
    return (
        <div className='mb-32 bg-white rounded-4xl px-24 pb-36'>
            <div className='mb-4 pt-20'>
                <h1 className='font-extrabold text-6xl mb-4'>Be a Rider</h1>
                <p className='text-gray-400 mb-12'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>
                <hr className="border-t  border-gray-300" />
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <h2 className='text-3xl font-extrabold'>Tell us about yourself</h2>
                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset ">

                                {/* Name */}
                                <label className="font-medium text-sm">Your Name</label>
                                <input
                                    type="text"
                                    // defaultValue={user?.displayName}
                                    readOnly
                                    {...register("name", { required: "Name is required" })}
                                    className="input rounded-md w-full"
                                    placeholder="Your Name"
                                />
                                {errors.name && <p className="text-red-400">{errors.name.message}</p>}

                                {/* Driving License */}
                                <label className="font-medium text-sm">Driving License Number</label>
                                <input
                                    type="text"
                                    {...register("license", { required: "Driving License Number is required" })}
                                    className="input rounded-md w-full"
                                    placeholder="Driving License Number"
                                />
                                {errors.license && <p className="text-red-400">{errors.license.message}</p>}

                                {/* Email */}
                                <label className="font-medium text-sm">Your Email</label>
                                <input
                                    type="email"
                                    readOnly
                                    // defaultValue={user?.email}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email"
                                        }
                                    })}
                                    className="input rounded-md w-full"
                                    placeholder="Your Email"
                                />
                                {errors.email && <p className="text-red-400">{errors.email.message}</p>}

                                {/* Region */}
                                <label className="font-medium text-sm">Your Region</label>
                                <select
                                    {...register("region", { required: "Region is required" })}
                                    defaultValue=""
                                    className="select rounded-md w-full"
                                    onChange={r => setSelectedRegion(r.target.value)}
                                >
                                    <option value="" disabled>Select your Region</option>
                                    {region.map((r, inx) => (
                                        <option key={inx} value={r}>{r}</option>
                                    ))}
                                </select>
                                {errors.region && <p className="text-red-400">{errors.region.message}</p>}

                                {/* District */}
                                <label className="font-medium text-sm">Your District</label>
                                <select
                                    {...register("district", { required: "District is required" })}
                                    defaultValue=""
                                    className="select rounded-md w-full"
                                >
                                    <option value="" disabled>Select your District</option>
                                    {districts.map((d, inx) => (
                                        <option key={inx} value={d.district}>{d.district}</option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-red-400">{errors.district.message}</p>}

                                {/* NID */}
                                <label className="font-medium text-sm">NID No</label>
                                <input
                                    type="number"
                                    {...register("nid", { required: "NID is required" })}
                                    className="input rounded-md w-full"
                                    placeholder="NID"
                                />
                                {errors.nid && <p className="text-red-400">{errors.nid.message}</p>}

                                {/* Phone */}
                                <label className="font-medium text-sm">Phone Number</label>
                                <input
                                    type="tel"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        minLength: { value: 11, message: "Enter a valid phone number" }
                                    })}
                                    className="input rounded-md w-full"
                                    placeholder="Phone Number"
                                />
                                {errors.phone && <p className="text-red-400">{errors.phone.message}</p>}

                                {/* Bike Model */}
                                <label className="font-medium text-sm">Bike Brand Model and Year</label>
                                <input
                                    type="text"
                                    {...register("bikeModel", { required: "Bike model is required" })}
                                    className="input rounded-md w-full"
                                    placeholder="Bike Brand Model and Year"
                                />
                                {errors.bikeModel && <p className="text-red-400">{errors.bikeModel.message}</p>}

                                {/* Bike Registration */}
                                <label className="font-medium text-sm">Bike Registration Number</label>
                                <input
                                    type="text"
                                    {...register("bikeReg", { required: "Registration number is required" })}
                                    className="input rounded-md w-full"
                                    placeholder="Bike Registration Number"
                                />
                                {errors.bikeReg && <p className="text-red-400">{errors.bikeReg.message}</p>}

                                {/* About */}
                                <label className="font-medium text-sm">Tell Us About Yourself</label>
                                <textarea
                                    {...register("about", { required: "This field is required" })}
                                    className="textarea rounded-md w-full"
                                    placeholder="Tell Us About Yourself"
                                    rows={3}
                                ></textarea>
                                {errors.about && <p className="text-red-400">{errors.about.message}</p>}

                                {/* Submit Button */}
                                <button className="btn mt-4 text-black bg-[#CAEB66]">Submit</button>

                            </form>

                        </div>
                    </div>
                    <div><img className='w-[462px] h-[439]' src={agentPending} alt="" /></div>
                </div>
            </div>
        </div>
    );
};

export default BeARider;