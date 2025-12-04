import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';

const SocialLogin = () => {
    const { createAccountWithGoogle } = useAuth();
    const handleGoogleLogin = () => {
        createAccountWithGoogle()
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
        <div>
            <button onClick={handleGoogleLogin} className="btn text-black bg-base-200 w-full"><FaGoogle />Login with google</button>
        </div>
    );
};

export default SocialLogin;