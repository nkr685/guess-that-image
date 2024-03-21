const { uploadEntities } = require('../services/uploadQuiz.js')

const uploadNewQuiz = async (req, res) => { // CALLED BY FRONTEND 
    response = await uploadEntities(req.body)
    return response
}

module.exports = {
    uploadNewQuiz
} 