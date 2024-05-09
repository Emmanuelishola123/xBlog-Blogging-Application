import { getCookie } from "../../utils/cookie";
import api from "../api";

const token = getCookie("userToken");

/**
 * Get one Post by Slug
 *
 * @param {*} page
 * @param {*} postsPerPage
 * @returns
 */
export const getHomePosts = async (page = 1, postsPerPage = 20) => {
  const { data } = await api().get(
    `/post?page=${page}&postsPerPage=${postsPerPage}`,
  );

  return data.data;
};

/**
 * Get posts by user
 *
 * @param {*} username
 * @returns
 */
export const getUserPosts = async (username) => {
  const { data } = await api().get(
    `/post/user/${username}`,
  );

  return data.data;
};

/**
 * Get one Post by Slug
 *
 * @param {*} postSlug
 * @returns
 */
export const getSinglePost = async (postSlug) => {
  const { data } = await api(token).get(`/post/${postSlug}`);

  return data.data;
};

/**
 * Create new Post
 *
 * @param {*} data
 * @returns
 */
export const createPost = async (post) => {
  const { data } = await api(token).post("/post", {
    ...post,
  });

  return data;
};

/**
 * Update Post
 *
 * @param {*} post
 * @returns
 */
export const updatePost = async (post) => {
  const { data } = await api(token).put(`/post/${post.slug}`, {
    ...post,
    slug: undefined,
  });

  return data.data;
};

/**
 * Delete Post
 *
 * @param {*} postSlug
 * @returns
 */
export const deletePost = async (postSlug) => {
  const { data } = await api(token).delete(`post/${postSlug}`);

  return data.data;
};


/**
 * Add comment to post
 * 
 * @param {*} comment 
 * @param {*} postSlug 
 * @returns 
 */
export const addCommentToPost = async (comment, postSlug) => {
  const { data } = await api(token).post(`comment/${postSlug}`, {
    comment,
  });

  return data;
};
