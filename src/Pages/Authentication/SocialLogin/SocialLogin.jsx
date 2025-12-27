import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const SocialLogin = () => {
    const { createAccountWithGoogle } = useAuth();
    const axiosInstance = useAxios()
    const location = useLocation()
    const from = location.state || "/"
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        createAccountWithGoogle()
            .then(async (userCredential) => {
                // console.log(userCredential.user)
                const userInfo = {
                    email: userCredential.user.email,
                    role: "user",
                    creationDate: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                }
                const result = await axiosInstance.post('/users', userInfo)
                console.log(result.data)
                navigate(from)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn text-black bg-base-200 w-full"><FaGoogle />Login with google</button>
        </div>
    );
};

export default SocialLogin;