// GENERAL DECLARATIONS
// ------------------------------------------
// Get Game Area
const gameArea = document.getElementById("game");

// Create Playable Character
let player = document.createElement("div");
// add id - player
player.setAttribute("id", "player")
// add player to game area
gameArea.append(player);

// Set characteristics
// how far the player will move with each keypress
const moveBy = 30;

// PLAYER MOVEMENT
// --------------------------------------------
// add event listener to documnet to listen for move left/right
document.addEventListener("keydown", (e) => {

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

function playerDirection(direction){
    // get current player position as integer
    let playerPos = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
    // if the player chose to move left
    if (direction == "left"){
        // change player position to move to the left
        player.style.left = `${playerPos - moveBy}px`
    }

    // if the player chose to move right
    else if (direction == "right"){
        // change player position to move to the right
        player.style.left = `${playerPos + moveBy}px`
    }
}

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
    }, 400)
}

