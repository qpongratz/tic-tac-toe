let gameBoard = (() => {
  let currentPiece = '';
  let board = document.querySelectorAll('.game_board_spot');
  const setupBoard = () => {
    board.forEach((element, index) => {
      element.addEventListener('click', game.placePiece);
      element.setAttribute('index', index);
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

let displayController = (() => {
  const infoBox = document.getElementById('info-box');
  const turnInfo = (playerName) => {
    infoBox.innerText = `${playerName}'s Turn`
  }
  const setPiece = (spot, piece) => {

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
