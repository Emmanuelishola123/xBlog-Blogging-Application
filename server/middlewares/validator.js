const { body, validationResult } = require("express-validator");
const response = require("../utils/response");

module.exports = {
  validate(values = []) {
    return async (req, res, next) => {
      await Promise.all(values.map((value) => value.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      let _errors = errors.array();
      let message = "Invalid parameters:";

      _errors.forEach((v) => {
        message += ` ${v.param}`;
      });

      response(req, res, 400, errors.array(), false, message);
    };
  },

  register: [
    body("name").isString().withMessage("Name cannot be empty"),
    body("email").isEmail().withMessage("Email address cannot be empty").trim(),
    body("password").isString().withMessage("Password cannot be empty"),
  ],

  login: [
    body("email").isEmail().withMessage("Email address cannot be empty").trim(),
    body("password").isString().withMessage("Password cannot be empty"),
  ],

  forget_password: [
    body("email").isEmail().withMessage("Email address cannot be empty").trim(),
  ],

  reset_password: [body("password").isString().trim()],

  email: [
    body("email").isEmail().trim().withMessage("Email address cannot be empty"),
  ],

  update_password: [
    body("password").isString().trim(),
  ],

  update_username: [
    body("username").isString().trim(),
  ],

  two_fa: [
    body("authToken").isString().trim(),
  ],

  update_profile: [
    body("name").isString().trim(),
    // body("bio").isString().trim(),
    // body("skills").isString().trim(),
    // body("learning").isString().trim(),
    // body("works").isString().trim(),
    // body("avatar").isString().trim(),
  ],
};
