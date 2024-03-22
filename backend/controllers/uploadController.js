const { uploadEntities } = require('../services/uploadGame.js')

const uploadGame = async (req, res) => { // CALLED BY FRONTEND 
    response = await uploadEntities(req.body)
    return response
}

module.exports = {
    uploadGame
} 