const router = require('express').Router();
const userController = require('../controllers/userController')
const { registerValidator, loginValidator, loggedInValidator } = require('../middleware/userValidator')


// Register
router.post('/', registerValidator, userController.registerUser)

// Login
router.post('/login', loginValidator, userController.registerUser)

// Logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).send();
})

// Determine if logged in
router.get('/loggedin', loggedInValidator, userController.getLoggedIn)


module.exports = router;