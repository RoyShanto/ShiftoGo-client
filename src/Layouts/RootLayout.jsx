
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <div className='pt-9'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default RootLayout;