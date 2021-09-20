const Note = require('../models/Note');
const router = require('express').Router();
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    try {
        const { title, body } = req.body;

        const newNote = new Note({
            title: title,
            body: body,
            dateCreated: new Date().toLocaleDateString(),
            createdBy: req.user
        })

        const savedNote = await newNote.save();

        res.json(`The following note sucessfully created: ${savedNote}`)

    } catch(err) {
        console.error(err)
        res.status(500).send();
    }
});

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