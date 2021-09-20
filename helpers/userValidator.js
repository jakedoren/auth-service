const User = require('../models/User')

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