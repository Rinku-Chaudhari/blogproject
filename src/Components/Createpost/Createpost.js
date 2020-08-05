import React from 'react';
import { useState } from 'react';
import Axios from 'axios';


const styles = {
    width: '75%',
    margin: 'auto',
    paddingTop: '100px',
    paddingBottom: '60px'
}

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
}


const Createpost = () => {
    const [title, setTitle] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [content, setContent] = useState('');

    const updateTextArea = (e) => {
        setContent(e.target.value);
        const textarea = document.querySelector('textarea');
        textarea.style.height = textarea.scrollHeight;
    }

    const submitPost = (e) => {
        e.preventDefault();

        Axios.post('https://blogapp-85fe6.firebaseio.com/posts.json', {
            claps: 0,
            date: new Date(),
            description: content,
            image: imageURL,
            title: title,
            views: 0
        })
            .then(res => {
                alert('done!')
            })
            .catch(err => {
                alert(err.message);
            })
    }

    return (
        <div style={styles}>
            <form style={formStyles} onSubmit={submitPost}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder='Type title' style={{ marginTop: '20px' }} />
                <input type="text" value={imageURL} onChange={(e) => setimageURL(e.target.value)}
                    placeholder='type url image' style={{ marginTop: '20px' }} />
                <textarea value={content} onChange={updateTextArea}
                    placeholder='type content' style={{ marginTop: '20px' }}></textarea>
                <input type="submit" value="POST" />
            </form>
        </div>
    )
}


export default Createpost;