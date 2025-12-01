
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto bg-base-200 px-12 py-8 max-sm:p-5'>
            <Navbar/>
            <div className='pt-9'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default RootLayout;