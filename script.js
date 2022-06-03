let gameBoard = (() => {
  let state = Array(9).fill('', 0);
  const boardDiv = document.querySelector('.game_board');

  const setupBoard = () => {
    domManipulator.removeChildren(boardDiv);
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

  const fullBoard = () => {
    return (state.some((element) => { element == '' }));
  }

  const wonBoard = (piece) => {
    const equalPiece = (element) => element == piece;
    return ([state[0], state[1], state[2]].every(equalPiece) ||
            [state[3], state[4], state[5]].every(equalPiece) ||
            [state[6], state[7], state[8]].every(equalPiece) ||
            [state[0], state[3], state[6]].every(equalPiece) ||
            [state[1], state[4], state[7]].every(equalPiece) ||
            [state[2], state[5], state[8]].every(equalPiece) ||
            [state[0], state[4], state[8]].every(equalPiece) ||
            [state[2], state[4], state[6]].every(equalPiece))
  }

  return {
    setupBoard,
    fullBoard,
    wonBoard,
    placePiece,
    state
  }
})();

let game = (() => {
  let players = [];
  let currentPlayer = null
  let active = false;
  const setPlayers = (player1, player2) => {
    players.push(player1);
    players.push(player2);
  }
  const turnStart = () => {
    currentPlayer = players.shift();
    domManipulator.turnInfo(currentPlayer.playerName);
    players.push(currentPlayer);
    console.log(currentPlayer.playerPiece)
    if (currentPlayer.robot) {
      setTimeout(robotMove, 500);
    } else {
      active = true;
    };
  }
  const robotMove = () => {
    gameBoard.placePiece(currentPlayer.playerPiece, currentPlayer.makeMove(gameBoard.state));
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
      console.log('winner');
      return;
    } else if (gameBoard.fullBoard()) {
      console.log('draw');
      return;
    } else {
      turnStart();
    };
  };

  return {
    setPlayers,
    turnStart,
    placePiece
  }
})();

let domManipulator = (() => {
  const infoBox = document.getElementById('info-box');

  const turnInfo = (playerName) => {
    infoBox.innerText = `${playerName}'s Turn`;
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
    removeChildren,
    createSpot,
    placePiece
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

game.setPlayers(player('June', 'X'), computer('Randall', 'O'));

console.log(gameBoard.state)
gameBoard.setupBoard();
game.turnStart();

computerPlayer = computer('Robot', 'X');
let array = ['x', 'x', '', '', 'o', 'x', '']
computerPlayer.makeMove(array)