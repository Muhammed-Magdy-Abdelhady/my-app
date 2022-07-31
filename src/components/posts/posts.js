import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// import * as api from '../../api';
import './posts.css'

import { asyncDeletePost } from '../../features/posts/PostsSlice';


const Posts = ({setCurrentPostID}) =>{
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
    // console.log(posts)

    return (
        <div className="Posts-theme">
            {posts && posts.map((post) => (
                <div key={post._id} className="post-theme">
                    <div className="post-title">
                        <h3>{post.title}</h3>
                    </div>
                    <div className="post-message">
                        <p>{post.message}</p>
                    </div>
                    <div className="post-creator">
                        <p>{post.creator}</p>
                    </div>
                    <div className="post-tags">
                        <p>{post.tags}</p>
                    </div>
                    <div className='btn-handler'>
                        <button onClick={() => setCurrentPostID(post._id)}>edit</button>
                        <button onClick={() => dispatch(asyncDeletePost(post._id))}>delete</button>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Posts;