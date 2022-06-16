const express = require("express");
const router = express();
const apiController = require('../controllers/apiController');
const restrictjwt = require('../middlewares/restrictjwt')

// Landing page
router.get('/', apiController.landingPage);

// Login Page
router.post('/login', apiController.login);
router.get('/whoami', restrictjwt, apiController.whoami);

router.get('/rps/create-room', apiController.createRoom);
router.get('/rps/:id', apiController.rockPaperScissorsView);
router.post('/rps/:id', apiController.gameRps);

module.exports = router;