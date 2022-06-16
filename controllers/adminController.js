const { User_game, User_game_biodata, User_game_history } = require('../models')

User_game.User_game_biodata = User_game.hasOne(User_game_biodata, {foreignKey: 'user_id', as: "biodata"});
User_game.User_game_history = User_game.hasMany(User_game_history, {foreignKey: 'user_id', as: "history"});

module.exports = {
    index : async (req, res) => {
        User_game.findAll().then(users => {
            res.render("admin/dashboard", { users: users })
        });
    },

    details : async (req, res) => {
        User_game.findAll().then(users => {
            User_game.findOne({
                include: [
                    {
                        model: User_game_biodata,
                        attributes: ["description", "address", "age"],
                        as: "biodata",
                        required: false
                    },
                    {
                        model: User_game_history,
                        attributes: ["game_name", "score"],
                        as: "history",
                        required: false
                    },
                ],
                where: { id : req.params.id }}).then(user => {
                res.render("admin/show", { users: users, user: user})
            });
        });
    },
    
    add : async (req, res) => {
        await User_game.create({
                username: req.body.username,
                password: req.body.password,
                fullname: req.body.fullname,
                approved: true
        })
            User_game.max('id').then(id =>{
                User_game_biodata.create({
                    user_id : id,
                    description : "",
                    address : "",
                    approved: true
                })
                // add dummy history
                User_game_history.create({
                    user_id : id,
                    game_name : "Rock Paper Scissors",
                    score: 100,
                    approved: true
                })
    
                User_game_history.create({
                    user_id : id,
                    game_name : "Rock Paper Scissors",
                    score: 90,
                    approved: true
                })
            })
        res.redirect('/admin');
    },

    editView : async (req, res) => {
        User_game.findAll().then(users => {
            User_game.findOne({
                include: [
                    {
                        model: User_game_biodata,
                        attributes: ["description", "address", "age"],
                        as: "biodata",
                        required: false
                    }
                ],
                where: {id : req.params.id }}).then(user => {
                res.render("admin/edit", { users: users, user: user})
            });
        });
    },

    edit : async (req, res) => {
        User_game.update(
            {
                username: req.body.username,
                password: req.body.password,
                fullname: req.body.fullname,
            },
            { 
                where: { id: req.params.id },
            }
        ).then(
        User_game_biodata.update(
            {
                description: req.body.description,
                age: req.body.age,
                address: req.body.address,
            },
            { 
                where: { user_id: req.params.id },
            }
        ).then(
            res.redirect('/admin')
        ))
    },

    delete : async (req, res) => {
        User_game.destroy({ where: {id: req.params.id }})
        User_game_biodata.destroy({ where: {user_id: req.params.id }})
        User_game_history.destroy({ where: {user_id: req.params.id }})
        .then(
            res.redirect('/admin')
        )
    }

}