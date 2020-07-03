import React, { useEffect, useState } from 'react';
import Blogpagenav from './Blogpagenav/Blogpagenav';
import Featured from './Featured/Featured';
import Latest from './Latest/Latest';
import Axios from 'axios';
import Authcontext from '../../Authcontext/Authcontext';


const sectionStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
}



const Blogpage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Axios.get('https://blogapp-85fe6.firebaseio.com/posts.json')
            .then(res => {
                if (res.data) {
                    const entries = Object.entries(res.data);
                    const data = [];
                    for (let e in entries) {
                        data.push({
                            id: entries[e][0],
                            title: entries[e][1].title,
                            author: entries[e][1].author,
                            description: entries[e][1].description,
                            image: entries[e][1].image,
                            date: entries[e][1].date,
                            claps: entries[e][1].claps,
                            views: entries[e][1].views
                        })
                    }
                    setPosts(data);
                }
            })
    }, [])

    return (
        <Authcontext.Provider value={{ posts: posts }}>
            <Blogpagenav />
            <div style={sectionStyles}>
                <Featured />
                <Latest />
            </div>
        </Authcontext.Provider>
    )
}

export default Blogpage;