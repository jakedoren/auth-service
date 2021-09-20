const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title : {
        type: String,
    },
    body : {
        type: String,
        required: true
    },
    dateCreated : {
        type: Date,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
})

const Note = mongoose.model('note', NoteSchema)

module.exports = Note;