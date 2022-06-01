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
    state
  }
})();

let game = (() => {
  let players = [];
  let currentPlayer = null
  const setPlayers = (player1, player2) => {
    players.push(player1);
    players.push(player2);
  }
  const turnStart = () => {
    currentPlayer = players.shift();
    domManipulator.turnInfo(currentPlayer.playerName);
    players.push(currentPlayer);
  }
  const placePiece = (e) => {
    console.log(e.target.innerText)
    if (e.target.innerText == '') {
      console.log('empty')
      e.target.innerText = currentPlayer.playerPiece;
      turnStart();
    };
  }
  return {
    setPlayers,
    turnStart,
    placePiece
  }
})();

let domManipulator = (() => {
  const infoBox = document.getElementById('info-box');
  const turnInfo = (playerName) => {
    infoBox.innerText = `${playerName}'s Turn`
  }
  const removeChildren = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    };
  };
  const createSpot = (element, index) => {
    spot = document.createElement('div');
    spot.setAttribute('index', index);
    spot.innerText = element;
    spot.classList.toggle('game_board_spot')
    return spot;
  }
  return {
    turnInfo,
    removeChildren,
    createSpot
  }
})();

let player = (name, piece) => {
  const playerName = name
  const playerPiece = piece;
  return {
    playerName,
    playerPiece
  }
}

game.setPlayers(player('June', 'X'), player('Randall', 'O'));

console.log(gameBoard.state)
gameBoard.setupBoard();
