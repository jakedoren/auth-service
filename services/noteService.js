const Note = require('../models/Note')

exports.createNote = async (noteInfo, user) => {
    const { title, body } = noteInfo
    const newNote = new Note({
        title: title, 
        body: body,
        dateCreated: new Date().toLocaleDateString(),
        createdBy: user
    })
    return await newNote.save()
}

exports.getNotes = async (user) => {
    return await Note.find({ createdBy: user})
}