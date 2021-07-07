const Note = require('../models/noteModel');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const { title, body } = req.body;

        const newNote = new Note({
            title: title,
            body: body,
            dateCreated: new Date().toLocaleDateString()
        })

        const savedNote = await newNote.save();

        res.json(savedNote)

    } catch(err) {
        console.error(err)
        res.status(500).send();
    }
})

module.exports = router