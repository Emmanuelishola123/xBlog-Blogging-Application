

/**
 *  Returns a number base on the connecion between the user users
 * @param {*} user_1
 * @param {*} user_2
 * @returns
 *  * return 0 if user_1 === user_2
 *  * return 1 if both users follow each other"
 *  * return 2 if user_1 follows user_2
 *  * return 3 if user_2 follows user_1
 *  * return 4 if both users are not following each other"
 */
module.exports = (user_1, user_2) => {
  if (user_1._id === user_2._id) return 0;
  else if (
    user_2.followers.includes(user_1._id) &&
    user_2.following.includes(user_1._id)
  ) {
    return 1;
  } else if (user_2.followers.includes(user_1._id)) {
    return 2;
  } else if (user_2.following.includes(user_1._id)) {
    return 3;
  } else return 4;
};
