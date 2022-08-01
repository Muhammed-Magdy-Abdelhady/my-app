import axios from 'axios';

const url = 'http://localhost:5000/posts';

// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const CreatePost = (newPost) => axios.post(`${url}/createPost`, newPost);
export const getPosts = () => axios.get(`${url}/getPosts`);
export const deletePost = (id) => axios.delete(`${url}/deletePost/${id}`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/updatePost/${id}`, updatedPost);