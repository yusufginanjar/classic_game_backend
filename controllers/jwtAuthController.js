const { User_game } = require('../models')


function format(user) {
    const { id, username } = user
    return {
     id,
     username,
     accessToken : User_game.generateToken()
    } }
module.exports = {

    login: async (req, res) => {
        User_game.authenticate (req.body)
            .then(user => {
            res.json(
            format(user)
        )
     })
    },
}