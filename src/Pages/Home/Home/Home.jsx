import Banner from '../Banner/Banner';
import CustomerReview from '../CustomerReview/CustomerReview';
import Faq from '../Faq/Faq';
import Goals from '../Goals/Goals';
import HowItWorks from '../howItWorks/howItWorks';
import OurServices from '../OurServices/OurServices';
import SalesTeams from '../SalesTeams/SalesTeams';
import Satisfaction from '../Satisfaction/Satisfaction';

const Home = () => {
    return (
        <div>
            <Banner />
            <HowItWorks />
            <OurServices />
            <SalesTeams />
            <hr className="border-t border-dashed border-gray-300" />
            <Satisfaction />
            <hr className="border-t border-dashed border-gray-300" />
            <Goals />
            <CustomerReview />
            <Faq />

        </div>
    );
};

export default Home;