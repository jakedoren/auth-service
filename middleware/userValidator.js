const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerValidator = async (req, res, next) => {
    try {
        const { email, password, passwordVerify } = req.body;
        // Validation
        if(!email || !password || !passwordVerify) return res.status(400).json({errorMessage: "Please enter in all required fields"})
        if(password.length < 6) return res.status(400).json({errorMessage: "Please enter a password of at least 6 characters"})
        if(password !== passwordVerify) return res.status(400).json({errorMessage: "Passwords do not match"})
        const existingUser = await User.findOne({email: email})
        if(existingUser) return res.status(400).json({ errorMessage: "An account with this email already exists" })
        next()
    } catch(err) {
        return res.status(500).json({ errorMessage: "Internal server error" })
    }
}

exports.loginValidator = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({ errorMessage: "Please enter in all required fields" })
        const existingUser = await User.findOne({ email: email })
        if(!existingUser) return res.status(401).json({ errorMessage: "Wrong email or password" })
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash)
        if(!passwordCorrect) return res.status(401).json({ errorMessage: "Wrong email or password" })
        next()
    } catch(err) {
        console.log(err)
        return res.status(500).json({ errorMessage: "Internal server error" })
    }
}

exports.loggedInValidator = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if(!token) return res.json(false);
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch(err) {
        res.json(false);
    }
}