let gameBoard = (() => {
  let currentPiece = '';
  let board = document.querySelectorAll('.game_board_spot');
  const setupBoard = () => {
    board.forEach((element) => {
      element.addEventListener('click', game.placePiece);
    });
  };


  return {
    setupBoard,
    board,
    currentPiece
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
    displayController.turnInfo(currentPlayer.playerName);
    players.push(currentPlayer);
  }
  const placePiece = () => {
    console.log(currentPlayer.playerPiece);
    turnStart();
  }
  return {
    setPlayers,
    turnStart,
    placePiece
  }
})();

let displayController = (() => {
  const infoBox = document.getElementById('info-box');
  const turnInfo = (playerName) => {
    infoBox.innerText = `${playerName}'s Turn`
  }
  return {
    turnInfo
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

console.log(gameBoard.board);
gameBoard.setupBoard();
game.turnStart();
game.turnStart();
game.turnStart();
