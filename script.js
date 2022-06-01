let gameBoard = (() => {
  let board = new Array(9);
  return {
    board
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
    console.log(currentPlayer.playerName);
    players.push(currentPlayer);
  }
  return {
    setPlayers,
    turnStart
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

let player = (name) => {
  let playerName = name
  return {
    playerName
  }
}

game.setPlayers(player('June'), player('Randall'));

game.turnStart();
game.turnStart();
game.turnStart();
game.turnStart();
game.turnStart();
