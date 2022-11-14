import React, { Component } from 'react';
import Square from './Square';
import Socket from './Socket';

class Board extends Component { 
  playerMove = index => {
    if(this.state.p1_turn === this.state.isPlayer_one && this.state.grid[index]===0){
      if(this.state.isPlayer_one){
          Socket.emit("move", index, 1);
      }
      else{
          Socket.emit("move", index, -1);
      }
    }
  }

  render = () => {
    const gamestate = this.props.gamestate;
    return (
    <div className="board">
        {gamestate.grid.map((value,index) => {
            return <Square val={value.toString()} index={index} gamestate={{isPlayer_one:this.props.isPlayer_one, ...gamestate}}/>
        })}
    </div>

    )
  }
}
export default Board;

/*
const Board = ({ socket }) => {
  //Hooks
  const [turn, setTurn] = useState(0);
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);

  useEffect(() => {
    const exampleHandler = (data) => {
      console.log(data);
    };
    console.log("socket:", socket);
    window.socket = socket;
    socket.on('move_done', exampleHandler);
    socket.on('client_disconnect', exampleHandler);

    return () => {
      socket.off('move_done', exampleHandler);
      socket.off('client_disconnect', exampleHandler);
    };
  }, [socket]);

  //Variables and constants
  const reference = useRef(null);

  //Functions

  const move = (event, index) => {
    const newBoard = [...boardState];
    const curr = turn === 0 ? 'X' : 'O';
    if (newBoard[index] === '') {
      newBoard[index] = curr;
      event.target.innerHTML = curr;
    }
    setBoard(newBoard);
    console.log(newBoard); 
    socket.emit('move', { boardState: newBoard });
    setTurn(turn === 0 ? 1 : 0);
  }

 
  return (
    <div ref={reference} className="container-sm w-50">
      <div className="row">
        <div className="col cell text-center" 
            id="0" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
            aria-label="cell 0">     
        </div>
        <div className="col cell text-center" 
            id="1" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 1">     
        </div>
        <div className="col cell text-center" 
            id="2" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
            aria-label="cell 2">     
        </div>
      </div>
      <div className="row text-center">
      <div className="col cell text-center" 
            id="3" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 3">     
        </div>
        <div className="col cell text-center" 
            id="4" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 4">     
        </div>
        <div className="col cell text-center" 
            id="5" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 5">     
        </div>
      </div>
      <div className="row">
      <div className="col cell text-center" 
            id="6" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 6">     
        </div>
        <div className="col cell text-center" 
            id="7" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 7">     
        </div>
        <div className="col cell text-center" 
            id="8" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 8">     
        </div>
      </div>
    </div>
  );
};

*/