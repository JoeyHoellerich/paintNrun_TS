// Get Game Area
const gameArea = document.getElementById("game");

// Create Playable Character
let playableCharacter = document.createElement("div");
playableCharacter.setAttribute("id", "player")
gameArea.append(playableCharacter);