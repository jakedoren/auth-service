const router = require('express').Router()
const auth = require('../middleware/auth')
const { createNoteValidator } = require('../middleware/noteValidator')
const noteController = require('../controllers/noteController')

router.post('/', auth, createNoteValidator, noteController.createNote)

router.get('/', auth, noteController.getNote)

module.exports = router