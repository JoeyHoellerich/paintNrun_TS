// GENERAL DECLARATIONS
// ------------------------------------------
// Get Game Area
const gameArea = document.getElementById("game");

// Set characteristics
// Game Area Size
// width of the area is 600 px
const gameWidth = 600;

// Player Size
// width of player is 50px
const playerWidth = 50;

// Movement Characteristics
// how far the player will move with each keypress
const moveBy = 30;
// how long jump animation lasts (400ms)
const jumpTime = 400;

// CREATE GAME 
// --------------------------------------------
// run game on start - Replace later (testing)
runGame();

// function to run the game (run after hitting start)
function runGame(){
    createPlayer();
}

function createPlayer(){
    // Create Playable Character
    let player = document.createElement("div");
    // add id - player
    player.setAttribute("id", "player")
    // add player to game area
    gameArea.append(player);
}
// PLAYER MOVEMENT
// --------------------------------------------
// add event listener to documnet to listen for move left/right
window.addEventListener("keydown", (e) => {

    // if user presses either the right arrow or the d key - move right
    if (e.key === "ArrowRight" || e.key == "d") {
        console.log("right");
        playerDirection("right");
    }

    // if user presses either the left arrow or the a key - move left
    if (e.key === "ArrowLeft" || e.key == "a") {
        console.log("left");
        playerDirection("left");
    }
})

// separate event listener to listen for jumps
window.addEventListener("keydown", (e) => {
    // if user presses the spacebar, the arrow up or the w key - jump
    if (e.key === " " || e.key == "ArrowUp" || e.key == "w") {
        // run player jump function - makes player jump
        playerJump();
    }
})

// function to move player left or right
function playerDirection(direction){
    // get current player position as integer
    let playerPos = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
    // if the player chose to move left & the player is within the gameboard
    if (direction == "left" && playerPos > 0){
        // change player position to move to the left
        player.style.left = `${playerPos - moveBy}px`
    }

    // if the player chose to move right
    else if (direction == "right" && playerPos < (gameWidth-playerWidth-moveBy)){
        // change player position to move to the right
        player.style.left = `${playerPos + moveBy}px`
    }
}

// function to make player jump
function playerJump(){
    // check to see if player has jump class
    if (player.classList.contains("jump")){
        // don't let player jump if they are already airborne
        return
    }

    // add the jump class - runs jump animation (takes 400ms to play)
    player.classList.add("jump");
    // after jump animation finishes remove the jump class
    setTimeout(() => {
        player.classList.remove("jump");
    }, jumpTime)
}

