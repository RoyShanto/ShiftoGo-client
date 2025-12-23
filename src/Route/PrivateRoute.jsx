import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location)
    // console.log(user?.email)

    if (loading) { return <span className="loading loading-dots loading-xl"></span> }
    if (!user?.email) { return <Navigate to="/login" state={location.pathname}></Navigate> }

    return children;
};

export default PrivateRoute;