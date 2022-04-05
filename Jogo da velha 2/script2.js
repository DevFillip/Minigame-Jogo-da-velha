addEventListener('DOMContentLoaded', () =>{
    const tiles = Array.from(document.querySelectorAll('.tile')) // Aqui ele tá chamando o array de .tile, que são as 9 divs que fazem com que o jogo funcione
    const playerDisplay = document.querySelector('.display-player')
    const resetButton = document.querySelector('#reset')
    const announcer = document.querySelector('.announcer')

    let board = ['','', '','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON'; // Diz se o PlayerX ganhou
    const PLAYERO_WON = 'PLAYERO_WON'; // Diz se o PlayerO ganhou
    const TIE = 'TIE'; // Diz se deu empate.

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],

    ]; // as 8 condições de vitória desse jogo, se baseando que ele puxou o array.from lá em cima.

    function handleResultValidation(){ // forma de validar o resultado
        let roundWon = false; // por padrão a vitoria é falsa
        for(let i = 0; i <= 7; i++){ // loop padrão
            const winCondition = winningConditions[i]; // aqui é criado uma winCondition utilizando as condições de vitoria anteriormente, e utilizndo o indice I que é igual a 0, e segue o loop
            const a = board[winCondition[0]];// 
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === ''){
                continue;
            }
            if (a === b && b === c){
                roundWon = true;
                break;
            }
        }
        if(roundWon){
            announce(currentPlayer === 'X'? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
        if(!board.includes('')){
            announce(TIE)
        }
    }

    const announce = (type) =>{
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'O jogador <span class="playerO">O</span> ganhou!';
                break;
            case PLAYERX_WON:
                    announcer.innerHTML = 'O jogador <span class="playerX">X</span> ganhou!';
                break;
            case TIE:
                    announcer.innerText = 'Empate :(';


            }
            announcer.classList.remove('hide')
    }

    const isValidAction = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true
    } // aqui ele está dizendo o seguinte, se dentro da div estiver o indice 'X' ou indice 'O' então return false, que é basicamente uma forma de bloquear, se n, return true.

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () =>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O': 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);

    }
    const userAction = (tile, index) =>{
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer ; 
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
            
          }
        }

    const resetBoard = () => {
        board = ['','','','','','','','','',]
        isGameActive = true;
        announcer.classList.add('hide')
        if (currentPlayer === 'O'){
            changePlayer();
        }
        tiles.forEach(tile =>{
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO')
        })
    }

    

    tiles.forEach((tile, index) =>{
        tile.addEventListener('click',() => userAction(tile, index))
    })


    resetButton.addEventListener('click', resetBoard)
})