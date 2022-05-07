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
// player top postion while grounded
const playerTopGrounded = 150;
// is the player alive - default is true
let isAlive = true;

// Movement Characteristics
// how far the player will move with each keypress
const moveBy = 30;
// how long jump animation lasts (400ms)
const jumpTime = 400;

// Tile Characteristics
// tile container (global to access from functions)
let tileContainer;
// width of tile (+ border)
const tileWidth = 50+3;
// time it takes for a tile to move from right to left
const tileMoveTime = 2000;
// distance to the left of game area that tile will end (end of animation)
const tileEndDistance = 60;
// total distance tile will move per animation
const tileMoveDistance = gameWidth + tileEndDistance
// tile speed (in px/millisecond)
const tileSpeed = tileMoveDistance/tileMoveTime;
// tile switch speed (time it takes to switch the type of tile generated in milliseconds)
const tileSwitchSpeed = 2000;
// holds the tile generator setInterval 
var tileGenerator;
var tileRemover; 
var tileCollisionChecker;

// Retry Button
const retryButtonWidth = 300;

// CREATE GAME 
// --------------------------------------------
// run game on start - Replace later (testing)
runGame();

// function to run the game (run after hitting start)
function runGame(){
    // creates new player element
    createPlayer();
    // creates box to hold tiles
    createTileContainer();
    // generates tiles while game is running
    tileGenerator = setInterval(createTile, tileWidth/tileSpeed);
    // removes tiles as they move beyond the screen
    tileRemover = setInterval(removeTile, tileMoveTime);
    // check to see if user is colliding with tile every 1 millisecond
    tileCollisionChecker = setInterval(tileCollisionCheck, 1);
}

function createPlayer(){
    // Create Playable Character
    let player = document.createElement("div");
    // add id - player
    player.setAttribute("id", "player")
    // add player to game area
    gameArea.append(player);
}

function createTileContainer() {
    tileContainer = document.createElement("div");
    tileContainer.setAttribute("id", "tiles");
    let refereceNode = document.getElementById("paintContainer");
    document.body.insertBefore(tileContainer, refereceNode);
}

// PAINT SELECTORS 
// -------------------------------------------------------
// create array of paint colors to be used to referece selected paint - could change later
const paintColorArray = ["rgb(237, 173, 199)", "rgb(0, 194, 209)", "rgb(119, 230, 171)", "rgb(242, 66, 54)"];

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
    // unfill any filled tiles
    tileUnfiller()
    // fill tiles to match background
    tileFiller(paintColor);
}

// function to set the background when user presses J, K, L, ;
function setBackgroundKey(key){
    // if J is pressed set color to 1st color on pallet
    if (key == "j"){
        // if the paint is already selected, do nothing
        if (paint1.classList.contains("onSelect")){
            return
        }
        // remove any selected button
        removeSelectors()
        // select the first paint button
        paint1.classList.add("onSelect")
        // change background color to match selected paint
        gameArea.style.backgroundColor = paintColorArray[0];
        // unfill any filled tiles
        tileUnfiller()
        // fill tiles to match background
        tileFiller(paintColorArray[0]);
    }
    // if K is pressed set color to 2nd color on pallet
    else if (key == "k"){
        // if the paint is already selected, do nothing
        if (paint2.classList.contains("onSelect")){
            return
        }
        // remove any selected button
        removeSelectors()
        paint2.classList.add("onSelect")
        gameArea.style.backgroundColor = paintColorArray[1];
        // unfill any filled tiles
        tileUnfiller()
        // fill tiles to match background
        tileFiller(paintColorArray[1]);
    }
    // if L is pressed set color to 3rd color on pallet
    else if (key == "l"){
        // if the paint is already selected, do nothing
        if (paint3.classList.contains("onSelect")){
            return
        }
        // remove any selected button
        removeSelectors()
        paint3.classList.add("onSelect")
        gameArea.style.backgroundColor = paintColorArray[2];
        // unfill any filled tiles
        tileUnfiller()
        // fill tiles to match background
        tileFiller(paintColorArray[2]);
    }
    // if ; is pressed set color to 4th color on pallet
    else if (key == ";"){
        // if the paint is already selected, do nothing
        if (paint4.classList.contains("onSelect")){
            return
        }
        // remove any selected button
        removeSelectors()
        paint4.classList.add("onSelect")
        gameArea.style.backgroundColor = paintColorArray[3];
        // unfill any filled tiles
        tileUnfiller()
        // fill tiles to match background
        tileFiller(paintColorArray[3]);
    }
}
// PLAYER MOVEMENT
// --------------------------------------------
// add event listener to documnet to listen for move left/right
window.addEventListener("keydown", (e) => {
    // don't let player move if they aren't alive
    if (!isAlive){
        return
    }

    // if user presses either the right arrow or the d key - move right
    else if (e.key === "ArrowRight" || e.key == "d") {
        playerDirection("right");
    }

    // if user presses either the left arrow or the a key - move left
    else if (e.key === "ArrowLeft" || e.key == "a") {
        playerDirection("left");
    }
})

