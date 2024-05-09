const response = require("../utils/response");
const { verifyJWT } = require("../utils/jwt");

module.exports = (req, res, next) => {
  try {
    let auth = req.headers["authorization"]
      ? req.headers["authorization"]
      : req.headers["Authorization"];
    let token =
      auth && auth.split(" ").length === 2 ? auth.split(" ")[1] : null;

    if (token) {
      verifyJWT(req, res, next, token);
    } else {
      response(req, res, 401);
    }
  } catch (error) {
    response(req, res, 500, error);
  }
};
