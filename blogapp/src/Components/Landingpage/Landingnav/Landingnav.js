import React from 'react';
import classes from './Landingnav.module.css';
import { NavLink } from 'react-router-dom';


const Landingnav = () => {
    const SideregisterToggler = () => {
        const sideregister = document.querySelector('.sideregister');
        const icon = document.querySelector('.fas');
        icon.classList.toggle('fa-times');
        sideregister.classList.toggle(`${classes.Flex}`)
    }

    return (
        <div className={classes.Landingnav}>
            <div className={classes.Landingnavflex}>
                <ul className={classes.Branding}>
                    <li>
                        <NavLink to='/'>Writer</NavLink>
                    </li>
                </ul>

                <ul className={classes.Registration}>
                    <li>
                        <NavLink to='/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/signup' className={classes.Signupbtn}>Signup</NavLink>
                    </li>
                </ul>

                <button onClick={SideregisterToggler}>
                    <i className={`fas fa-bars ${classes.fas}`}></i>
                </button>
            </div>

            <ul className={`${classes.Sideregister} sideregister`}>
                <li>
                    <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                    <NavLink to='/signup'>Signup</NavLink>
                </li>
            </ul>
        </div >
    )
}


export default Landingnav;