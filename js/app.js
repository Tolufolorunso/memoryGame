'strict mode'
//alert('go')

//Global variables

let sec = 0;
let mins = 0;
let interval;



let openCards = [];

let moveCounters = 0;

let totalMatchedMove = 0;


let ratingStar = document.querySelectorAll('.fa-star');

const moves = document.querySelector('.moves');
const displaytimer = document.querySelector('.displaytimer');
const listParent = document.querySelector('.deck');
const container = document.querySelector('.container');
const cardLists = document.querySelectorAll('.card');



listParent.addEventListener('click', init, false);
//console.log(cardLists);

//shuffle cards
shuffleRandomly(listParent);

//event listener to initialize the game
addEventListener('click', init);


function init(e) {
    //using event delegation to know which card clicked
    let cards = e.target;
    if (cards.className == 'card') {
        //console.log(cards);
        cardToggling(cards); //invoking cardToggling()
        checkCard(cards); //invoking checkCard()
        moveCounter();
    }
    replay();
    restart();
}

function cardToggling(cards) {
    cards.classList.toggle('open');
    cards.classList.toggle('show');
}

function checkCard(cards) {
    openCards.push(cards)
    //console.log(openCards);
    //check if the length of the array is two
    if (openCards.length === 2) {
        //console.log('no');
        matchCard();
    }
}



function matchCard() {
    //check to see if the card matched
    if (openCards[0].lastElementChild.classList[1] === openCards[1].lastElementChild.classList[1]) {
        //console.log('match');
        openCards[0].classList.toggle('match');
        openCards[1].classList.toggle('match');
        //if they matched add .open and .face classes to the specific card 
        cardToggling(openCards[0]);
        cardToggling(openCards[1]);
        //reset openCards array
        openCards = [];
        //increment the matchedCrdsMove by 1
        totalMatchedMove++;
        if (totalMatchedMove == 8) {
            stopTimer();
            gameOver();
        }
    } else {
        setTimeout(notMatch, 500);

        function notMatch() {
            //console.log('not match');
            cardToggling(openCards[0]);
            cardToggling(openCards[1]);
            openCards = [];
        }
    }

}



function moveCounter() {
    moveCounters++;
    rating()
    if (moveCounters == 1) {
        //sec = 0;
        startTimer();
    }
    //console.log(moveCounters);
    moves.textContent = moveCounters;
}


//------------------Stars Rating-------------------

let stars = 3;

function rating() {
    for (let i = 0; i < ratingStar.length; i++) {
        if (moveCounters > 28) {
            if (i > 1) {
                ratingStar[i].style.visibility = 'hidden';
            }
            stars = 2;
        } else if (moveCounters > 20) {
            if (i > 0) {
                ratingStar[i].style.visibility = 'hidden';
            }
            stars = 1;
        }
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
        //console.log(sec);
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
    //console.log(stars);
    faStar.classList.add('fa', 'fa-star');
    move.textContent = moveCounters + 1; //totalMove
    console.log(moveCounters);
    rating.textContent = stars;
    gameWonTimeDislay.textContent = `${mins} mins  ${sec} secs`;
    rating.appendChild(faStar);

    setTimeout(function () {
        container.style.display = 'none';
        gameOver.style.display = 'flex';
    }, 2000);
}


function replay() {
    document.querySelector('.replay').addEventListener('click', restartReplayFunctions);
}

function restart() {
    document.querySelector('.restart').addEventListener('click', restartReplayFunctions);
}

function restartReplayFunctions() {
    console.log('connected')
    document.location.reload();
}

//------------------shuffle the cards Randomly-------------------

function shuffleRandomly(whatToShuffle) {

    for (let i = whatToShuffle.children.length; i >= 0; i--) {
        whatToShuffle.appendChild(whatToShuffle.children[Math.random() * i | 0]);
    }
}
