

var argButtonName, ButtonPaper, ButtonRock, ButtonScissors;

var won=0;
var lost=0;

/**
 * Describe this function...
 */
function buttonClicked(argButtonName) {
    clearMessages();
    console.log(argButtonName + ' został kliknięty');
    var argComputerMove, argMoveId, argPlayerMove, computerMove, playerInput, playerMove, randomNumber;

    /**
     * Describe this function...
     */
    function getMoveName(argMoveId) {
        console.log('wywołano funkcję getMoveName z argumentem: ' + argMoveId);
        if (argMoveId == 1) {
            return 'kamień';
        } else if (argMoveId == 2) {
            return 'papier';
        } else if (argMoveId == 3) {
            return 'nożyce';
        } else {
            printMessage('Nie znam ruchu o id ' + argMoveId + '. Zakładam, że chodziło o "kamień".');
            return 'kamień';
        }
    }

    /**
     * Describe this function...
     */
    function displayResult(argPlayerMove, argComputerMove) {
        console.log('wywołano funkcję displayResults z argumentami: ' + argPlayerMove + ', ' + argComputerMove);
        if (argPlayerMove == 'papier' && argComputerMove == 'kamień') {
            printMessage('Wygrywasz!');
            won++;
        } else if (argPlayerMove == 'kamień' && argComputerMove == 'nożyce') {
            printMessage('Wygrywasz!');
            won++;
        } else if (argPlayerMove == 'nożyce' && argComputerMove == 'papier') {
            printMessage('Wygrywasz!');
            won++;
        } else if (argPlayerMove == argComputerMove) {
            printMessage('Remis!');
        } else {
            printMessage('Przegrywasz :(');
            lost++;
        }
        printMessage('Zagrałem ' + argComputerMove + ', a Ty ' + argPlayerMove);
        displayScore(won, lost);
    }
    playerMove = argButtonName;
    console.log('ruch gracza to: ' + playerMove);
    randomNumber = Math.floor(Math.random() * 3 + 1);
    console.log('wylosowana liczba to: ' + randomNumber);
    computerMove = getMoveName(randomNumber);
    console.log('ruch komputera to: ' + computerMove);
    displayResult(playerMove, computerMove);
}
ButtonRock = document.getElementById('button-rock');
ButtonRock.addEventListener('click', function () { buttonClicked('kamień'); });
ButtonPaper = document.getElementById('button-paper');
ButtonPaper.addEventListener('click', function () { buttonClicked('papier'); });
ButtonScissors = document.getElementById('button-scissors');
ButtonScissors.addEventListener('click', function () { buttonClicked('nożyce'); });

