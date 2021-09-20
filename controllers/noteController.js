const noteService = require('../services/noteService')

exports.createNote = async (req, res) => {
    const createdNote = await noteService.createNote(req.body, req.user)
    res.json(`The following note successfully created ${createdNote}`)
}