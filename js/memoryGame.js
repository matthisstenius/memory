var startGame = {
	newGame: function() {
		var startButton = document.getElementById("newGameButton");

		startButton.onclick = function() {
			startGame.newMemory();
			return false;
		};
	},

	gameCounter: 1,

	newMemory: function() {
		var wrapper = document.querySelector(".wrapper");
		var newBoard = document.createElement("div");
		newBoard.id = "#board" + startGame.gameCounter;
		newBoard.setAttribute("class", "board");

		wrapper.appendChild(newBoard);
		var memory = new MemoryGame(newBoard.id);
		memory.init();

		startGame.gameCounter += 1;
	}
};

window.onload = startGame.newGame;

MemoryGame = function(boardID) {
	var that = this;

	// Closure vars
	var srcArray = [];
	var guessCount = 0;
	var clickCount = 0;
	var pairCount = 0;

	this.init = function() {
		that.generateMemory();
	};

	this.random = function() {
		var randomTiles = RandomGenerator.getPictureArray(4, 4);

		return randomTiles;
	};

	this.generateMemory = function() {
		var currentBoard, a, img, memoryBoard, randomArray, count;


		randomArray = that.random();

		currentBoard = document.getElementById(boardID);

		memoryBoard = document.createElement("div");
		memoryBoard.setAttribute("class", "memoryBoard");

		currentBoard.appendChild(memoryBoard);

		for (var i = 0; i < randomArray.length; i += 1) {
			randomTiles(i);
		}

		function randomTiles(i) {

			a = document.createElement("a");
			img = document.createElement("img");
			a.href = "#";
			a.setAttribute("class", "tile");

			img.src = "img/cover.jpg";

			memoryBoard.appendChild(a);
			a.appendChild(img);

			a.onclick = function() {
				that.switchTile(this, randomArray[i]);
				return false;
			};
		}
	};

	this.switchTile = function(thisClick, randomArray) {
		var imgSrc1, imgSrc2;

		clickCount += 1;

		if (clickCount ===  1) {

			// Kollar att första klicket inte tillhör par
			if (thisClick.firstChild.classList.contains("pair")) {
				clickCount = 0;
				return;
			}

			imgSrc1 = thisClick.firstChild;
			imgSrc1.src = "img/karl" + randomArray + ".jpg";
			imgSrc1.setAttribute("class", "open");
			srcArray.splice(0, 1, imgSrc1);
			return;
		}

		// Kollar så att andra klicket inte är samma som det första
		if (thisClick.firstChild.classList.contains("open")) {
			thisClick.firstChild.src = "img/cover.jpg";
			thisClick.firstChild.removeAttribute("class", "open");
			clickCount = 0;
			return;
		}

		if (clickCount ===  2) {

			// Kollar att andra klicket inte tillhör par
			if (thisClick.firstChild.classList.contains("pair")) {
				clickCount = 1;
				return;
			}

			imgSrc2 = thisClick.firstChild;
			imgSrc2.src = "img/karl" + randomArray + ".jpg";
			srcArray.splice(1, 1, imgSrc2);

			if (srcArray[0].src === srcArray[1].src) {
				srcArray[0].setAttribute("class", "pair");
				srcArray[1].setAttribute("class", "pair");

				pairCount += 1;
				clickCount = 0;
			}

			else {
				setTimeout(function() {
					srcArray[0].src = "img/cover.jpg";
					srcArray[1].src = "img/cover.jpg";
					srcArray[0].classList.remove("open");
					srcArray[1].classList.remove("open");
					clickCount = 0;

				}, 1000);
			}

			guessCount += 1;
		}

		if (pairCount === 8) {
			that.renderAlertBox("Grattis till vinsten! Du klarade det på " + guessCount + " försök.");
		}

		if (guessCount === 25) {
			that.renderAlertBox("Du är för dålig!");
		}
	};

	this.renderAlertBox = function(alertMessage) {
		var alertBox, message, newGame, close, wrapper, background, board;

		board = document.getElementById(boardID);

		wrapper = document.querySelector(".wrapper");
		background = document.querySelector("body");

		alertBox = document.createElement("div");
		message = document.createElement("p");
		newGame = document.createElement("a");
		close = document.createElement("a");

		background.setAttribute("class", "greyOut");
		alertBox.setAttribute("class", "alertBox");
		message.innerHTML = alertMessage;
		newGame.setAttribute("class", "newGame");
		close.setAttribute("class", "close");
		newGame.href = "#";
		newGame.innerHTML = "Spela igen";
		close.href = "#";
		close.innerHTML = "Stäng";

		board.appendChild(alertBox);
		alertBox.appendChild(message);
		alertBox.appendChild(newGame);
		alertBox.appendChild(close);

		newGame.onclick = function() {
			board.removeChild(alertBox);
			wrapper.removeChild(board);
			startGame.newMemory();
			return false;
		};

		close.onclick = function() {
			board.removeChild(alertBox);
			wrapper.removeChild(board);
			return false;
		};

	};
};

