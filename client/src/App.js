import './App.css';
import React, { useState, useEffect } from "react";
import { useDispatch} from 'react-redux';
import { asyncGetPosts } from './features/posts/PostsSlice';

import Header from './components/header/Header';
import CreateForm from './components/createForm/CreateForm';
import Posts from './components/posts/posts';
import SideBar from './components/sideBar/sideBar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
      <SideBar setCurrentPostID={setCurrentPostID}/>
      <div className='row'>
        <div className='row g-3'>
          <div className='col-md-8'>
            <Posts setCurrentPostID={setCurrentPostID}/>
          </div>
          <div className='col-md-4'>
            <CreateForm currentPostID={currentPostID} setCurrentPostID={setCurrentPostID}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

