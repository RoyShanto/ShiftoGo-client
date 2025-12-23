import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {
    const { createAccountWithGoogle } = useAuth();
    const location = useLocation()
    const from = location.state || "/"
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        createAccountWithGoogle()
            .then((userCredential) => {
                console.log(userCredential.user)
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