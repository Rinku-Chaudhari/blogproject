import React, { useState } from 'react';

import Blogpagenav from '../Blogpagenav/Blogpagenav';

import classes from './Create.module.css';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

const Create = (props) => {
    const [title, setTitle] = useState('');
    const [imageurl, setImageurl] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const textareaAutoexpander = () => {
        const textarea = document.querySelector('textarea');
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    const textareaUpdate = (e) => {
        setDescription(e.target.value);
        textareaAutoexpander();
    }

    const postIt = (e) => {
        e.preventDefault();
        Axios.post('https://blogapp-85fe6.firebaseio.com/posts.json', {
            title: title,
            image: imageurl,
            author: localStorage.getItem('fullname'),
            description: description,
            date: new Date(),
            views: 0,
            claps: 0,
            username: localStorage.getItem('username')
        })
            .then(res => {
                props.history.push('/');
            })
            .catch(err => {
                setError(err.message);
            })
    }


    return (
        <div className={classes.Createpage}>
            <Blogpagenav />
            <form className={classes.Createform}
                onSubmit={postIt}
                style={localStorage.getItem('loggedin') !== 'true' ? { display: 'none' } : null}>
                <p style={{ color: 'red', fontStyle: 'italic', fontSize: '14px' }}>{error}</p>
                <input type="submit"
                    value='Publish'
                    disabled={!title | !description | !imageurl} />
                <input type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Type blog title' />
                <input type="text"
                    value={imageurl}
                    onChange={(e) => setImageurl(e.target.value)}
                    placeholder='Enter your blog image url' />
                <textarea style={{ resize: 'none' }}
                    value={description}
                    onChange={textareaUpdate}
                    placeholder='Type your blog description'>
                </textarea>
            </form>

            <div className={classes.Errorview}
                style={localStorage.getItem('loggedin') !== 'false' ? { display: 'none' } : null}>
                <h4>Please <NavLink to='/login'>Login</NavLink> first to create a new post!</h4>
            </div>

        </div>
    )
}

export default Create;