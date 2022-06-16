var express = require('express');
var router = express.Router();
var db = require('../database/user.json');
const webController = require('../controllers/webController');
const restrict = require('../middlewares/restrict')

/* GET home page. */
router.get('/', webController.index);

/* Login */
router.get('/login', webController.loginView);
router.post('/login', webController.login);
router.get('/register', webController.registerView);
router.post('/register', webController.register);
router.get('/whoami', restrict, webController.whoami)


/* GAME ROCK PAPER SCISSORS. */
/* 1. view */
router.get('/rock-paper-scissors', restrict, webController.rockPaperScissorsView);
router.get('/create-room', restrict, webController.createRoom);



module.exports = router;
