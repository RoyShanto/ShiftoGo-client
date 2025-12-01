import authImage from '../assets/authImage.png'
import logo from '../assets/shiftogo.png'
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto shadow">
            <div className="flex flex-col lg:flex-row-reverse p-0 gap-0">
                <div className="w-1/2 bg-lime-50 flex items-center">
                    <img src={authImage} alt="auth Image" />
                </div>
                <div className="w-1/2 flex">
                    <div>
                        <Link to={"/"}><img className='md:w-40 max-sm:w-28 ml-12 mt-11' src={logo} alt="logo" /></Link>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;