const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (userInfo) => {
    const { password, email} = userInfo
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
        email, passwordHash
    })

    const savedUser = await newUser.save();

    return jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET)

}

exports.loginUser = async (userInfo) => {
    return jwt.sign({ user: userInfo._id }, process.env.JWT_SECRET)
}