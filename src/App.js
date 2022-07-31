import './App.css';
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { asyncGetPosts } from './features/posts/PostsSlice';

import Header from './components/header/Header';
import CreateForm from './components/createForm/CreateForm';
import Posts from './components/posts/posts';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)


function App() {
  const [currentPostID, setCurrentPostID] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetPosts());
  }, []);

  return (
    <div className="App">
      <Header/>
        <CreateForm currentPostID={currentPostID} setCurrentPostID={setCurrentPostID}/>
        <Posts setCurrentPostID={setCurrentPostID}/>
    </div>
  );
}

export default App;
