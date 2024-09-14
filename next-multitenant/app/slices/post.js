// slices/post.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../services/post.service';
import axios from "axios";




// Async thunks
export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const response = await PostService.getAllPosts(); // Adjust method name if necessary
  return response.data;
});

 export const createPost = createAsyncThunk('post/createPost', async (newPost) => {
   const response = await PostService.createPost(newPost);
   return response.data;
 });

// const getAuthToken = () => localStorage.getItem('x-access-token');

// export const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
//   const response = await axios.post('/api/post', newPost, {
//     headers: { 'x-access-token': getAuthToken() },
//   });
//   return response.data;
// });

export const updatePost = createAsyncThunk('post/updatePost', async ({ id, updatedPost }) => {
  const response = await PostService.updatePost(id, updatedPost);
  return response.data;
});

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
  await PostService.deletePost(id);
  return id; // Return the id of the deleted post for removing it from the state
});

// Create slice
const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
