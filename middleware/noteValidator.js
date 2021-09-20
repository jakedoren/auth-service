exports.createNoteValidator = async (req, res, next) => {
    try {
        const { title, body } = req.body
        if(!title || !body) return res.status(400).json({ errorMessage: "Please enter in a title and body"})
        next()    
    } catch(err) {
        console.log(err)
        return res.status(500).json({ errorMessage: "Internal server error "})
    }
}