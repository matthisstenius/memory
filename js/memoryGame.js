window.onload = function() {
	var memory1 = new MemoryGame("#board1");

	memory1.init();

};

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
		var board, a, img, memoryBoard, randomArray, count;


		randomArray = that.random();
		board = document.querySelector(boardID);

		memoryBoard = document.createElement("div");
		memoryBoard.setAttribute("class", "memoryBoard");

		board.appendChild(memoryBoard);

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
			alert("Grattis till vinsten! Du klarade det på " + guessCount + " försök.");
		}

		if (guessCount === 25) {
			alert("För många gissningar!");
		}
	};
};

