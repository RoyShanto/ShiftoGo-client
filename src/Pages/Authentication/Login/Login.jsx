import { Link } from 'react-router';
import { useForm } from "react-hook-form"
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { signInWithEmailPassword } = useAuth();

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
        // console.log(data)
        signInWithEmailPassword(data.email, data.password)
            .then((userCredential) => {
                console.log(userCredential.user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <div className="my-36" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset w-full">
                    <h1 className='font-extrabold text-[42px] w-full'>Welcome Back</h1>
                    <p className='mb-5'>Login with Shiftogo</p>

                    <label className="font-medium text-sm">Email</label>
                    <input type="email"
                        {...register("email", {
                            required: "Email Address is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })} className="input w-full" placeholder="Email" />
                    {errors.email && <p className='text-red-400'>{errors.email.message}</p>}

                    <label className="font-medium text-sm">Password</label>
                    <input type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })} className="input w-full" placeholder="Password" />
                    {errors.password && <p className='text-red-400'>{errors.password.message}</p>}

                    <Link to={'/forgetPassword'} className="link link-hover">Forgot password?</Link>


                    <button type="submit" className="btn text-black mt-4 mb-3 bg-[#CAEB66]">Login</button>
                    <p>Don’t have any account? <Link to={'/registration'} className='text-[#CAEB66]'>Register</Link></p>

                </fieldset>
            </form>
            <div className="divider mb-3">OR</div>
            <SocialLogin/>
        </div>
    );
};

export default Login;