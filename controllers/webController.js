const bcrypt = require('bcrypt');
var db = require('../database/user.json');
const { User_game, User_game_biodata, User_game_history, room_game } = require('../models')
const passport = require('../lib/passport');

module.exports = {
    index: async (req, res) => {
        res.render('index', { title: 'Binar Chapter 3 | Yusuf Ginanjar' } );
    },

    loginView: async (req, res) => {
        res.render('login', { title: 'Chapter 5 | Login', errorMessage : '' });
    },

    login: passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
    }),
    

        // var loginSuccess = false;  // init value for loginSuccess is false
        // for (let i = 0; i < db.length; i++) {
        //     if((req.body.username === db[i].username) && (req.body.password === db[i].password)){
        //         loginSuccess = true; // Set loginSuccess = true if user input correct username & password
        //     }
        // }
    
        // if(loginSuccess === true){
        //     res.status(200);
        //      res.redirect('/admin');
    
        // } else {
        //     res.status(401);
        //     res.render('login', { title: 'Login', errorMessage : 'Wrong username or password' });
        // }
    // },

    whoami: (req, res) => {
        /* req.user adalah instance dari User Model, hasil autentikasi dari passport. */
        console.log(req.User_game.dataValues);
        res.render('profile', User_game.dataValues) 
    },

    registerView: async (req, res) => {
        res.render('register', { title: 'Chapter 5 | Register', errorMessage : '' });
    },

    register: async (req, res) => {
        await User_game.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
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
        res.redirect('/login');
    },

    rockPaperScissorsView: async (req, res, next) => {
        res.render('game-rps', { title: 'CH4 : Game | Rock Paper Scissors' });
    },


    // from api
    createRoom: async (req, res) => {
        res.render('createroom');
    }



};