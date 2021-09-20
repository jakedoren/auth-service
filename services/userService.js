const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (userInfo) => {
    const { password, email} = userInfo
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt)

    const existingUser = await User.findOne({email: email})

    if(existingUser) {
        return res.status(400).json({
            errorMessage: "An account with this email already exists"
        })
    }

    const newUser = new User({
        email, passwordHash
    })

    const savedUser = await newUser.save();

    const token = jwt.sign({
        user: savedUser._id
    }, process.env.JWT_SECRET)
    
    return token
}