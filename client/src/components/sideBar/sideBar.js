import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './sideBar.css'

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const posts = useSelector((state) => state.posts.posts);

    return (
        <div>
            <div id='sidebar-opener' onClick={() => setIsOpen(!isOpen)} mode={isOpen?'active':'inactive'} >
                <FontAwesomeIcon icon='bars' />
            </div>
            <div className ={`wrapper ${isOpen?'active':'inactive'}`}>
                <nav id="sidebar">
                    <div class="sidebar-header">
                        <h3>All Posts</h3>
                        <hr/>
                    </div>


                    <ul class="list-unstyled components">
                        {/* <li>
                            <button className='btn btn-toggle align-items-center rounded collapsed' data-bs-toggle="collapse"
                                data-bs-target="#homeSubmenu" aria-expanded="false">

                            <FontAwesomeIcon icon="fa-solid fa-angle-right"/> Mode
                            
                            </button>
                            <ul class="collapse list-unstyled" id="homeSubmenu">
                                <li>
                                    <button className='btn btn-outline-secondary' data-bs-toggle="collapse" data-bs-target="#homeSubmenu"
                                    >
                                        edit
                                    </button>
                                </li>
                                <li>
                                    <button className='btn btn-outline-danger' data-bs-toggle="collapse" data-bs-target="#homeSubmenu"
                                    >
                                        delete
                                    </button>
                                </li>
                            </ul>
                        </li> */}
                       {posts && posts.map((post) => (
                            <li key={post._id}>
                                <span>
                                    {post.title}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div id="dismiss">
                        <button onClick={() => setIsOpen(!isOpen)} className='btn btn-primary' >
                        Close
                        </button>
                    </div>
                </nav>
            </div>
            <div className={`overlay ${isOpen?'active':'inactive'}`}/>
        </div>
    )
}

export default SideBar;

    