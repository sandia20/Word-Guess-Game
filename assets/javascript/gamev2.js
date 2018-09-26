//Declaring all the global Variables to use

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var movies90s = ["Never Been Kissed", "Goodfellas","Rumble In The Bronx", "The Fifth Element",
"Men In Black","The Matrix","Casino"];

var winpic = ["neverbeenkissed", "goodfellas","rumbleinthebronx", "thefifthelement",
"meninblack","thematrix","casino"];

var gameStarted = false;
var wordAsDashes;
var guessesLeft=0;
var lettersGuessed=[];
var numWins = 0;
var numLosses = 0;
var pickedmovie; 
var correctGuesses;
var wordAsArr = [];
var dashesArray = [];
var pickedwordplaceholders=[];
//var whichmovie=0;




// startbutton function to reset to a new game, pick new movie and create place holders for the letters

function newgame() {
	gameStarted = true;
	lettersGuessed = [];
    correctGuesses = 0;
    pickedwordplaceholders=[];
     //Here we will randomly pick a new movie from the list
    pickedmovie = movies90s[Math.floor(Math.random() * movies90s.length)];
    //whichmovie=movies90s.indexOf(pickedmovie);
    guessesLeft = 10;
	wordAsDashes = makeIntoDashes(pickedmovie);	
    wordAsArr = pickedmovie.split('');	
    
	
}

// Add underscores for the picked word (spaces for letters)
function makeIntoDashes(word) {
    
	for (var i=0;i<pickedmovie.length;i++) {
        if (pickedmovie[i] === " ") {
          pickedwordplaceholders.push(" ");
        } else {
          pickedwordplaceholders.push("_");
        }    
      }
      //writting back to my html document
      
      document.getElementById("correctletters").textContent = pickedwordplaceholders.join('');
      document.getElementById("lettersremaining").textContent = guessesLeft;
      //Return the underscores for each word
      return pickedwordplaceholders;
}

// Add the event listener when button is pressed to prepare for new game and reset counters
var $newgamebutton = document.getElementById("new-button"); 
$newgamebutton.addEventListener("click", newgame);


// Main function that plays the game!
function playGame(letter) {
    
    if (gameStarted === true && lettersGuessed.indexOf(letter) === -1) {
        lettersGuessed.push(letter);

        
     
        // for each char in wordAsDashes, it compares the guessed letter with each letter of the pickedmovie
        for (var i=0; i<pickedmovie.length; i++) {
            if (pickedmovie[i].toLowerCase() === letter.toLowerCase()) {
             pickedwordplaceholders[i] = wordAsArr[i];
            }
        }
        //Write the matched letters to the HTML page
        document.getElementById("correctletters").innerHTML = pickedwordplaceholders.join('');
      } 
      else {
        if (gameStarted === false) {
            alert("The Game is not running.  Please click the New Game button!");
            lettersGuessed=[];
            document.getElementById("lettersguessed").innerHTML=lettersGuessed;
            pickedwordplaceholders=[];
            document.getElementById("correctletters").innerHTML = pickedwordplaceholders;

        }
      }


	if (lettersGuessed.indexOf(letter) > -1) {
	    guessesLeft--;
        document.getElementById("lettersremaining").innerHTML = guessesLeft;
        document.getElementById("lettersguessed").innerHTML = lettersGuessed.join('');
        
        if (guessesLeft === 0) {
            alert("Sorry! you run out of guesses, please click the new game button to start over!");
            numLosses++;
            document.getElementById("losses").innerHTML = numLosses;
            gameStarted=false;
        }
    }

    checkForWin();
		
	
}



// Checks for win by looking for "_"
function checkForWin() {
    
	if (gameStarted === true && pickedwordplaceholders.indexOf("_") === -1) {
		alert("You got it! The correct answer is " + pickedmovie);
        numWins++;
        document.getElementById("wins").innerHTML = numWins;
        //showImage()
        lettersGuessed=[];
        document.getElementById("lettersguessed").innerHTML=lettersGuessed;
        guessesLeft=0;
        document.getElementById("lettersremaining").innerHTML = guessesLeft;
		gameStarted = false;
	}
}

//function showImage() {
  //  var img1 = document.getElementById(winpic[whichmovie])
    //img1.classList.remove("hidden"); 
  //} 
 

document.onkeyup = function (event) {
    if (event.keyCode >=65 && event.keyCode <=90) {
        playGame (event.key);  
      }
}