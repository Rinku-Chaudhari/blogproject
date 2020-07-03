import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './Blogpagenav.module.css';

const Blogpagenav = (props) => {
    const logoutHandler = () => {
        localStorage.setItem('loggedin', false);
        props.history.push('/');
    }

    return (
        <div className={classes.Blogpagenav}>
            <ul className={classes.Branding}>
                <li>
                    <NavLink to='/'>Writer</NavLink>
                </li>
            </ul>
            <ul className={classes.Links}
                style={localStorage.getItem('loggedin') !== 'true' ? { display: 'none' } : null}>
                <li>
                    <NavLink to='/blog/new'>
                        <i style={{ fontSize: '18px' }} className='fas fa-plus'></i>
                    </NavLink>
                </li>
                <li>
                    <button onClick={logoutHandler}>
                        <i style={{ fontSize: '18px' }} className='fas fa-sign-out-alt'></i>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Blogpagenav);