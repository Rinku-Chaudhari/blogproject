import React from 'react';
import Landingnav from './Landingnav/Landingnav';
import Landingmain from './Landingmain/Landingmain';
import Landingfooter from './Landingfooter/Landingfooter';


const Landingpage = () => {
    return (
        <div>
            <Landingnav />
            <Landingmain />
            <Landingfooter />
        </div>
    )
}

export default Landingpage;