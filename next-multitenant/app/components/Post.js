// components/PostList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, updatePost, deletePost } from '../slices/post';

const Post = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.post);
  const { posts = [], status = 'idle', error = null } = postsState || {};

  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    console.log("Posts State: ", postsState); // Add this line
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);
  

  const handleCreate = () => {
    if (newPost.title && newPost.content) {
      dispatch(createPost(newPost));
      setNewPost({ title: '', content: '' });
    } else {
      alert('Title and content are required.');
    }
  };

  const handleUpdate = () => {
    if (editPost) {
      dispatch(updatePost({ id: editPost._id, updatedPost: editPost }));
      setEditPost(null);
    }
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
     dispatch(fetchPosts());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editPost) {
      setEditPost({ ...editPost, [name]: value });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    if (posts.length === 0) {
      content = <div>No posts available.</div>;
    } else {
      content = (
        <ul>
          {posts.map((post) => (
            <li key={post._id}> {/* Ensure _id or a unique identifier */}
              <strong>{post.title}</strong>
              <p>{post.content}</p>
              <button onClick={() => setEditPost(post)}>Edit</button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </li>
          ))}
        </ul>
      );
    }
  } else if (status === 'failed') {
    content = <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {content}

      <div>
        <h3>{editPost ? 'Edit Post' : 'Create Post'}</h3>
        <input
          type="text"
          name="title"
          value={editPost ? editPost.title : newPost.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="name"
          value={editPost ? editPost.name : newPost.name}
          onChange={handleChange}
          placeholder="Tanent Name as (user)"
        />
        <textarea
          name="content"
          value={editPost ? editPost.content : newPost.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <button  onClick={editPost ? handleUpdate : handleCreate}>
          {editPost ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </div>
  );
};

export default Post;
