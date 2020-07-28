import React, { useState, useEffect } from 'react';
import classes from './Delete.module.css';
import Axios from 'axios';
import Blogpagenav from '../Blogpagenav/Blogpagenav';
import { NavLink } from 'react-router-dom';


const Delete = (props) => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        Axios.get(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`)
            .then(res => {
                setLoading(false);
                if (res.data) {
                    setPost(res.data);
                }
            })
            .catch(err => {
                setLoading(false);
                setError(err.message);
            })
    }, [])

    const deleteIt = () => {
        Axios.delete(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`)
            .then(res => {
                props.history.push('/');
            })
    }

    let deleteDiv = (
        <div className={classes.Errorview}>
            <h5>{post.length === 0 && error === ''
                ? 'Blog not found' : error ? error : 'No permission to delete this post!'}</h5>
        </div>
    )

    if (post.username === localStorage.getItem('username')) {
        if (localStorage.getItem('loggedin') === 'true') {
            deleteDiv = (
                <div className={classes.Deletediv}>
                    <h5>Do you sure want to delete {post.tite}?</h5>
                    <button onClick={deleteIt}>Confirm</button>
                    <button onClick={() =>
                        props.history.push(`/blog/details/${props.match.params.id}`)}>No</button>
                </div>
            )
        }
        else {
            deleteDiv = (
                <div className={classes.Errorview}>
                    <h5>Please <NavLink to='/login'>Login</NavLink> first to delete this post.</h5>
                </div>
            )
        }
    }

    return (
        <div>
            <Blogpagenav />
            <div style={loading ? { display: 'none' } : null}>
                {deleteDiv}
            </div>

            <div className={classes.Errorview} style={!loading ? { display: 'none' } : null}>
                <h5>Loading.....</h5>
            </div>
        </div>
    )
}

export default Delete;