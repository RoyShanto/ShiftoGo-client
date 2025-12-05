import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    console.log(user?.email)
    if (loading) { return <span className="loading loading-dots loading-xl"></span> }
    if (!user?.email) { <Navigate to="/login"></Navigate> }

    return children;
};

export default PrivateRoute;