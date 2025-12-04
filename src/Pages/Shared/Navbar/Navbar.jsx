import { Link, NavLink } from 'react-router';
import logo from '../../../assets/shiftogo.png';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const { user, loading, signOutUser } = useAuth();

    const handleLogout = () => {
        signOutUser()
            .then(() => {
                console.log("Sign-out successful.")
            })
            .catch((error) => {
                console.log("Problem", error)
            });
    }

    const links = <>
        <NavLink to={'/'}><li className='mr-4'>Home</li></NavLink>
        <NavLink to={'/services'}><li className='mr-4'>Services</li></NavLink>
        <NavLink to={'/coverage'}><li className='mr-4'>Coverage</li></NavLink>
        <NavLink to={'/trackOrder'}><li className='mr-4'>Track Order</li></NavLink>
        <NavLink to={'/about'}><li className='mr-4'>About Us</li></NavLink>
        <NavLink to={'/pricing'}><li className='mr-4'>Pricing</li></NavLink>
        <NavLink to={'/sendParcel'}><li className='mr-4'>Send Parcel</li></NavLink>
        <NavLink to={'/beARider'}><li className='mr-4'>Be a Rider</li></NavLink>

    </>
    return (
        <div className="navbar bg-base-100 shadow-sm rounded-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ml-2">
                        {links}
                    </ul>
                </div>
                <a href="/"><img className='md:w-40 max-sm:w-28' src={logo} alt="" /></a>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <p>{!loading && user?.email}</p>
                <Link to={'/login'} className="btn">Sign In</Link>
                <Link onClick={handleLogout} className="btn">Sign Out</Link>
            </div>
        </div>
    );
};

export default Navbar;