import React, { useState, useEffect } from 'react';

import Blogpagenav from '../Blogpagenav/Blogpagenav';

import classes from './Update.module.css';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

const Update = (props) => {
    const [title, setTitle] = useState('');
    const [imageurl, setImageurl] = useState('');
    const [description, setDescription] = useState('');
    const [fulldata, setFulldata] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`)
            .then(res => {
                setLoading(false);
                if (res.data) {
                    setFulldata(res.data);
                    setTitle(res.data.title);
                    setImageurl(res.data.image);
                    setDescription(res.data.description);
                }
            })
            .catch(err => {
                setLoading(false);
                setError(err.message)
            })
    }, [])

    const textareaAutoexpander = () => {
        const textarea = document.querySelector('textarea');
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    const textareaUpdate = (e) => {
        setDescription(e.target.value);
        textareaAutoexpander();
    }

    const updateIt = (e) => {
        e.preventDefault();
        Axios.put(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`, {
            ...fulldata,
            title: title,
            image: imageurl,
            description: description,
        })
            .then(res => {
                props.history.push(`/blog/details/${props.match.params.id}`);
            })
            .catch(err => {
                setError(err.message);
            })
    }

    let updateForm = (
        <div className={classes.Errorview}>
            <h5>{fulldata === '' && error === '' ? 'Blog not found' : error !== ''
                ? error : 'No permission to update this post!'}</h5>
        </div>
    )

    if (fulldata.username === localStorage.getItem('username')) {
        if (localStorage.getItem('loggedin') === 'true') {
            updateForm = (
                <form className={classes.Updateform}
                    onSubmit={updateIt}
                    style={localStorage.getItem('loggedin') !== 'true' | fulldata === ''
                        ? { display: 'none' } : null}>
                    <p style={{ color: 'red', fontStyle: 'italic', fontSize: '14px' }}>{error}</p>
                    <input type="submit"
                        value='Update'
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
            )
        }
        else {
            updateForm = (
                <div className={classes.Errorview}>
                    <h5>Please <NavLink to='/login'>Login</NavLink> first to update this post.</h5>
                </div>
            )
        }
    }

    return (
        <div className={classes.Updatepage}>
            <Blogpagenav />
            <div style={loading ? { display: 'none' } : null}>
                {updateForm}
            </div>

            <div className={classes.Errorview} style={!loading ? { display: 'none' } : null}>
                <h5>Loading.....</h5>
            </div>
        </div>
    )
}

export default Update;