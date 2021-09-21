const noteService = require('../services/noteService')

/**
 * Create the users note.
 * @param {Object} req.body - The user's note they wish to create (title, body).
 * @param {Object} req.user - The hashed and salted document id of the logged in user.
 */
exports.createNote = async (req, res) => {
    const createdNote = await noteService.createNote(req.body, req.user)
    res.json(`The following note successfully created ${createdNote}`)
}

/**
 * Get the users notes.
 * @param {Object} req.user - The hashed and salted document id of the logged in user.
 */
exports.getNote = async (req, res) => {
    const yourNotes = await noteService.getNotes(req.user)
    res.json(yourNotes)
}