const Note = require('../models/Note')
const router = require('express').Router()
const auth = require('../middleware/auth')
const { createNoteValidator } = require('../middleware/noteValidator')
const noteController = require('../controllers/noteController')

router.post('/', auth, createNoteValidator, noteController.createNote)

router.get('/', auth, async (req, res) => {
    try {
        const yourNotes = await Note.find({createdBy: req.user})
        res.json(yourNotes)
    } catch(err) {
        console.error(err)
        res.status(500).send();
    }
})


module.exports = router