import React, { useEffect, useContext } from 'react';

import './Loader.css';

import Authcontext from '../../Authcontext/Authcontext';


const Loader = () => {
    const auth = useContext(Authcontext);

    useEffect(() => {
        progressLoader()
    }, [])

    const progressLoader = () => {
        const bar = document.querySelector('.bar');
        let width = 1;

        const interval = setInterval(() => {
            width += 1
            bar.style.width = width + '%';

            if (width === 101) {
                clearInterval(interval);
            }
        }, 27)
    }

    return (
        <div className={auth.darkmode ? 'loader-page-dark loader-page' : 'loader-page'}
            style={!auth.loading ? { display: 'none' } : null}>
            <div className="loader">
                <div className="bar"></div>
            </div>
        </div>
    )
}

export default Loader;