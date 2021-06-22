const router = require('express').Router();
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register
router.post('/', async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

    // Validation
    if(!email || !password || !passwordVerify)
        return res.status(400).json({errorMessage: "Please enter in all required fields"})
    
    if(password.length < 6)
        return res.status(400).json({
            errorMessage: "Please enter a password of at least 6 characters"
        })

    if(password !== passwordVerify)
        return res.status(400).json({
            errorMessage: "Passwords do not match"
        })
    // hash the password

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

    // sign the token

    const token = jwt.sign({
        user: savedUser._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true
    }).send();

    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
})

module.exports = router;