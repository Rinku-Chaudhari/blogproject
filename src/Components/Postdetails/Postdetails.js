import React, { useState, useEffect } from 'react';

import './Postdetails.css';
import Axios from 'axios';
import { useContext } from 'react';
import Authcontext from '../../Authcontext/Authcontext';
import Loader from '../Loader/Loader';
import Commentform from '../Commentform/Commentform';
import Viewcomment from '../Viewcomment/Viewcomment';

import clapImage from '../../Assets/clap.png';


const Postdetails = (props) => {
    const [post, setPost] = useState([]);
    const [updateComments, setUpdatecomments] = useState(false);
    const [error, setError] = useState('');
    const [claps, setClaps] = useState('');
    const [update, setUpdate] = useState(false);
    let userId = localStorage.getItem('user-id');

    const auth = useContext(Authcontext);

    useEffect(() => {
        userId === null ? localStorage.setItem('user-id', new Date() * Math.random()) : userId = userId;
        auth.setLoading(true);
        Axios.get(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`)
            .then(res => {
                if (res.data) {
                    setPost(prev => [...prev, res.data])
                    setTimeout(() => {
                        auth.setLoading(false);
                    }, 1200)

                    Axios.put(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`, {
                        ...res.data,
                        views: res.data.views + 1
                    })
                        .catch(err => setError(err.message))

                    Axios.post('https://blogapp-85fe6.firebaseio.com/userVisitedIds.json', {
                        userID: localStorage.getItem('user-id'),
                        visitedDate: new Date(),
                        visitedPostId: props.match.params.id
                    })
                }
                else {
                    setTimeout(() => {
                        auth.setLoading(false);
                    }, 1200)
                }
            })
            .catch(err => {
                setError(err.message)
                setTimeout(() => {
                    auth.setLoading(false);
                }, 1200)
            })
        updateBar()
    }, [])


    useEffect(() => {
        Axios.get(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`)
            .then(res => {
                if (res.data) {
                    setClaps(res.data.claps)
                }
            })
    }, [update])


    const updateBar = () => {
        document.addEventListener('scroll', () => {
            const bar = document.querySelector('.blog-bar');
            let height = document.body.clientHeight;

            bar !== null ? bar.style.width = Math.floor((window.scrollY / height) * 100) + '%' : height = 0;
        })
    }

    const toggleCommentbox = () => {
        const toggler = document.querySelector('.commentbox-toggler');
        const commentBox = document.querySelector('.comment-section');

        toggler.classList.toggle('hide');
        commentBox.classList.toggle('show');
    }

    const updateClaps = () => {
        Axios.put(`https://blogapp-85fe6.firebaseio.com/posts/${props.match.params.id}.json`, {
            ...post[0],
            claps: claps + 1
        })
            .then(res => {
                setUpdate(prev => !prev);
            })
            .catch(err => {
                setError(err.message)
            })
    }


    return (
        <div className={auth.darkmode ? 'post-detail-page post-detail-page-dark' : 'post-detail-page'}>
            <div className='loader1' style={!auth.loading ? { display: 'none' } : null}>
                <Loader />
            </div>

            <div className='blog-bar'
                style={auth.loading | post === '' | error !== '' ? { display: 'none' } : null}></div>

            <div style={auth.loading ? { display: 'none' } : null}>
                {post.map(e => {
                    return (
                        <div className='post-details' key={new Date() * Math.random()}>
                            <p style={!auth.darkmode ? { fontWeight: 'bold' } : null}>{e.title}</p>
                            <p>{e.date.slice(0, 10)}</p>
                            <img src={e.image} alt="post" />
                            <p style={{ whiteSpace: 'pre-wrap' }}>{e.description}</p>

                            <div className='interactions'>
                                <p>{e.views} Views</p>
                                <p>{claps} Claps</p>
                                <img src={clapImage} alt='clap' onClick={updateClaps} />
                                <p style={{ marginLeft: '7px' }}>Clap this post if you liked!</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='commentbox-toggler'
                style={auth.loading | post.length === 0 | error !== '' ? { display: 'none' } : null}
                onClick={toggleCommentbox}>
                <p>Comment and show your love</p>
                <i className="fas fa-angle-down"></i>
            </div>

            <div className='comment-section'
                style={auth.loading | post.length === 0 | error !== '' ? { display: 'none' } : null}>
                <Commentform id={props.match.params.id} auth={auth} setUpdatecomments={setUpdatecomments} userId={userId} />
            </div>

            <div className="view-comment" style={auth.loading | post.length === 0 ? { display: 'none' } : null}>
                <Viewcomment id={props.match.params.id} updateComments={updateComments} />
            </div>

            <div className="post-not-found"
                style={auth.loading | post.length !== 0 | error !== '' ? { display: 'none' } : null}>
                <p>Post not found!</p>
                <p>Make sure the URL is valid.</p>
            </div>

            <div className='error-view' style={auth.loading | error === '' ? { display: 'none' } : null}>
                <p>{error}</p>
            </div>
        </div>
    )
}

export default Postdetails;