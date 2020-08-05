import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './Homepage.css';

import Post from '../Post/Post';
import { useContext } from 'react';
import Authcontext from '../../Authcontext/Authcontext';
import Loader from '../Loader/Loader';


const Homepage = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('recent');
    const [search, setSearch] = useState('');

    const auth = useContext(Authcontext);

    let filteredPosts;

    if (filter === 'recent') {
        filteredPosts = posts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        }).filter(e => {
            return e.title.toLowerCase().includes(search.toLowerCase())
        })
    }
    else if (filter === 'liked') {
        filteredPosts = posts.sort((a, b) => {
            return b.claps - a.claps;
        }).filter(e => {
            return e.title.toLowerCase().includes(search.toLowerCase())
        })
    }
    else {
        filteredPosts = posts.sort((a, b) => {
            return b.views - a.views;
        }).filter(e => {
            return e.title.toLowerCase().includes(search.toLowerCase())
        })
    }

    useEffect(() => {
        auth.setLoading(true);
        Axios.get('https://blogapp-85fe6.firebaseio.com/posts.json')
            .then(res => {
                if (res.data) {
                    const responseData = Object.entries(res.data);
                    const modifiedData = [];

                    for (let e in responseData) {
                        modifiedData.push({
                            id: responseData[e][0],
                            title: responseData[e][1].title,
                            image: responseData[e][1].image,
                            date: responseData[e][1].date,
                            views: responseData[e][1].views,
                            claps: responseData[e][1].claps
                        })
                    }
                    setPosts(modifiedData);
                    setTimeout(() => {
                        auth.setLoading(false);
                    }, 1200)
                }
            })
    }, [])

    return (
        <div className={auth.darkmode ? 'homepage homepage-dark' : 'homepage'}>
            <div className='loader1' style={!auth.loading ? { display: 'none' } : null}>
                <Loader />
            </div>

            <div className='filters' style={auth.loading ? { display: 'none' } : null}>
                <form>
                    <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="recent">Recent</option>
                        <option value="popular">Most Viewed</option>
                        <option value="liked">Most Clapped</option>
                    </select>
                </form>
            </div>

            <div className='posts' style={auth.loading ? { display: 'none' } : null}>
                {filteredPosts.length !== 0 ? filteredPosts.map(e => {
                    return <Post key={e.id}
                        id={e.id}
                        image={e.image}
                        title={e.title}
                        description={e.description}
                        views={e.views}
                        date={e.date}
                        claps={e.claps} />
                }) : <h5 style={{ wordBreak: 'break-all', width: '50%' }}>Nothing found while searching:{search}</h5>}
            </div>
        </div>
    )
}


export default Homepage;