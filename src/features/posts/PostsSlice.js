import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";


export const asyncCreatePost = createAsyncThunk(
    'post/asyncCreatePost',
    async (post, thunkAPI) => {
      try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const resp = await api.CreatePost(post);
        thunkAPI.dispatch(addPost(resp.data));
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
);

export const asyncDeletePost = createAsyncThunk(
    'post/asyncDeletePost',
    async (id, thunkAPI) => {
        try {
            const resp = await api.deletePost(id);
            thunkAPI.dispatch(deletePost(id));
            // console.log(resp.data)
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);


export const asyncGetPosts = createAsyncThunk(
    'post/asyncGetPosts',
    async (thunkAPI) => {
        try {
            const resp = await api.getPosts();
            // console.log("resp before", resp.data);
            // resp.data.forEach((post, idx) => {
            //     post._id = idx + 1;
            // });
            // console.log("resp", resp.data);
            return resp.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

export const asyncUpdatePost = createAsyncThunk(
    'post/asyncUpdatePost',
    async (post, thunkAPI) => {
        try {
            // console.log("update-post data", post);
            // console.log(post._id)
            // console.log(post)
            const resp = await api.updatePost(post._id,post);   
            thunkAPI.dispatch(updatePost(post));
            return resp.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

const initialState = {
    posts: [],
    isLoading: false,
}

export const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
            
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post._id === action.payload._id) {
                    return action.payload;
                }
                return post;
            }
            );
        }
    },
    extraReducers: {
        [asyncGetPosts.pending]: (state) => {
            state.isLoading = true;
        },
        [asyncGetPosts.fulfilled]: (state, action) => {
            // console.log(action);
            state.isLoading = false;
            state.posts = action.payload;
            // console.log(state);
            // console.log(action);
        },
        [asyncGetPosts.rejected]: (state, action) => {
            // console.log(action);
            state.isLoading = false;
        }
    }
});



export const {addPost, deletePost, updatePost} = PostsSlice.actions;



export default PostsSlice.reducer;