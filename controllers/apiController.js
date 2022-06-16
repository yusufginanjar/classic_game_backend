var db = require('../database/user.json');
const { User_game, User_game_biodata, User_game_history, room_game } = require('../models')

module.exports = {
    landingPage: async (req, res) => {
        try {
            const hero = {
                title: "PLAY TRADITIONAL GAME",
                description: "Experience new traditional game play"
            }

            const games = {
                sectionTitle: "THE GAMES",
                sectionDesc: "What's so special?",
                games: {
                    rockPaperScissors :{
                        id : "1",
                        name : "Rock Paper Scissors",
                    }
                }
            }

            const features = {
                sectionTitle: "FEATURES",
                sectionDesc: "What's so special?",
                features: {
                    feature1: {
                        title: "TRADITIONAL GAMES",
                        desc: "if you miss your childhood, we provide many traditional games here"
                    },
                    feature2: {
                        title: "GAME SUIT",
                        desc: ""
                    },
                    feature3: {
                        title: "TBD",
                        desc: ""
                    },
                }
            }

            const requirements = {
                sectionTitle: "SYSTEM REQUIREMENTS",
                sectionDesc: "Can My Computer Run this game?",
                os: "Windows 7 64-bit only (No OSZ support at this time)",
                processor: "Intel Core 2 Duo @2.4 GHZ or AMD Athlon X2 @2.8 GHZ",
                memory: "4 GB RAM",
                storage: "8 GB available space",
                ghraphic: "NVIDIA GeForce GTX 660 2GB or AMD Redeon HD 7850 2GB DirectX11 (Shader Model 5)",
            }

            const topScores = {
                sectionTitle: "TOP SCORES",
                sectionDesc: "This top score from various games provided on this polatform",
                topscore1: {
                    name: "Evan Lathi",
                    occupation: "PC Gamer",
                    desc: "One of my gaming highlights of the year.",
                    date: "June 18, 2021",
                },
                topscore2: {
                    name: "Jada Grifin",
                    occupation: "Nerdreator",
                    desc: "Then next big thing in the world of streaming and survival games.",
                    date: "July 10, 2021",
                },
                topscore3: {
                    name: "Aaron Williams",
                    occupation: "Uproxx",
                    desc: "Snoop Dogg Playing The Wildly Entertaining 'SOS' Is Ridiculous.",
                    date: "December 24, 2018",
                }
            }

            const subscribe = {
                sectionTitle: "NEWSLETTER SUBSCRIBE",
                sectionDesc: "In order to start receiving our news, all you have to do is enter your email address. Everything else will be taken care of by us. We will send you emails containing information about game. We don't spam",
            }

            res.status(200).json({
                hero,
                games,
                features,
                requirements,
                topScores,
                subscribe
            })
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },


    login: (req, res) => {
        User_game.authenticate (req.body)
            .then(user => {
                res.json(
                format(user)
            )
        })
    },

    whoami: (req, res) => {
        const currentUser = req.user;
        res.json(currentUser)
    },

    rockPaperScissorsView: async (req, res, next) => {
        res.render('game-rps-api', { title: 'CH4 : Game | Rock Paper Scissors', token: req.params.id });
    },

    gameRps: async (req, res) => {
        const id = req.params.id;
        const dataplayer1 = req.body.player1;
        const dataplayer2 = req.body.player2;
        const room = await room_game.findOne({ where: {room_code: id} });
        if( room == null ){
            console.log("masuk");
            try {
                await room_game.create({
                    room_code: id,
                    game_name: "Rock Paper Scissors",
                    approved: true
                })
                res.redirect(id);
            } catch (error) {
                res.json({ message: "Error!!"})
            }
        }

        await room_game.findOne({
            where: {room_code : id },
            order: [
                ['createdAt', 'DESC']
              ],
            })
            .then( async room => {
                if( dataplayer1 !== undefined ) {
                    try {
                        await room_game.update({ 
                            player_1_pick : dataplayer1,
                            player_1 : req.body.user_id
                        },
                        { where : { id : room.id }}); 
                    } catch (error) {
                        res.json({ message: "Error lagi!!"})
                    } 
                } else if (dataplayer2 !== undefined) {
                    try {
                        await room_game.update({ 
                            player_2_pick : dataplayer2,
                            player_2 : req.body.user_id
                        },
                        { where : { id : room.id }}); 
                    } catch (error) {
                        res.json({ message: "Error lagi 2!!"})
                    } 
                }


                if( (room.player_1_pick !== null) && (room.player_2_pick !== null) ) {
                    try {
                        const win = getWinner(room.player_1_pick, room.player_2_pick);
                        await room_game.update({ 
                            winner : win,
                            player_2 : req.body.user_id
                        },
                        { where : { id : room.id }}); 
                    } catch (error) {
                        res.json({ message: "Error lagi 3!!"})
                    } 
                }

                if(room.winner == null) room.winner = "";

                res.redirect(`${id}?winner=${room.winner}`);
                res.status(200)
            }
        );
    },


    // from api
    createRoom: async (req, res) => {
        let room = generateRoom();
        res.status(200)
        res.json({ 
            message: "Room Berhasi Dibuat, silakan akses http://localhost:3000/api/v1/rps/{-Room Code-}",
            RoomCode: room,
            note: "Ajak 1 lawan bermain anda untuk mengakses url yang sama"
        });
    },
}


function generateRoom() {
    return Math.floor(100000 + Math.random() * 900000);
}

function getWinner(player1, player2){
    if (player1 == player2) return "DRAW";
    if ((player1 == "R") && (player2 == "P")) return "P2"
    if ((player1 == "R") && (player2 == "S")) return "P1"
    if ((player1 == "P") && (player2 == "R")) return "P1"
    if ((player1 == "P") && (player2 == "S")) return "P2"
    if ((player1 == "S") && (player2 == "R")) return "P2"
    if ((player1 == "S") && (player2 == "P")) return "P1"

    if ((player2 == "R") && (player1 == "P")) return "P1"
    if ((player2 == "R") && (player1 == "S")) return "P2"
    if ((player2 == "P") && (player1 == "R")) return "P2"
    if ((player2 == "P") && (player1 == "S")) return "P1"
    if ((player2 == "S") && (player1 == "R")) return "P1"
    if ((player2 == "S") && (player1 == "P")) return "P2"

    return "Error"
}


function format(user) {
    const { id, username } = user
        return {
        id,
        username,
        accessToken : user.generateToken()
    }
}