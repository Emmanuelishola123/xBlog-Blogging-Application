// User Controllers
const {
    authenticate2FA,
    checkUsername,
    disable2FA,
    enable2FA,
    followUser,
    getAllUsers,
    getUerDetailsById,
    getUerDetailsByUsername,
    getUerDetailsTokenless,
    resendVerificationToken,
    unfollowUser,
    updateEmail,
    updatePassword,
    updateProfile,
    updateUsername,
    verifyUserAccount,
    update2FA
} = require('./userControllers')


// Auth Controllers
const {
    forgotPassword,
    loginUser,
    registerUser,
    resetPassword,
} = require('./authControllers')


const {
    addCommentToPost,
    deleteComment,
    reactToComment
} = require('./commentControllers')


const {
    createNewPost,
    deletePost,
    getHomePosts,
    getSinglePost,
    getUserPosts,
    updatePost
} = require('./postControllers')


const {
    searchAll,
    searchForComment,
    searchForPost,
    searchForUser
} = require('./searchControllers')


const {
    uploadFile,
    uploadMultipleFiles
} = require('./uploadControllers')





module.exports = {
    // 
    getUerDetailsById,
    getUerDetailsByUsername,
    getUerDetailsTokenless,
    getAllUsers,
    updateEmail,
    updateProfile,
    updatePassword,
    updateUsername,
    checkUsername,
    followUser,
    unfollowUser,
    authenticate2FA,
    update2FA,
    enable2FA,
    disable2FA,
    verifyUserAccount,
    resendVerificationToken,
    // 
    forgotPassword,
    loginUser,
    registerUser,
    resetPassword,
    // 
    addCommentToPost,
    deleteComment,
    reactToComment,
    // 
    createNewPost,
    deletePost,
    getHomePosts,
    getSinglePost,
    getUserPosts,
    updatePost,
    // 
    searchAll,
    searchForComment,
    searchForPost,
    searchForUser,
    // 
    uploadFile,
    uploadMultipleFiles
}