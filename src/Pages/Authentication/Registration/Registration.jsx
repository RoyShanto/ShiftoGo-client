import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { TbUserUp } from 'react-icons/tb';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Registration = () => {
    const { createAccountWithEmailPassword } = useAuth();

    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = data => {
        createAccountWithEmailPassword(data.email, data.password)
            .then((userCredential) => {
                console.log(userCredential)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }


    return (
        <div className="my-36">
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset w-full">
                    <h1 className='font-extrabold text-[42px] w-full'>Create an Account</h1>
                    <p className='mb-5'>Register with Shiftogo</p>


                    <label className="border border-gray-200 w-14 p-1 rounded-full cursor-pointer">
                        <div className="bg-gray-200 p-3 w-11 rounded-full text-xl text-gray-500 flex items-center justify-center">
                            <TbUserUp />
                        </div>
                        <input type="file" className="hidden" />
                    </label>

                    <label className="font-medium text-sm">Name</label>
                    <input type="text" {...register("name", {
                        required: "Name is required"
                    })} className="input w-full" placeholder="Name" />
                    {errors.name && <p role="alert" className='text-red-400'>{errors.name.message}</p>}

                    <label className="font-medium text-sm">Email</label>
                    <input type="email" {...register("email", {
                        required: "Email Address is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })} className="input w-full" placeholder="Email" />
                    {errors.email && <p role="alert" className='text-red-400'>{errors.email.message}</p>}

                    <label className="font-medium text-sm">Password</label>
                    <input type="password" {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })} className="input w-full" placeholder="Password" />
                    {errors.password && <p role="alert" className='text-red-400'>{errors.password.message}</p>}

                    <button className="btn text-black mt-4 mb-3 bg-[#CAEB66]">Register</button>
                    <p>Already have an account? <Link to={'/login'} className='text-[#CAEB66]'>Login</Link></p>
                </fieldset>
            </form>
            <div className="divider mb-3">OR</div>
            <SocialLogin />
        </div>
    );
};

export default Registration;