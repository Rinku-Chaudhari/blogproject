import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './Viewcomment.css';


const Viewcomment = (props) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        Axios.get(`https://blogapp-85fe6.firebaseio.com/comments/${props.id}.json`)
            .then(res => {
                if (res.data) {
                    const data = Object.entries(res.data);
                    const modifiedData = [];

                    for (let e in data) {
                        modifiedData.push({
                            id: data[e][0],
                            comment: data[e][1].comment,
                            user: data[e][1].name,
                            date: data[e][1].date
                        })
                    }
                    setComments(modifiedData);
                }
            })
    }, [props])

    return (
        <div className="view-comment-page">
            <h5>{comments.length} Comments</h5>
            {comments.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            }).map(e => {
                return (
                    <div className="comment" key={e.id}>
                        <div className='left'>
                            <i className="far fa-user-circle"></i>
                        </div>

                        <div className='right'>
                            <div className='top'>
                                <p style={{ fontWeight: 'bold', marginRight: '8px' }}>{e.user}</p>
                                <p style={{ opacity: '0.8' }}>{e.date.slice(0, 10)}</p>
                            </div>

                            <div className='bottom'>
                                <p className='comment-line'>{e.comment}</p>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}


export default Viewcomment;