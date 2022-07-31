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
            // this is the only way i thought of to add the class form-control to the input element of the filebase
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
            <input className='mb-3 form-control`' type="text" placeholder="Enter the post Title" value={postData.title} onChange={(e) => {setPostData({ ...postData, title: e.target.value })}}/>
            <input className='mb-3 form-control`' type="text" placeholder="Enter the post Message" value={postData.message} onChange={(e) => {setPostData({ ...postData, message: e.target.value })}}/>
            <input className='mb-3 form-control`' type="text" placeholder="Enter the post Creator" value={postData.creator} onChange={(e) => {setPostData({ ...postData, creator: e.target.value })}}/>
            <input className='mb-3 form-control`' type="text" placeholder="Enter the post Tags (comma separated)" value={postData.tags} onChange={(e) => {setPostData({ ...postData, tags: e.target.value.split(',') })}}/>
            <div id='FileBase-container' className='mb-3'><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
            <div className="CreateForm-button-container input-group">
                <button className='btn btn-primary' onClick={save}><FontAwesomeIcon icon="fa-solid fa-check" /> Save</button>
                <button className='btn btn-secondary' onClick={clear}><FontAwesomeIcon icon="fa-solid fa-trash" /> Clear</button>
            </div>
        </div>
)};

export default CreateForm;