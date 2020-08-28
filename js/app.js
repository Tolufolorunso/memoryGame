'strict mode'

//Global variables

let sec = 0;
let mins = 0;
let interval;



let openCards = [];

let moveCounters = 0;

let totalMatchedMove = 0;


let ratingStar = document.querySelectorAll('.fa-star');
let notMatchTimer = null;

const moves = document.querySelector('.moves');
const displaytimer = document.querySelector('.displaytimer');
const listParent = document.querySelector('.deck');
const container = document.querySelector('.container');
const cardLists = document.querySelectorAll('.card');

// Add replay/restart buttons events listeners
['.replay', '.restart'].forEach(cls => {
  document
    .querySelector(cls)
    .addEventListener('click', restartReplayFunctions);
});

// Deck event listener
listParent.addEventListener('click', deckCardClicked, false);

//shuffle cards
shuffleRandomly(listParent);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//event listener to initialize the game
// addEventListener('click', deckCardClicked);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function deckCardClicked(e) {
  //using event delegation to know which card clicked
  let card = e.target;
  if (card.className == 'card') {
    if (notMatchTimer) {
      clearTimeout(notMatchTimer);
      notMatchTimer = null;
      notMatch();
    }
    cardShow(card); // display the card
    checkCard(card); //invoking checkCard()
    moveCounter();
  }
}

function cardShow(card) {
  card.classList.add('open', 'show');
}

function cardHide(card) {
  card.classList.remove('open', 'show');
}

function notMatch() {
  openCards.forEach(card => cardHide(card));
  openCards = [];
}

function checkCard(card) {
  openCards.push(card)
  //check if the length of the array is two
  if (openCards.length === 2) {
    matchCard();
  }
}

function matchCard() {
  //check to see if the card matched
  let cardOne = openCards[0].lastElementChild.classList[1];
  let cardTwo = openCards[1].lastElementChild.classList[1];
  if (cardOne === cardTwo) {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    //if they matched add .open and .show classes to the specific card 
    cardHide(openCards[0]);
    cardHide(openCards[1]);
    //reset openCards array
    openCards = [];
    //increment the matchedCrdsMove by 1
    totalMatchedMove++;
    //check to see if total matched equal 8
    if (totalMatchedMove == 8) {
      stopTimer();
      gameOver();
    }
  } else {
    notMatchTimer = setTimeout(notMatch, 500);
  }
}

//------------------move counter-------------------


function moveCounter() {
  moveCounters++;
  rating();
  if (moveCounters == 1) {
    startTimer();
  }
  moves.textContent = moveCounters;
}


//------------------Stars Rating-------------------

let stars = 3;

function rating() {
  if (moveCounters > 40) {
    ratingStar[1].style.visibility = "hidden";
    stars = 1;
  } else if (moveCounters > 30) {
    ratingStar[2].style.visibility = "hidden";
    stars = 2;
  }
}



//------------------Timer-------------------


function startTimer() {
  interval = setInterval(function () {
    sec++;
    if (sec == 60) {
      mins++;
      sec = 0;
    }
    sec = sec < 10 ? '0' + sec : sec;
    displaytimer.textContent = `${mins}m ${sec}s`;
  }, 1000);
}


function stopTimer() {
  clearInterval(interval);
}

//------------------GameOver-------------------
function gameOver() {
  let gameOver = document.querySelector('.game-won');
  const move = document.querySelector('.move');
  const gameWonTimeDislay = document.querySelector('.gameWontimeDislay');
  const rating = document.querySelector('.rating');
  let faStar = document.createElement('i');

  faStar.classList.add('fa', 'fa-star');
  move.textContent = moveCounters + 1;
  rating.textContent = stars;
  gameWonTimeDislay.textContent = `${mins} mins  ${sec} secs`;
  rating.appendChild(faStar);

  setTimeout(function () {
    container.style.display = 'none';
    gameOver.style.display = 'flex';
  }, 2000);
}

function restartReplayFunctions() {
  console.log('connected');
  document.location.reload();
}

//------------------shuffle the cards Randomly-------------------

function shuffleRandomly(whatToShuffle) {
  for (let i = whatToShuffle.children.length; i >= 0; i--) {
    whatToShuffle.appendChild(whatToShuffle.children[Math.random() * i | 0]);
  }
}
