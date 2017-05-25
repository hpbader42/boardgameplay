/*For Google Dev Editor
at https://github.com/GoogleChrome/chromedeveditor/blob/master/doc/GettingStarted.md*/
var element = document.querySelector("#greeting");
element.innerText = "Hello, world!";

function rollDice(diceSides) {
	return Math.floor((Math.random() * diceSides) + 1);
	alert(diceSides);
}

rollDice(8);
