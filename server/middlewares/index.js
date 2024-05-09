const authenticate = require('./authenticate')

const {
    email,
    forget_password,
    login,
    register,
    reset_password,
    two_fa,
    update_password,
    update_profile,
    update_username,
    validate
} = require('./validator')


module.exports = {
    authenticate,
    email,
    forget_password,
    login,
    register,
    reset_password,
    two_fa,
    update_password,
    update_profile,
    update_username,
    validate
}