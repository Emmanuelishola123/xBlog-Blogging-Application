import { getCookie } from "../../utils/cookie";
import api from "../api";

const token = getCookie("userToken");

/**
 * Get user details by username
 *
 * @param {*} username
 * @returns
 */
export const userProfileByUsername = async (username) => {
  const { data } = await api(token).get(`/user/username/${username}`);
  return data.data;
};

/**
 * Get user details by username without token passed
 *
 * @param {*} username
 * @returns
 */
export const userProfileTokenless = async (username) => {
  const { data } = await api().get(`/user/username/tl/${username}`);
  return data.data;
};

/**
 * Update user basic info
 * @param {*} vlaues -> {}
 * @returns
 */
export const updateUserDetails = async (values) => {
  const { data } = await api().put(`/user/${values._id}`, {
    ...values,
    _id: undefined,
  });

  return data;
};

/**
 * Update user username
 * @param {*} vlaues -> {}
 * @returns
 */
export const updateUsername = async (values) => {
  const { data } = await api().put(`/user/username/${values._id}`, {
    ...values,
    _id: undefined,
  });

  return data;
};

/**
 * Update user email
 * @param {*} vlaues -> {}
 * @returns
 */
export const updateEmail = async (values) => {
  const { data } = await api().put(`/user/email/${values._id}`, {
    ...values,
    _id: undefined,
  });

  return data;
};

/**
 * Update user password
 * @param {*} vlaues -> {}
 * @returns
 */
export const updatePassword = async (values) => {
  const { data } = await api().put(`/user/password/${values._id}`, {
    ...values,
    _id: undefined,
  });

  return data;
};

/**
 * Follow user
 */
export const followUser = async (id) => {
  const data = await api(token).post("/user/follow-user", {
    following_id: id,
  });
  return data;
};

/**
 * Unfollow user
 */
export const unfollowUser = async (id) => {
  const data = await api(token).post("/user/unfollow-user", {
    following_id: id,
  });
  return data;
};
