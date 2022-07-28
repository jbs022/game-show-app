const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const button = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const letter = document.querySelectorAll('.letter');
const ul = document.querySelector("ul");
const li = document.createElement("li");
const tries = document.querySelectorAll("li.tries");
const h3 = document.createElement('h3')
let missed = 0;

// all possible phrases
const phrases = [
	"welcome to the jungle",
	"violence speed momentum",
	"may the force be with you",
	"i am the one who knocks",
	"not of planet earth"
];

// listen for the start game button to be pressed
button.addEventListener("click", () => {
	overlay.style.display = "none";
});

// return a random phrase from an array
function getRandomPhraseAsArray(arr) {
	const randomNumber = Math.floor(Math.random() * phrases.length);
	let phrase = arr[randomNumber];
	return phrase;
}

// adds the letters of a string to the display
const randomPhrase = getRandomPhraseAsArray(phrases);
function addPhraseToDisplay(arr) {
	for (i = 0; i < randomPhrase.length; i++) {
		let text = arr[i];
		const li = document.createElement("li");
		
		// appends each letter/space as an <li> to the <ul>
		ul.appendChild(li);
		li.className = "letter";
		li.textContent = text;
		
		// applies either "space" or "letter" class to the <li> depending on if it's a space or letter
		if (randomPhrase[i] === " ") {
			li.className = "space";
		} else {
			li.className = "letter";
		}
	}
}
addPhraseToDisplay(randomPhrase);

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener("click", (e) => {
	// applies styling for buttons that have been clicked
	if (e.target.tagName === "BUTTON" && e.target.className != "chosen") {
		const btn = e.target;
		btn.disabled = true;
		btn.className = "chosen";
		const clickedLetter = e.target.textContent;
		const check = checkLetter(clickedLetter);
	}
	checkWin();
	
	// check if a letter is in the phrase
	function checkLetter(button) {
		const letterCorrect = randomPhrase.includes(button);
		if (letterCorrect === true) {
			for(i = 0; i < randomPhrase.length; i++) {
				if (randomPhrase[i] === button) {
					document.querySelectorAll("li")[i].classList.add("show")
				}
			}
		} else {
			tries[missed].firstElementChild.src = "images/lostHeart.png";
			missed++;
		}
	}
	
	const checkedLetters = li;
	let match = null;
	
	for (i = 0; i < checkedLetters.length; i++) {
		if (li.textContent === arr.textContent) {
			match = arr.textContent;
		}
	}
	return null;
});

// check if the game has been won or lost
function checkWin() {
	const totalLetters = document.querySelectorAll(".letter");
	const shownLetters = document.querySelectorAll(".show");
	if (shownLetters.length === totalLetters.length) {
		overlay.className = "win";
		overlay.style.display = "flex";
		button.textContent = "Play Again";
		button.addEventListener("click", () => {
			location.reload();
		});
		overlay.appendChild(h3);
		h3.textContent = "You Won!";
	} else if (missed >= 5) {
		overlay.className = "lose";
		overlay.style.display = "flex";
		button.textContent = "Try Again";
		button.addEventListener("click", () => {
			location.reload();
		});
		overlay.appendChild(h3);
		h3.textContent = "You Lost!";
	}
}