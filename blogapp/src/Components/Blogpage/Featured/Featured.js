import React, { useContext } from 'react';

import classes from './Featured.module.css';
import Authcontext from '../../../Authcontext/Authcontext';
import { withRouter } from 'react-router';

const Featured = (props) => {
    const auth = useContext(Authcontext);

    const sorted = auth.posts.sort((a, b) => {
        return b.views - a.views;
    })

    return (
        <div className={classes.Featuredpage}>
            <h4>Popular Posts</h4>
            {sorted.map(e => {
                return (
                    <div className={classes.Card}
                        key={e.id}
                        onClick={() => props.history.push(`/blog/details/${e.id}`)}>
                        <img src={e.image} alt='blogimago' />
                        <h5>{e.title}</h5>
                        <h5>{e.author}</h5>
                        <p>{e.date.slice(0, 10)}</p>
                        <div className={classes.Insights}>
                            <ul>
                                <i className='far fa-eye'></i>
                                <p>{e.views}</p>
                            </ul>
                            <ul>
                                <i className='far fa-heart'></i>
                                <p>{e.claps}</p>
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default withRouter(Featured);