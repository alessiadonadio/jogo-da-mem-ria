const cardsArray = [
    { name: 'A', img: '🐱' },
    { name: 'B', img: '🐶' },
    { name: 'C', img: '🦁' },
    { name: 'D', img: '🐯' },
    { name: 'E', img: '🐰' },
    { name: 'F', img: '🐸' },
    { name: 'G', img: '🐼' },
    { name: 'H', img: '🦊' },
    { name: 'A', img: '🐱' },
    { name: 'B', img: '🐶' },
    { name: 'C', img: '🦁' },
    { name: 'D', img: '🐯' },
    { name: 'E', img: '🐰' },
    { name: 'F', img: '🐸' },
    { name: 'G', img: '🐼' },
    { name: 'H', img: '🦊' },
];

let flippedCards = [];
let matchedCards = [];
let isGameLocked = false;

function startGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    isGameLocked = false;
    document.getElementById('message').innerText = '';

    // Embaralha as cartas
    const shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.setAttribute('data-img', card.img); // Agora armazenamos o emoji também

        cardElement.addEventListener('click', () => flipCard(cardElement));

        gameBoard.appendChild(cardElement);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(cardElement) {
    if (isGameLocked || cardElement.classList.contains('flipped') || matchedCards.includes(cardElement)) {
        return;
    }

    cardElement.classList.add('flipped');
    cardElement.innerHTML = `<span>${cardElement.getAttribute('data-img')}</span>`; // Exibe o emoji do animal

    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    isGameLocked = true;
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-name') === card2.getAttribute('data-name')) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        isGameLocked = false;

        if (matchedCards.length === cardsArray.length) {
            document.getElementById('message').innerText = 'Parabéns! Você encontrou todos os pares!';
            fireConfetti();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = ''; // Limpa o conteúdo da carta
            card2.innerHTML = '';
            flippedCards = [];
            isGameLocked = false;
        }, 1000);
    }
}

// Função para disparar os confetes
function fireConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Iniciar o jogo ao carregar a página
window.onload = startGame;
