import React from 'react';

import './Post.css';
import { withRouter } from 'react-router';


const Post = (props) => {
    return (
        <div className='post' onClick={() => props.history.push(`/post/${props.id}`)}>
            <div className='post-image'>
                <img src={props.image} alt='post-img' />
            </div>

            <div className='post-info'>
                <p style={{ fontWeight: 'bold' }}>{props.title}</p>
                <p>{props.date.slice(0, 10)}</p>
                <div className='viewsNclaps'>
                    <p>{props.views} Views</p>
                    <p style={{ marginLeft: '7px' }}>{props.claps} Claps</p>
                </div>
            </div>
        </div>
    )
}


export default withRouter(Post);