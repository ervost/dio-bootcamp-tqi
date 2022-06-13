const cards = document.querySelectorAll('.card');
const btnRestart = document.getElementById('restart-game');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchs = 0; 
let attempts = 0;
let playedTimes = '';
const attemptsID = document.getElementById('lastAttempts');
const timesPlayed = document.getElementById('timesPlayed');
const blockScreen = document.getElementsByTagName('section')[0];
function flipCard() {
    if (lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

btnRestart.addEventListener('click', shuffle);

function checkForMatch() {
    attempts++;
    attemptsID.innerHTML = attempts;
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        matchs++;
        if (matchs === 6) {
            // terminou o jogo
            timesPlayed.innerHTML = timesPlayed.innerHTML + ' -> ' + attempts;
            blockScreen.style.visibility = 'visible';
        }
        return;
    }
    unflipCard();

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

}

function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null,null];
}

function shuffle() {
    cards.forEach((card) => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard)
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
    resetBoard();
    blockScreen.style.visibility = 'hidden';
    matchs = 0; 
    attempts = 0;
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

