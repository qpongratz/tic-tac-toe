let gameBoard = (() => {
  let state = Array(9).fill('', 0);
  const boardDiv = document.querySelector('.game_board');

  const getState = () => {
    return state;
  }

  const resetBoard = () => {
    domManipulator.removeChildren(boardDiv);
    state = Array(9).fill('', 0);
    setupBoard();
  }

  const setupBoard = () => {
    state.forEach((element, index) => {
      console.log(index);
      boardDiv.appendChild(domManipulator.createSpot(element, index));
    });
  };

  const placePiece = (piece, spot) => {
    const index = parseInt(spot);
    if (state[index] == '') {
      state[index] = piece;
      domManipulator.placePiece(piece, spot);
      return true;
    } else {
      return false;
    }
  }

  const fullBoard = (boardState = state) => {
    return !(boardState.includes(''));
  }

  const wonBoard = (piece, boardState = state) => {
    const equalPiece = (element) => element == piece;
    return ([boardState[0], boardState[1], boardState[2]].every(equalPiece) ||
            [boardState[3], boardState[4], boardState[5]].every(equalPiece) ||
            [boardState[6], boardState[7], boardState[8]].every(equalPiece) ||
            [boardState[0], boardState[3], boardState[6]].every(equalPiece) ||
            [boardState[1], boardState[4], boardState[7]].every(equalPiece) ||
            [boardState[2], boardState[5], boardState[8]].every(equalPiece) ||
            [boardState[0], boardState[4], boardState[8]].every(equalPiece) ||
            [boardState[2], boardState[4], boardState[6]].every(equalPiece))
  }

  return {
    resetBoard,
    fullBoard,
    wonBoard,
    placePiece,
    getState
  }
})();

let game = (() => {
  let players = [];
  let currentPlayer = null
  let active = false;
  let queuedMove = null;

  const setPlayers = (player1, player2) => {
    players = [];
    players.push(player1);
    players.push(player2);
  }
  const gameSetup = () => {
    clearTimeout(queuedMove);
    gameBoard.resetBoard();
    domManipulator.getPlayerInfo();
  }

  const newMatch = () => {
    clearTimeout(queuedMove);
    gameBoard.resetBoard();
    turnStart();
  }
  const turnStart = () => {
    currentPlayer = players.shift();
    domManipulator.turnInfo(currentPlayer.playerName);
    players.push(currentPlayer);
    console.log(currentPlayer.playerPiece)
    if (currentPlayer.robot) {
      queuedMove = setTimeout(robotMove, 500);
    } else {
      active = true;
    };
  }
  const robotMove = () => {
    gameBoard.placePiece(currentPlayer.playerPiece, currentPlayer.makeMove(gameBoard.getState()));
    checkEnd();
  }
  const placePiece = (e) => {
    if (!active) return false;
    const spot = e.target.getAttribute('index');
    if (!gameBoard.placePiece(currentPlayer.playerPiece, spot)) return false;

    checkEnd();
  }
  const checkEnd = () => {
    active = false;
    if (gameBoard.wonBoard(currentPlayer.playerPiece)) {
      domManipulator.winInfo(currentPlayer.playerName, currentPlayer.playerPiece);
      return;
    } else if (gameBoard.fullBoard()) {
      domManipulator.drawInfo();
      return;
    } else {
      turnStart();
    };
  };

  return {
    gameSetup,
    setPlayers,
    turnStart,
    placePiece,
    newMatch
  }
})();

let domManipulator = (() => {
  const infoBox = document.getElementById('info-box');
  const playerModal = document.getElementById('player_modal');
  const player1NameInput = document.getElementById('player1_name');
  const player1ComputerStatus = document.getElementById('player1_computer')
  const player2NameInput = document.getElementById('player2_name');
  const player2ComputerStatus = document.getElementById('player2_computer');
  const playerInfoForm = document.getElementById('player_info_form')

  const getPlayerInfo = () => {
    playerModal.classList.remove('hidden');
  };

  playerInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const player1Name = player1NameInput.value;
    const player2Name = player2NameInput.value;
    let player1 = (player1ComputerStatus.checked) ? computer(player1Name, 'X') : player(player1Name, 'X');
    let player2 = (player2ComputerStatus.checked) ? computer(player2Name, 'O') : player(player2Name, 'O');
    game.setPlayers(player1, player2);
    playerModal.classList.add('hidden');
    game.turnStart();
  });

  const turnInfo = (playerName) => {
    infoBox.innerText = `${playerName}'s Turn`;
  };

  const winInfo = (playerName, playerPiece) => {
    infoBox.innerText = `${playerName} Wins!`;
    const spots = document.querySelectorAll('.game_board_spot');
    spots.forEach( (spot) => {
      if (spot.innerText == playerPiece) {
        spot.classList.toggle('winner');
      } else {
        spot.classList.toggle('loser');
      };
    });
  };

  const drawInfo = () => {
    infoBox.innerText = "Tie Game.";
  };

  const removeChildren = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    };
  };
  const createSpot = (element, index) => {
    spot = document.createElement('button');
    spot.setAttribute('index', index);
    spot.innerText = element;
    spot.classList.toggle('game_board_spot');
    spot.addEventListener('click', game.placePiece);
    return spot;
  };

  const placePiece = (text, indexAttribute) => {
    const spot = document.querySelector(`[index="${indexAttribute}"]`);
    spot.innerText = text;
  };

  return {
    turnInfo,
    winInfo,
    drawInfo,
    removeChildren,
    createSpot,
    placePiece,
    getPlayerInfo
  }
})();

let player = (name, piece) => {
  const playerName = name;
  const playerPiece = piece;
  return {
    playerName,
    playerPiece
  }
}

let computer = (name, piece) => {
  const playerName = name;
  const playerPiece = piece;
  const robot = true;
  const availableMoves = (boardState) => {
    let moves = []
    boardState.forEach((element, index) => {
      if (element == '') {
        moves.push(index);
      };
    });
    return moves;
  };
  const makeMove = (boardState) => {
    let potentialMoves = availableMoves(boardState);
    return chooseMove(potentialMoves);
  };
  const chooseMove = (arrayOfMoves) => {
    const randomIndex = Math.floor(Math.random() * arrayOfMoves.length);
    const choice = arrayOfMoves[randomIndex];
    return choice;
  };
  return{
    playerName,
    playerPiece,
    robot,
    makeMove
  }
}

const newGame = document.getElementById('new_game')
const resetPlayers = document.getElementById('reset_players')

newGame.addEventListener('click', game.newMatch);
resetPlayers.addEventListener('click', game.gameSetup);

game.gameSetup();