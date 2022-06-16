/* Global variable */
let readyToPlay = true;

/* Global functions */
const setReadyToPlay = (x) => {
    readyToPlay = x;
}
const getReadyToPlay = () => {
    return readyToPlay;
}


/* Parent Class */
class Game{
    constructor(name){
        this.name = name;
        this.reset(); 
    }
    
    init(){
        this.#setTitle();
    }
    
    /* ENCAPSULATION => Private method */
    #setTitle() {
        document.getElementById("title").innerHTML= this.name;
    }

    /* Execute when reset button is clicked. For default Game, reset is page Reload.
       This mehtod will be override in the specific game. */
    reset(){
        document.getElementById("reset").addEventListener("click", () => {
            location.reload();
        });
    }
}

// /* Make Sub Class => POLYMORPHISM */
// const vsComputer = Base => class extends Base {
//     constructor() {
//         super();
//         if(this.constructor === vsComputer ) {
//             throw error; /* to make vsComputer as an Abstrac Class => ABSTRACTION */
//         }
//     }
//     getRandomAnswer(){
//         let result = Math.floor(Math.random() * this.com_choices.length);
        
//         /* check if random method is not as expected */
//         if((result >= this.com_choices.length) || (result <0)){
//             new Error("Random Answer Failed");
//         }
//         return result
//     }

// }

class RockPaperScissors extends Game {
    constructor(player_picked, com_picked){
        super();
        this.player_picked = player_picked;
        this.com_picked = com_picked;
        this.com_choices = ["com_rock", "com_paper", "com_scissors"];
        this.init = new Game("ROCK PAPER SCISSORS");

        this.init.init(); /* init the game -> writing the title -> method in parent class */
        this.strPlay(); /* the main of method from this game!! */
    }

    strPlay(){
        /* checking button Player 1 clicked */
        const choices = document.getElementsByClassName("choice");
        for (let i = 0; i < choices.length; i++) {
            choices[i].addEventListener("click", () => {
                /* checking is player already click */
                if (getReadyToPlay() === false) {
                    return; /* do nothing */
                }

                this.player_picked = i;  /* Get Player Picked: from choices array */
                // this.com_picked = this.getRandomAnswer(); /* Get Computer Picked: Returns a random integer from 0 to 2 */
                this.setBackground(choices[i]); 
                // this.whoWin();

                /* Preventing player clicking twice */
                if (getReadyToPlay() === true) {
                    setReadyToPlay(false);
                }
            })
        }
    } 
    
    setBackground(player_choices){
        player_choices.style.backgroundColor = "#C4C4C4"; /* set background for player side when it clicked */
        for (let i = 0; i < this.com_choices.length; i++) { /* set background for computer side when it clicked */
            this.com_picked === i ? document.getElementById(this.com_choices[i]).style.backgroundColor = "#C4C4C4" : "";
        }
    }

    // whoWin(){
    //     let winner = "Draw";
    //     if(this.player_picked === this.com_picked){
    //         winner = "Draw"
    //     } else if((this.player_picked === this.com_picked-1) || ((this.player_picked === 2) && (this.com_picked == 0)) ){
    //         winner = "Computer Win";
    //     } else {
    //         winner = "Player Win";
    //     }

    //     /* write winner for the result */
    //     document.getElementById('answer').innerHTML = winner;
    //     /* Set result background color to green */
    //     document.querySelector(".game-result").style.backgroundColor = "#4C9654";
    // }

    /* OVERRIDING -> INHERITANCE */
    reset() {
        /* Execute when reset button is clicked. */
        document.getElementById("reset").addEventListener("click", () => {      
        for (let i = 0; i < this.com_choices.length; i++) {
            document.getElementById(this.com_choices[i]).style.backgroundColor = "transparent";
        }
        document.querySelector(".game-result").style.backgroundColor = "transparent";
        answer.innerHTML = "<h1>VS</h1>";
        setReadyToPlay(true); /* making player can play again */
        });
    }   
}


const play = new RockPaperScissors();





