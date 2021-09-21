const userService = require('../services/userService')

/**
 * Register the user.
 * @param {Object} req.body - The user's registration imformation (email, password, passwordVerify).
 * @param {string} token - Token is the hashed and salted document id of the newly registered user.
 */
exports.registerUser = async (req, res) => {
    const token = await userService.registerUser(req.body)
    res.cookie("token", token, { httpOnly: true }).send();
}

/**
 * Login the user.
 * @param {Object} req.body - The user's registration imformation (email, password).
 * @param {string} token - Token is the hashed and salted document id of the newly registered user.
 */
exports.loginUser = async (req, res) => {
    const token = userService.loginUser(req.body)
    res.cookie("token", token, { httpOnly: true }).send()
}

// Determing if user is logged in
exports.getLoggedIn = async (req, res) => {
    res.json(true)
}