//map 
var map = [];
map[0] = "A crashed caravan";
map[1] = "A deep well.";
map[2] = "A small tower";
map[3] = "A large rock.";
map[4] = "A stone formation.";

//location
var mapLocation = 0;

//map images
var image = document.querySelector("img");
var images =[];
images[0] = "map-0.svg";
images[1] = "map-1.svg";
images[2] = "map-2.svg";
images[3] = "map-3.svg";
images[4] = "map-4.svg";
//The input and output fields
var blockedPathMessages = [];
blockedPathMessages[0] = "The bandits are back in that direction";
blockedPathMessages[1] = "";
blockedPathMessages[2] = "";
blockedPathMessages[3] = "";
blockedPathMessages[4] = "You cannot move past this demon.";
//story-message
var storyMessages =[];
storyMessages[0] = "This is where your caravan brokedown.";
storyMessages[1] = "Nothing much here...";
storyMessages[2] = "An old man is sitting here.. he looks thirsty";
storyMessages[3] = "It seems this sword is stuck .... maybe if you had some sort of glove";
storyMessages[4] = "A demon sits in the formation telling racist jokes, he also won't let you pass";

//items
var itemsIKnow =["flask","magical glove", "sword"];
var items =["flask"];
var item = "";
var itemLocations = [1, 2 ,3];
var backpack = [];

//help msg
var help = "Type north, south, take or use";

var output = document.querySelector("#output");
var input = document.querySelector("#input");

//location
output.innerHTML = map[mapLocation];

//input
var playersInput = "";

//game message
var gameMessage = "<br>Your caravan has crashed! You need to get to the local town. "
gameMessage += "Try any of these words:" ;
gameMessage += "north, south, take, use. If interacting with an object type" + "<br>use/take " + "+ object";

//actions
var actionsIKnow = ["north", "south", "take", "use"];
var action = "";

//The button
var button = document.querySelector("button");
//handlers
button.addEventListener("click", clickHandler);
window.addEventListener("keydown", keydownHandler, false);


//players location
function keydownHandler(event) {
  if(event.keyCode === 13){
    playGame();
  }
}

function clickHandler(){
	playGame();
}
render();
function playGame(){
	playersInput = input.value;
	playersInput = playersInput.toLowerCase();

	//reset
	gameMessage = "";
	action = "";

	//player's action
	for (var i = 0; i < actionsIKnow.length; i++) {
		if (playersInput.indexOf(actionsIKnow[i]) !== -1) {
			action = actionsIKnow[i];
			console.log("players action: " + action);
		}
	}
	// items
	  for(i = 0; i < items.length; i++) {
	    if(playersInput.indexOf(items[i]) !== -1) {
	      item = items[i];
	      console.log("player's item: " + item);
	    }
	  }
	switch(action)
	{
		case "north":
			if (mapLocation >= 0 && mapLocation < 4) {
			mapLocation += 1;
			}
			else{
				gameMessage = blockedPathMessages[4];
			}
			break;

		case "south":
			if (mapLocation >= 1){
			mapLocation -= 1;
			}
			else{
				gameMessage = blockedPathMessages[0];
			}
			break;

		case "take":
			takeItem()
			break;

		case "use":
			useItem()
			break;

		default:
		gameMessage = "I don't understand that.";
	}
	render();
}
function takeItem(){
	var itemIndexNumber = items.indexOf(item);
	if ((itemIndexNumber !== -1) && (itemLocations[itemIndexNumber] === mapLocation)) {
		gameMessage = "You take the " + item + ".";
		backpack.push(item);
		items.splice(itemIndexNumber, 1);
		itemLocations.splice(itemIndexNumber, 1);
	}
	else{
		gameMessage = "You can't do that, fool.";
	}	
}

function useItem(){
	var backpackIndexNumber = backpack.indexOf(item);
	if (backpackIndexNumber === -1) {
		gameMessage = "You don't have this";
	}
	if (backpack.length === 0){
		gameMessage = "You are not carrying anything";
	}
	if (backpackIndexNumber !== -1){
		switch(item) {
			case "flask":
				if (mapLocation === 2) {
					gameMessage += "You give the man the your flask, he throws an old glove at you";
					backpack.splice(backpackIndexNumber, 1);
					items.push("glove");
					itemLocations.push(mapLocation);
					storyMessages[mapLocation] = "";
				}
				else{
					gameMessage = "You are not thirsty";
				}
				break;
			case "glove":
				if (mapLocation === 3) {
					gameMessage = "You use the glove on the sword and it comes out of the rock with ease.";
					backpack.splice(backpackIndexNumber, 1);
					items.push("sword");
					itemLocations.push(mapLocation);
					storyMessages[mapLocation] = "Although you see a sword...it is no longer in the rock(graphics are too expensive)";
				}
				else{
					gameMessage = "Why wear only one glove?";
				}
				break;
			case "sword":
				if(mapLocation === 4) {
					gameMessage = "The demon stops telling racist jokes when you swing your sword.. you walk towards the nearby town to find hookers and booze. Thanks for playing!";
					storyMessages[mapLocation] = "";
					gameWon();

				}
				else{
					gameMessage = "Swinging a sword is very dangerous, be more carefully ya dummy";
				}
				break;
		}
	}
}

function render(){
	output.innerHTML = map[mapLocation] + "<br>";
	image.src = "./images/" + images[mapLocation];
	for (var i = 0; i < items.length; i++) {
		if (mapLocation === itemLocations[i]) {
			output.innerHTML +=
			"<br>" +"You see a " + "<strong>"
			+items[i]
			+"</strong> here.";
		}
	}
	output.innerHTML += "<br><em>" + gameMessage + "<br>";
	output.innerHTML += "<br><em>" + storyMessages[mapLocation] + "<br>";
	if(backpack.length !==0){
		output.innerHTML += "<br> You are carrying a " + backpack.join(", ");
	}
}

function gameWon(){
	$(document).ready(function(){
		$(".youwin").fadeIn(20000);
		$(".youwin").append("<audio src='winner.ogg' autoplay></audio>");
	});
}
