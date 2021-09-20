const userService = require('../services/userService')

exports.registerUser = async (req, res) => {
    const token = await userService.registerUser(req.body)
    res.cookie("token", token, { httpOnly: true }).send();
}