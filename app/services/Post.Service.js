import MainApiService from "./ApiService";
import { API_ROUTE } from "./ServiceEndPoints";

const getPosts = async () => {
  const response = await MainApiService.get(API_ROUTE.POSTS);
  return response;
};

const getPostsById = async (id) => {
  const response = await MainApiService.get(`${API_ROUTE.POSTS}/${id}`);
  return response;
};

const addPosts = async (data) => {
  const response = await MainApiService.post(API_ROUTE.POSTS, data);
  return response;
};

const editPosts = async (data, id) => {
  const response = await MainApiService.put(`${API_ROUTE.POSTS}/${id}`, data);
  return response;
};

const deletePosts = async (id) => {
  const response = await MainApiService.delete(`${API_ROUTE.POSTS}/${id}`);
  return response;
};

export { addPosts, deletePosts, editPosts, getPosts, getPostsById };
