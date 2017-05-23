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
var deck = [CA, C2, C3, C4, C5, C6, C7, C8, C9, C10, CJ, CQ, CK,
	DA, D2, D3, D4, D5, D6, D7, D8, D9, D10, DJ, DQ, DK,
	HA, H2, H3, H4, H5, H6, H7, H8, H9, H10, HJ, HQ, HK,
	SA, S2, S3, S4, S5, S6, S7, S8, S9, S10, SJ, SQ, SK,
];

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
//from The Gamer's Guide to Coding, by Gordon McComb
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




//Implementing @Hayden's Idea

//Map for each card with image attached:

var deck = {
	Card1: "CA.png",
	Card2: "C2.png",
	Card3: "C3.png",
//	...,
	Card52: "SK.png";
}

//Add a card to the deck:

deck[Card53] = "bigJoker.png";

//Remove a card from the deck:

deck[Card53] = "";

/*Add card to hand from deck (after doing shuffle method).
All areas of cards (ex. deck, hand, inplay, discard pile) are maps.
This way, card assets are treated as reusable and can more freely
from one area to another
shuffle(deck);*/

var hand = [];
hand[card[0]] = deck[0];

//remove card that was drawn from deck
deck[0] = "";

//move card from hand to in play area
var inPlay = [];
indPlay[card[0]] = hand[0];
hand[0] = "";

//move card from in play area to graveyard
var discard = [];
discard[card[0]] = inPlay[0];
inPlay[0] = "";

//extra features --optional for now

//roll a dice and display it
function rollDice(diceSides) {
	return randWholeInt(1, diceSides);
	alert(diceSides);
}
