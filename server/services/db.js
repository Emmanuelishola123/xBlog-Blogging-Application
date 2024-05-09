const mongoose = require("mongoose");
const keys = require("../config");

const connection = () => {
  try {
    mongoose
      .connect(keys.MONGODB_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("DB Connected"))
      .catch((err) => console.error("DB Could not connect" + err));
  } catch (error) {
    console.log({ error });
    return error;
  }
};

module.exports = connection;
