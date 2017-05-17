//Pseudocode for Game Assets: vTable


// Method 1: Make each player's number of chips a public variable. Use public functions such as give chips to change the public variables.
// #initialize number of chips
var P1Chips = 3;
var P2Chips = 3;
var P3Chips = 3;
var P4Chips = 3;
 
var giveChips = function(sender, receiver, numChips) {
	Sender -= varChips;
	Receiver += varChips;
};
 
// Method 2: Make each player a separate object, and have each object interact with another
// Source: https://www.freecodecamp.com/challenges/make-object-properties-private
 
var Player1 = function() {
// private variables
var numChips = 3;
var name = "Player 1";
 
// public methods
This.givechips = function(chipsGiven) {
	If (chipsGiven < numChips) {
		numChips -= chipsGiven;
	} else {
		return "Please enter a valid number of Chips!";
	}
}
 
This.receivechips = function(chipsReceived) {
	numChips += chipsReceived;
}

 
var Player2 = function() {
// private variables
var numChips = 3;
var name = "Player 2";
 
// public methods
	This.givechips = function(chipsGiven) {
		if (chipsGiven < numChips) {
			numChips -= chipsGiven;
		} else {
			return "Please enter a valid number of Chips!";
		}
	}
 
	This.receivechips = function(chipsReceived) {
		numChips += chipsReceived;
	}
}
 
// Method 3: HASHMAP for Players as a dictionary
 
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
 
var moveCoinsFromTo(from, to) {         //let from= pDict[P1] and to = pDict[P2] 
if (from[0] <= 0) {
	return "Error";
} else {
	from[0] --;
	to[0] ++;
}
 
// An initial draft for a game of poker (or any game with cards) with 4 players--How do we extrapolate to other games? Maybe get rid of the game specific sections?: 
 
// Decks as a Stack:
// Clubs = C, Spades = S, Hearts = H, Diamonds = D
//create the deck
var deck = [CA, C2, C3, … ,CK, DA, D2, D3, … ,DK, HA, H2, H3, … ,HK, SA, S2, S3, … ,SK];
 
//Create the hand as an unordered list
var hand = [];
 
//create the discard pile as an Empty Stack
var discardPile = [];
 
//create a dictionary (hashmap) for cards in play for each player
var cardsInPlay= {
P1: [],
P2: [],
P3: [],
P4: [],
};
 
//variable for current players turn
currentPlayer = 0
var currentTurn = cardsInPlay[currentPlayer];
 
//*Simulate Sample turn for player 1*///
 
//Shuffle the deck
//from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(deck) {
    var j, x, i;
    for (i = deck.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = deck[i - 1];
        deck[i - 1] = deck[j];
        deck[j] = x;
    }
}
 
shuffle(deck);
 
 
//Player 1 draws a card from the deck into the hand:
function drawCard {
Hand.push();
Deck.pop();
}
 
//player 1 plays King of Spades card from hand into board
CardsInPlay[currentPlayer] = "SK";  
Hand.remove("SK"); //hand 
 
//player 1 then plays a Queen of Hearts from Hand into board 
CardsInPlay[currentPlayer] = "SK, QH";  
Hand.remove("QH"); //hand 
 
//functions to resolve game-specific mechanics, bets, calls
function resolveTurn {
	//resolve the turn, perhaps with something from online, 
	//like http://www.paulgriffiths.net/web/pokersrc.html or 
	//https://codereview.stackexchange.com/questions/71630/simple-poker-game;
}
 
//function to move cards from in play to discard pile
 
For card in CardsInPlay[currentPlayer] {
	CardsInPlay.remove(currentPlayer[card]);
	Discard.push(CardsInPlay[currentPlayer][card]);
}
 
//alert the player about what is in their hand (or in play, or in the discard pile)
Alert(hand);
 
//*end of player 1's turn*//
function endTurn {
currentPlayer ++;
}
 
//add game start and ending triggers
 
 
// Hayden's idea:
// i'd suggest have a global map lookup and have cards just be represented by ids
// global map for id -> card graphic or identifier
 	 
 
// perhaps we could create some sort of data structure that defines the relationships 
//between each area--like an edge graph

