const userService = require('../services/userService')

exports.registerUser = async (req, res) => {
    const token = await userService.registerUser(req.body)
    res.cookie("token", token, { httpOnly: true }).send();
}

exports.loginUser = async (req, res) => {
    const token = userService.loginUser(req.body)
    res.cookie("token", token, { httpOnly: true }).send()
}

exports.getLoggedIn = async (req, res) => {
    res.json(true)
}