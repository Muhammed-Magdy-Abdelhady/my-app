import './CreateForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64'
import React, { useEffect, useState } from 'react'

import {
    asyncCreatePost,
    asyncUpdatePost
} from '../../features/posts/PostsSlice';

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`


const CreateForm = ({currentPostID, setCurrentPostID}) => {

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
        isLoading: false
    });



    const post = useSelector((state) => (currentPostID ? state.posts.posts.find((message) => message._id === currentPostID) : null));
    const dispatch = useDispatch();

    useEffect(() => {
            // this is the only way i thought of to add the className form-control to the input element of the filebase
            const container = document.getElementById('FileBase-container');
            container.children[0].classList.add('form-control');
            if (post) setPostData(post);
        }
        ,[post]
    );

    const save = () => {
        if (currentPostID === 0)
            dispatch(asyncCreatePost(postData));
        else{
            // console.log(postData);
            dispatch(asyncUpdatePost(postData));  
        }
        clear();
    }
    const clear = () => {
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
        setCurrentPostID(0);
    }


    return (
        <div className="CreateForm-theme">
            <h3 className="center-text">{currentPostID ? "Edit Post" : "Create Post" }</h3>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" placeholder="Leave a comment here" id="titleTextArea"
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                ></input>
                <label htmlFor="titleTextArea">Title</label>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" placeholder="Leave a comment here" id="messageTextArea"
                    style={{"height":"125px"}}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                ></textarea>
                <label htmlFor="messageTextArea">Message</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" placeholder="Leave a comment here" id="creatorTextArea"
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                ></input>
                <label htmlFor="creatorTextArea">Creator</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" placeholder="Leave a comment here" id="tagsTextArea"
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                ></input>
                <label htmlFor="tagsTextArea">Tags "Comma seprated"</label>
            </div>
            <div id='FileBase-container' className='mb-3'>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            </div>
            <div className="CreateForm-button-container input-group">
                <button className='btn btn-primary' onClick={save}><FontAwesomeIcon icon="fa-solid fa-check" /> Save</button>
                <button className='btn btn-secondary' onClick={clear}><FontAwesomeIcon icon="fa-solid fa-trash" /> Clear</button>
            </div>
        </div>
)};

export default CreateForm;