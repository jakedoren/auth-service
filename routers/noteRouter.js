const router = require('express').Router()
const auth = require('../middleware/auth')
const { createNoteValidator } = require('../middleware/noteValidator')
const noteController = require('../controllers/noteController')

// Create note
router.post('/', auth, createNoteValidator, noteController.createNote)

// Get your notes
router.get('/', auth, noteController.getNote)

module.exports = router