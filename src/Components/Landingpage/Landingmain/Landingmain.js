import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Landingmain.module.css';

import noMoney from '../../../assets/nomoney.png';
import minimalistic from '../../../assets/crown.png';
import visibility from '../../../assets/visibility.png';
import dialogue from '../../../assets/dialogue.png';

import person1 from '../../../assets/Person1.jpg';
import person2 from '../../../assets/Person2.jpg';
import person3 from '../../../assets/Person3.jpg';
import person4 from '../../../assets/Person4.jpg';


const Landingmain = () => {
    return (
        <div className={classes.Landingmain}>
            <section className={classes.Section1}>
                <div className={classes.Actiontexts}>
                    <h2>Minimalistic Blogging Site</h2>
                    <p>to make blogging easier and simple</p>
                    <button>
                        <NavLink to='/signup'>Get started</NavLink>
                    </button>
                </div>
            </section>


            <section className={classes.Section2}>
                <h4>Key features of <em>Writer</em></h4>
                <div className={classes.Cards}>
                    <div className={classes.Card}>
                        <img src={noMoney} alt='free' />
                        <p>No money,no problem</p>
                    </div>
                    <div className={classes.Card}>
                        <img src={minimalistic} alt='free' />
                        <p>Minimalistic and user friendly</p>
                    </div>
                    <div className={classes.Card}>
                        <img src={visibility} alt='free' />
                        <p>Huge organic reach</p>
                    </div>
                    <div className={classes.Card}>
                        <img src={dialogue} alt='free' />
                        <p>Amazing technical support</p>
                    </div>
                </div>
            </section>

            <section className={classes.Section3}>
                <h4>What our users have to say</h4>
                <div className={classes.Cards}>
                    <div className={classes.Card}>
                        <p>Writer is fantastic tool for
                        exposing your writing
                        skills to the world.</p>
                        <div className={classes.Profile}>
                            <img src={person1} alt='p1' />
                            <h5>Big Ben</h5>
                        </div>
                    </div>
                    <div className={classes.Card}>
                        <p>Writer is fantastic tool for
                        exposing your writing
                        skills to the world.</p>
                        <div className={classes.Profile}>
                            <img src={person2} alt='p1' />
                            <h5>Sam Ovens</h5>
                        </div>
                    </div>
                    <div className={classes.Card}>
                        <p>Writer is fantastic tool for
                        exposing your writing
                        skills to the world.</p>
                        <div className={classes.Profile}>
                            <img src={person3} alt='p1' />
                            <h5>Hailey Beiber</h5>
                        </div>
                    </div>
                    <div className={classes.Card}>
                        <p>Writer is fantastic tool for
                        exposing your writing
                        skills to the world.</p>
                        <div className={classes.Profile}>
                            <img src={person4} alt='p1' />
                            <h5>Alicia cara</h5>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}


export default Landingmain;