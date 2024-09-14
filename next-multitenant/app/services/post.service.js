import axios from "axios";

const API_URL = "http://localhost:8080/api/post";

const getAllPosts = () => {
  return axios.get(API_URL+ "/all");
};

const createPost = (newPost) => {
  return axios.post(API_URL , newPost);
};

const updatePost = (id, updatedPost) => {
  console.log("API_URL:", API_URL);
  console.log("Post ID:", id);
  console.log("Update Data:", updatedPost);
  debugger
  return axios.put(`${API_URL}/${id}`, updatedPost)
  .then(response => console.log("Post updated:", response.data))
  .catch(error => console.error("Error updating post:", error));
};

const deletePost = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};

