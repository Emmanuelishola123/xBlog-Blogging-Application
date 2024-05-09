import api from "../api";

/**
 * Search for Users
 *
 * @param {*} query
 * @returns
 */
export const searchAll = async (q, category = 'post', sortBy = '') => {
  const { data } = await api().get(`/search?q=${q}&category=${category}&sort-by=${sortBy}`);

  return data.data;
};

/**
 * Search for Users
 *
 * @param {*} query
 * @returns
 */
export const searchForUsers = async (q, s = undefined) => {
  const { data } = await api().get(`/search/user?q=${q}&sort-by=${s}`);

  return data.data;
};

/**
 * Search for Posts
 *
 * @param {*} query
 * @returns
 */
export const searchForPosts = async (q, c = undefined, s = undefined) => {
  const { data } = await api().get(
    `/search/post?q=${q}&category=${c}&sort-by=${s}`,
  );

  return data.data;
};

/**
 * Search for Comments
 *
 * @param {*} query
 * @returns
 */
export const searchForComments = async (q, c = undefined, s = undefined) => {
  const { data } = await api().get(
    `/search/comment?q=${q}&category=${c}&sort-by=${s}`,
  );

  return data.data;
};
