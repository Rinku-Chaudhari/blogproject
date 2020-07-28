import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Blogpagenav from '../Blogpagenav/Blogpagenav';
import classes from './Details.module.css';
import { NavLink } from 'react-router-dom';

const Details = (props) => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        Axios.get(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`)
            .then(res => {
                setLoading(false);
                if (res.data) {
                    setPost(res.data);
                    Axios.put(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`, {
                        ...res.data,
                        views: res.data.views + 1
                    })
                }
            })
            .catch(err => {
                setLoading(false);
                setError(err.message)
            })
    }, [])

    const increaseClaps = () => {
        Axios.put(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`, {
            ...post,
            claps: post.claps + 1
        })
            .then(res => {
                if (res.data) {
                    setPost(res.data);
                }
            })
    }

    let editSection = '';
    let likeSection = '';

    if (post.username === localStorage.getItem('username') && localStorage.getItem('loggedin') === 'true') {
        editSection = (
            <div className={classes.Update}>
                <NavLink to={`/blog/update/${props.match.params.id}`}>
                    <i className='fas fa-pen'></i>
                </NavLink>


                <NavLink to={`/blog/delete/${props.match.params.id}`}>
                    <i className='fas fa-trash'></i>
                </NavLink>
            </div>
        )
    }

    if (post.username !== localStorage.getItem('username') && localStorage.getItem('loggedin') === 'true') {
        likeSection = (
            <button className={classes.Likebtn} onClick={increaseClaps}>
                <i className='far fa-heart'></i>
            </button>
        )
    }

    return (
        <div className={classes.Detailspage}>
            <Blogpagenav />

            <div style={loading || post.length < 1 ? { display: 'none' } : null}>
                <div className={classes.Content}>
                    <h4>{post.title}</h4>
                    <p>By {post.author} published on {post.date}</p>
                    {editSection}
                    <img src={post.image} alt='postimago' />
                    <p style={{ whiteSpace: 'pre-wrap' }}>{post.description}</p>
                    {likeSection}
                </div>
            </div>

            <div className={classes.Errorview} style={!loading ? { display: 'none' } : null}>
                <h5>Loading...</h5>
            </div>

            <div className={classes.Errorview}
                style={post.length !== 0
                    ? { display: 'none' } : loading ? { display: 'none' } : null}>
                <h5>{error === '' ? 'Blog not found' : error}</h5>
            </div>
        </div>
    )
}

export default Details;