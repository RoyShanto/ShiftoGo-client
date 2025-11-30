import React from 'react';
import Marquee from "react-fast-marquee";
import logo1 from "../../../assets/brands/amazon.png"
import logo2 from "../../../assets/brands/amazon_vector.png"
import logo3 from "../../../assets/brands/casio.png"
import logo4 from "../../../assets/brands/moonstar.png"
import logo5 from "../../../assets/brands/randstad.png"
import logo6 from "../../../assets/brands/star.png"
import logo7 from "../../../assets/brands/start_people.png"

const SalesTeams = () => {
    const logo = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
    return (
        <div className='my-[100px]'>
            <h2 className='text-3xl font-extrabold text-center'>We've helped thousands of sales teams</h2>
            <Marquee>
                {logo.map((l, idx) => <img src={l} key={idx} className='mr-20 pt-10' />)}
            </Marquee>
        </div>
    );
};

export default SalesTeams;