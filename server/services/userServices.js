const User = require("../models/userModel");

const doesUserExist = async (email) => {
  const count = await User.countDocuments({ email });
  return count > 0;
};

const isUsernameAvailable = async (username) => {
  const count = await User.countDocuments({ username });
  return count > 0;
};

const generatedUniqueUsername = (email) => {
  let generatedUsername = "";

  return generatedUsername;
};



const createNewUser = async () => {
  return 
}
 
module.exports = {
  doesUserExist,
  isUsernameAvailable,
  generatedUniqueUsername,
  createNewUser
};
