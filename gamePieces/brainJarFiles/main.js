var element = document.querySelector("#greeting");
element.innerText = "Hello, world!";

function rollDice(diceSides) {
	return Math.floor((Math.random() * diceSides) + 1);
	alert(diceSides);
}

rollDice(8);