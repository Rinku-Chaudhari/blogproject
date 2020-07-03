import React from 'react';
import classes from './Landingfooter.module.css';


import email from '../../../assets/mail.png';
import phone from '../../../assets/call.png';
import locatioN from '../../../assets/pin.png';


const Landingfooter = () => {
    return (
        <div className={classes.Landingfooter}>
            <div className={classes.About}>
                <div className={classes.Info}>
                    <img src={email} alt="email" />
                    <p>support@writer.inc</p>
                </div>
                <div className={classes.Info}>
                    <img src={phone} alt='phone' />
                    <p>901-192-1929</p>
                </div>
                <div className={classes.Info}>
                    <img src={locatioN} alt='location' />
                    <p>Nepal</p>
                </div>
            </div>
            <h5>2020@Writer Inc</h5>
        </div>
    )
}

export default Landingfooter;