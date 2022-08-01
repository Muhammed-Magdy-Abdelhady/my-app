import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// import * as api from '../../api';
import './posts.css'

import { asyncDeletePost } from '../../features/posts/PostsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Posts = ({setCurrentPostID}) =>{
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
    // console.log(posts)
    

    return (
        <div className="posts-theme row">
            {posts && posts.map((post) => (
                <div key={post._id} className="post-theme col-md-5 mb-3">
                    <div className='post-info'>
                        <div className='img-container'>
                            <img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title}/>
                        </div>
                        <div className="post-title">
                            <h3>{post.title}</h3>
                        </div>
                        <div className="post-creator">
                            <p>{post.creator}</p>
                        </div>  
                        <div className="post-message">
                            <p>{post.message}</p>
                        </div>
                    </div>
                    <div className='post-footer-handler'>
                        <div className="post-tags">
                            <p>{post.tags.map((tag) => `#${tag} `)}</p>
                        </div>
                        <div className="btn-handler">
                            <button className="btn btn-secondary equal-btn-size" onClick={() => setCurrentPostID(post._id)}>
                                <FontAwesomeIcon icon="fa-solid fa-pen" /> Edit
                            </button>
                            <button className="btn btn-outline-danger equal-btn-size" onClick={() => dispatch(asyncDeletePost(post._id))}>
                                <FontAwesomeIcon icon="fa-solid fa-trash" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Posts;