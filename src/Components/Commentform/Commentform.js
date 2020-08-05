import React from 'react';

import './Commentform.css';
import { useState } from 'react';
import Axios from 'axios';


const Commentform = (props) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');


    const submitForm = (e) => {
        e.preventDefault();


        if (name.trim().length >= 5 && name.trim().length <= 50) {
            if (comment.trim().length >= 5 && comment.trim().length <= 100) {
                Axios.post(`https://blogapp-85fe6.firebaseio.com/comments/${props.id}.json`, {
                    name: name,
                    comment: comment,
                    date: new Date(),
                    userId: props.userId
                })
                    .then(res => {
                        setName('');
                        setComment('');
                        props.setUpdatecomments(prev => !prev)
                    })
            }
            else {
                setError('Comment must be between 5 and 100 characters.');
            }
        }

        else {
            setError('Name must be between 5 and 50 characters.');
        }
    }


    return (
        <div className={props.auth.darkmode ? 'comment-page comment-page-dark' : 'comment-page'}>
            <form className='comment-form' onSubmit={submitForm}>
                <input type="text"
                    placeholder='Type your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <textarea placeholder='Type your comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}></textarea>
                <p className='error-display'>{error}</p>
                <input type="submit" value="Comment" />
            </form>
        </div>
    )
}

export default Commentform;