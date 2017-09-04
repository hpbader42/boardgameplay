//Code for Game Assets: vTable

// Method with HASHMAP for Players as a dictionary

// Rahul's Suggestion for a HashMap: not sure what it looks like in JS but something like this -
//let's say you have a hashmap or some sort of Key-value storage
// or dictionary in python
// {P1 -> 3, P2 -> 3, P3 -> 3, P4 -> 3}
// public void moveCoinsFromTo(String source, String destination) {
// get the count corresponding to key = source and decrement. if it's already at 0, then throw an exception
// get the count corresponding to key = destination and increment. }

var pDict= {
	P1: [3],
	P2: [3],
	P3: [3],
	P4: [3],
}
//let from= pDict[P1] and to = pDict[P2]
function moveCoinsFromTo(from, to, amount) {        
	if (from[0] <= 0) {
		return "Error";
	} else {
		from[0] -= amount;
		to[0] += amount;
	}
}
// test case example: moveCoinsFromTo(pDict["P1"], pDict["P2"], 2)
// Player 1 gives Player 2 two (2) coins

// An initial draft for a game of poker (or any game with cards) with 4 players--How do we extrapolate to other games? Maybe get rid of the game specific sections?:

// Decks as an array:
// Clubs = C, Spades = S, Hearts = H, Diamonds = D
//create the deck


// Hayden's idea:
// i'd suggest have a global map lookup and have cards just be represented by ids
// global map for id -> card graphic or identifier


// perhaps we could create some sort of data structure that defines the relationships
//between each area--like an edge graph


//Implementing @Hayden's Idea

//Map for each card with image attached: 

//eventually integrate with HTML using img src syntax
	// ex. <img src = "image path which you get from javascript hashmap"></a>
	// see https://stackoverflow.com/questions/22293023/get-full-image-path-and-put-in-img-src-using-javascript
//example image for ace of clubs: "https://upload.wikimedia.org/wikipedia/commons/3/38/Poker-sm-241-Ac.png";

var deck = {
	Card1: "CA.png", Card2: "C2.png", Card3: "C3.png", Card4: "C4.png", Card5: "C5.png", 
	Card6: "C6.png", Card7: "C7.png", Card8: "C8.png", Card9: "C9.png", Card10: "C10.png",
	Card11: "CJ.png", Card12: "CQ.png", Card13: "CK.png", Card14: "DA.png", Card15: "D2.png",
	Card16: "D3.png", Card17: "D4.png", Card18: "D5.png", Card19: "D6.png", Card20: "D7.png",
	Card21: "D8.png", Card22: "D9.png", Card23: "D10.png", Card24: "DJ.png", Card25: "DQ.png",
	Card26: "DK.png", Card27: "HA.png", Card28: "H2.png", Card29: "H3.png", Card30: "H4.png",
	Card31: "H5.png", Card32: "H6.png", Card33: "H7.png", Card34: "H8.png", Card35: "H9.png",
	Card36: "H10.png", Card37: "HJ.png", Card38: "HQ.png", Card39: "HK.png", Card40: "SA.png",
	Card41: "S2.png", Card42: "S3.png", Card43: "S4.png", Card44: "S5.png", Card45: "S6.png",
	Card46: "S7.png", Card47: "S8.png", Card48: "S9.png", Card49: "S10.png", Card50: "SJ.png",
	Card51: "SQ.png", Card52: "SK.png"
}

//Add a card to the deck:

deck.Card53 = "bigJoker.png";

//Remove a card from the deck:

deck.Card53 = "";

//Shuffle the deck
//from The Gamer's Guide to Coding, by Gordon McComb

//need to modify the below functions to work for dictionaries, rather than arrays
//maybe use JSON dictionaries with values as JSON objects
	// see https://stackoverflow.com/questions/14697371/how-to-retrieve-random-json-object-by-key-from-json-dictionary
var arr = [];
shuffleCards();
console.log(arr); // Shuffled deck

function shuffleCards() {
	arr = [];
	var starting = 1;
	while(starting < deck.length){
		arr.push(starting++);
	}
	console.log(arr); // Pre-shuffled deck
	shuffle(arr);
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while(0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
/*Add card to hand from deck (after doing shuffle method).
All areas of cards (ex. deck, hand, inplay, discard pile) are maps.
This way, card assets are treated as reusable and can more freely
from one area to another
shuffle(deck);*/

//initialize empty hand. Set maximum hand size to 15 for now.

var hand = {
	Card1: "", Card2: "", Card3: "", Card4: "", Card5: "", 
	Card6: "", Card7: "", Card8: "", Card9: "", Card10: "", 
	Card11: "", Card12: "", Card13: "", Card14: "", Card15: "" 
}

//add Card 1 of the deck from the deck to the hand
hand.Card1 = deck["Card1"]; 
//need to randomize deck[Card1] later, perhaps with a string function like
//deck[Card + randInt(1, deckSize)]

//remove card that was drawn from deck
deck.Card1 = "";

//move card from hand to in play area
//set maximum in play cards to 10
var inPlay = {
	Card1: "", Card2: "", Card3: "", Card4: "", Card5: "", 
	Card6: "", Card7: "", Card8: "", Card9: "", Card10: "", 
}
inPlay.Card1 = hand["Card1"]; 
hand.Card1 = "";

//move card from in play area to discard pile
var discardPile = {
	Card1: "", Card2: "", Card3: "", Card4: "", Card5: "", 
	Card6: "", Card7: "", Card8: "", Card9: "", Card10: "", 
}
discardPile.Card1 = inPlay["Card1"]; 
inPlay.Card1 = "";


//Functions to facilitate flow of game.
//For future: make buttons to implement the startGame, endTurn, and endGame functions.

//Initialize the first turn to player 1 and the turn number to 1.
var currentPlayer = 1;
var turnNumber = 1;

//function to start the game
function startGame() {
	alert("The game has started.")
	alert("Player " + currentPlayer + ": It's your turn to crush it.")
}
startGame();

//function to end the turn
function endTurn() {
	currentPlayer++;
	turnNumber++;
	alert("Player " + (currentPlayer-1) + ": Your turn is over.")
	alert("Player " + currentPlayer + ": It's your turn to crush it.")
} 
endTurn();

//function to change player turn using raw input
//pseudocode
function changeCurrentPlayer(currentPlayer) {
	//change the current player as necessary
}

//function to change turn number using raw input
//pseudocode
function changeCurrentPlayer(currentPlayer) {
	//change the current turn as necessary
}

//function to end the game
function endGame() {
	alert("The Game is Over!")
	alert("Remember, the real winners are players who enjoy the journey.")
}
endGame();

//allow each player to see what is in their hand (or in play, or in the discard pile)
//pseudocode
alert(hand);
alert(deck);
alert(inPlay);

//extra features --optional for now

//roll a dice and display it
function rollDice(diceSides) {
	return Math.floor((Math.random() * diceSides) + 1);
	alert(diceSides);
}
