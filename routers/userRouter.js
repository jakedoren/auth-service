const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userController = require('../controllers/userController')
const { registerValidator, loginValidator } = require('../middleware/userValidator')


// Register
router.post('/', registerValidator, userController.registerUser)

router.post('/login', loginValidator, userController.registerUser)

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
})

router.get('/loggedin', (req, res) => {
    try {
        const token = req.cookies.token;
        
        if(!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);

    } catch(err) {
        res.json(false);
    }
})

module.exports = router;