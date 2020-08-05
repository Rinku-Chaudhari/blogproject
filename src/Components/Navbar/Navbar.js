import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Authcontext from '../../Authcontext/Authcontext';

import './Navbar.css';


const Navbar = () => {
    const auth = useContext(Authcontext);

    return (
        <div className={auth.darkmode ? 'nav-bar nav-bar-dark' : 'nav-bar'}
            style={auth.loading ? { display: 'none' } : null}>
            <ul className='logo-bar'>
                <NavLink to='/'>
                    <i className="fas fa-exclamation-circle"></i>
                </NavLink>
            </ul>

            <ul className='links-bar'>
                <li>
                    <NavLink to='/about'>About</NavLink>
                </li>
                <li>
                    <NavLink to='/contact'>Contact</NavLink>
                </li>
            </ul>

            <ul className='toggle-bar'>
                <li>
                    <input type='checkbox' className='toggle' onClick={() => auth.setDarkmode(prev => !prev)} />
                </li>
                <li>
                    <label htmlFor='toggle'>Dark mode</label>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;