// separate event listener to listen for jumps
window.addEventListener("keydown", (e) => {
    // don't let player jump is they aren't alive
    if (!isAlive){
        return
    }
    // if user presses the spacebar, the arrow up or the w key - jump
    else if (e.key === " " || e.key == "ArrowUp" || e.key == "w") {
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

// TILE GENERATION
// array of potential tile types
const tileTypes = ["standard", "paint1", "paint2", "paint3", "paint4"];
// set's defualt tile type to "standard"
let currentTile = "standard";
// generates new tile that will move across game area
function createTile(){
    // creates new tile div
    let newTile = document.createElement("div");
    // gives new tile the base class tile (basic characteristics of all tiles)
    newTile.classList.add("tile");
    // REPLACE! standard tile styles
    addTileClass(newTile);
    // give new tile the class to move the tile from right to left
    newTile.classList.add("moveTile");
    // add tile to page 
    tileContainer.append(newTile);
}

// removes tile after it moves across the board
function removeTile(){
    // get the oldest tile from the collection of tiles
    let addedTile = document.getElementById("tiles").firstChild
    // makes sure there is a tile available to remove
    if (addedTile != null){
        // remove the tile after the "tileMoveTime" - Time it takes for tile to travel across game area
        addedTile.remove()  
    }
}

// function to add the correct class to the generated tile 
function addTileClass(tile){
    // checks current tile that is spawning
    if (currentTile == "standard"){
        // adds correct tile class
        tile.classList.add("tile0")
    }

    // checks current tile spawning
    else if(currentTile == "paint1"){
        // checks to see if the background color matches spawining tile
        if (gameArea.style.backgroundColor == paintColorArray[0]){
            // adds filled class if match
            tile.classList.add("tile1-filled")
        }
        else {
            // adds unfilled class if no match
            tile.classList.add("tile1-unfilled");
        }
    }

    // checks current tile spawning
    else if (currentTile == "paint2"){
        // checks to see if the background color matches spawining tile
        if (gameArea.style.backgroundColor == paintColorArray[1]){
            // adds filled class if match
            tile.classList.add("tile2-filled")
        }
        else {
            // adds unfilled class if no match
            tile.classList.add("tile2-unfilled");
        }
    }

    // checks current tile spawning
    else if (currentTile == "paint3"){
        // checks to see if the background color matches spawining tile
        if (gameArea.style.backgroundColor == paintColorArray[2]){
            // adds filled class if match
            tile.classList.add("tile3-filled")
        }
        else {
            // adds unfilled class if no match
            tile.classList.add("tile3-unfilled");
        }
    }

    // checks current tile spawning
    else if (currentTile == "paint4"){
        // checks to see if the background color matches spawining tile
        if (gameArea.style.backgroundColor == paintColorArray[3]){
            // adds filled class if match
            tile.classList.add("tile4-filled")
        }
        else {
            // adds unfilled class if no match
            tile.classList.add("tile4-unfilled");
        }
    }
}

// changes the type of tile that is generated 
function tileSwitcher(){
    // used to determine what type of tile will spawn next
    let value = Math.floor(Math.random() * tileTypes.length);
    // sets the currentTile variable to the random value
    currentTile = tileTypes[value];
}

// switch the type of tile every x number of milliseconds
setInterval(tileSwitcher, tileSwitchSpeed);

// fills/unfills tiles based on current selected color 
// used when user changes the selected color
function tileFiller(color){
    // get array of all current tiles
    let currentTiles = document.querySelectorAll(".tile");
    // iterate through tiles on gameboard
    currentTiles.forEach((tile) => {
        // if it is a standard tile, do nothing
        if (tile.classList.contains("tile0")){
            return
        }
        // if the selected color is paint1
        if (color == paintColorArray[0]){
            // replace any unfilled tile1 with the filled version
            tile.classList.replace("tile1-unfilled", "tile1-filled");
        }

        // if the selected color is paint2
        if (color == paintColorArray[1]){
            // replace any unfilled tile1 with the filled version
            tile.classList.replace("tile2-unfilled", "tile2-filled");
        }

        // if the selected color is paint3
        if (color == paintColorArray[2]){
            // replace any unfilled tile1 with the filled version
            tile.classList.replace("tile3-unfilled", "tile3-filled");
        }

        // if the selected color is paint4
        if (color == paintColorArray[3]){
            // replace any unfilled tile1 with the filled version
            tile.classList.replace("tile4-unfilled", "tile4-filled");
        }
    })
}

// function that will unfill any filled tiles
// used to remove filled tile when new color is selected
function tileUnfiller() {
    // get array of all current tiles in the game area
    let currentTiles = document.querySelectorAll(".tile");

    // iterate through current tiles
    currentTiles.forEach((tile) => {
        // replace filled tiles with unfilled
        tile.classList.replace("tile1-filled", "tile1-unfilled");
        tile.classList.replace("tile2-filled", "tile2-unfilled");
        tile.classList.replace("tile3-filled", "tile3-unfilled");
        tile.classList.replace("tile4-filled", "tile4-unfilled");
    })
}

// COLLISION CHECKS
// User and Unfilled Tile Check
// function that checks if the user is colliding with any unfilled tiles
function tileCollisionCheck(){
    // Get User's Position
    // user's position from the left 
    let playerPosLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
    // player midPoint - used to check for collisions
    let playerPosMid = playerPosLeft + (playerWidth/2)
    // user's position from the top (is the player in the air?)
    let playerPosTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"))

    // if the player is in the jump animation, leave the function
    // player cannot collide with tile while jumping
    if (playerPosTop < playerTopGrounded){
        return
    }

    // Get Tiles
    // gets collection of all current unfilled tiles (tiles with dashed lines)
    let currentUnfilledTiles = document.querySelectorAll(".tile1-unfilled, .tile2-unfilled, .tile3-unfilled, .tile4-unfilled");
    // check each tile's position vs. player position
    currentUnfilledTiles.forEach((tile) => {
        // start of the hitbox (on the left side)
        let tileHitboxLeft = parseInt(window.getComputedStyle(tile).getPropertyValue("left"));
        // end of hitbox (on the right side)
        let tileHitboxRight = tileHitboxLeft + tileWidth

        // check to see if the player's position is over unfilled tile hitbox
        if (playerPosMid > tileHitboxLeft && playerPosMid < tileHitboxRight){
            deathScreen();
        }
    })
}

// DEATH SCREEN AND RESPAWN

function deathScreen() {
    // player is no longer alive (this stops tile generation and collision checks)
    isAlive = false;
    // remove all tiles
    tileContainer.remove();
    // stop generating tiles
    clearInterval(tileGenerator);
    // stop removing tiles (they don't exist anymore)
    clearInterval(tileRemover);
    // stop checking for collisions
    clearInterval(tileCollisionChecker);
    // grab player object from DOM
    let player = document.getElementById("player");
    // remove the player
    player.remove();

    // create a retry button
    let retryButton = document.createElement("button");
    retryButton.style.position = "relative";
    retryButton.setAttribute("id", "retry");
    retryButton.setAttribute("type", "button");
    retryButton.innerHTML = `<b>Try Again?</b><br><p>(Press Enter)</p>`
    // append it to gameboard
    gameArea.append(retryButton);
}

// function to allow player to respawn if they are dead
function respawn() {
    // grab retry button from DOM
    let retryButton = document.getElementById("retry");
    // remove it
    retryButton.remove();

    // player is now alive again
    isAlive = true;
    // start a new game
    runGame()
}

// event Listener to respawn when player is dead
window.addEventListener("keydown", (e) => {
    // checks to see if player is dead, and if user has pressed enter key
    if (e.key == "Enter" && !isAlive){
        // respawn player (start new game)
        respawn()
    }
})
