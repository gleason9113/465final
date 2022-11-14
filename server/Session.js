class Session {
  sessionName;
  socket1;
  socket2;

  gameState = {
    p1: "",
    p2: "",
    turn: 0,
    grid: [0,0,0,0,0,0,0,0,0],
    winner: ""
  }

  constructor(sName, p1Name, p1Socket, code) {
    this.sessionName = sName;
    this.gameState.p1 = p1Name;
    this.p1Socket = p1Socket;
    this.code = code;
  }

  joinGame = (name, socket) => {
    this.gameState.p2 = name;
    this.socket2 = socket;
  } 

  broadcast = (event, data) => {
    this.socket1.emit(event, data);
    this.socket2.emit(event, data);
  }

  move = (index, value) => {
    this.gameState.grid[index] = value;
    this.gameState.turn === 0 ? this.gameState.turn++ : this.gameState.turn--;
  }

  
  checkWin = () => {
    let players = {"X": "Player 1", "O": "Player 2"};
    for (let i = 0; i < 3; i++) {
      if(this.gameState.grid[i] === this.gameState.grid[i+3] === this.gameState.grid[i+6]) {
        this.gameState.winner = players[this.gameState.grid[i]];
      }
    }
    for(let i = 0; i < 7; i += 3) {
      if(this.gameState.grid[i] === this.gameState.grid[i+1] === this.gameState.grid[i+2]) {
        this.gameState.winner = players[this.gameState.grid[i]];
      }
    }
    if(this.gameState.grid[0] === this.gameState.grid[4] === this.gameState.grid[8] || this.gameState.grid[2] === this.gameState.grid[4] === this.gameState.grid[6]) {
      this.gameState.winner = players[this.gameState.grid[4]];
    }
    if (this.gameState.winner === '')
      this.gameState.winner = () => {
        for(let i=0;i<9;i++){
          if(this.gameState.grid[i] === 0){
            return "tie";
          }
        }
        return "";
      }
  }

  
}

module.exports = {
  Session:Session
}