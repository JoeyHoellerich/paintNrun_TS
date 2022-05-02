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

// PAINT SELECTORS 
// -------------------------------------------------------
// create array of paint colors to be used to referece selected paint - could change later
const paintColorArray = ["#edadc7", "#00c2d1", "#77E6AB", "#f24236"];

// grab paint selectors from DOM
const paint1 = document.getElementById("paint1");
const paint2 = document.getElementById("paint2");
const paint3 = document.getElementById("paint3");
const paint4 = document.getElementById("paint4");

// create array of the DOM object to make it easier to add event Listeners
const paintSelectors = [paint1, paint2, paint3, paint4];

// for each paint selector
paintSelectors.forEach((item) => {
    // add a click event listener to add "onSelect" class when clicked
    item.addEventListener("click", (e) => {
        // check to see if button is already selected
        if (!e.target.classList.contains("onSelect")){
            // remove the onSelect Class from all paint Selectors
            removeSelectors();
            // add onSelect class to the selected paint color
            e.target.classList.add("onSelect");
            setBackgroundClick(e.target.id)
        }
    })
})

// event listener to listen for background color switching keystrokes
window.addEventListener("keydown", (e) => {
    // if user presses J, K, L, or ;
    if (e.key === "j" || e.key === "k" || e.key === "l" || e.key === ";") {
        // if background color switching keys are pressed run function to set the background color
        setBackgroundKey(e.key);
    }
})

// function to unhighlight all paint selectors (used before switching to new color)
function removeSelectors(){
    // remove the onSelect Class from all paint Selectors
    paintSelectors.forEach((paint) => {
        paint.classList.remove("onSelect")
    })
}

// function for setting background color of game area after clikcing on the paint selector
function setBackgroundClick(targetID){
    // get paintColor from paint Color Array based on selected paint selector
    let paintColor = paintColorArray[parseInt(targetID[targetID.length - 1]) - 1]
    // set the background color of the game area to match selected color
    gameArea.style.backgroundColor = paintColor;
}

// function to set the background when user presses J, K, L, ;
function setBackgroundKey(key){
    // if J is pressed set color to 1st color on pallet
    if (key == "j"){
        removeSelectors()
        paint1.classList.add("onSelect")
        gameArea.style.backgroundColor = paintColorArray[0];
    }
    // if K is pressed set color to 2nd color on pallet
    else if (key == "k"){
        removeSelectors()
        paint2.classList.add("onSelect")
        gameArea.style.backgroundColor = paintColorArray[1];
    }
    // if L is pressed set color to 3rd color on pallet
    else if (key == "l"){
        removeSelectors()
        paint3.classList.add("onSelect")
        gameArea.style.backgroundColor = paintColorArray[2];
    }
    // if ; is pressed set color to 4th color on pallet
    else if (key == ";"){
        removeSelectors()
        paint4.classList.add("onSelect")
        gameArea.style.backgroundColor = paintColorArray[3];
    }
}
// PLAYER MOVEMENT
// --------------------------------------------
// add event listener to documnet to listen for move left/right
window.addEventListener("keydown", (e) => {

    // if user presses either the right arrow or the d key - move right
    if (e.key === "ArrowRight" || e.key == "d") {
        playerDirection("right");
    }

    // if user presses either the left arrow or the a key - move left
    if (e.key === "ArrowLeft" || e.key == "a") {
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

