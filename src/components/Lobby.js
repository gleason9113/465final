import React, { Component } from 'react'
import Board from './Board';
import Socket from './Socket';

class Lobby extends Component {   
  constructor(props){
    super(props);
    this.state = {
      isPlayer_one:this.props.isPlayer_one,
      code: this.props.code,
      gamestate: this.props.gamestate   
    }
  }

  componentDidMount=()=>{
    Socket.on("update",(gamestate)=> {
      this.setState({gamestate: gamestate})
      
    })
  }

  render=()=>{
    const gamestate = this.state.gamestate;  
    return(
      <div>
        {this.props.waiting && <h2>Waiting...</h2>}
        {!this.props.waiting && <Game gamestate={gamestate} isPlayer_one={this.props.isPlayer_one}/>}
      </div>
    )
  }
}

class Game extends Component{
  state={
    announcement: false,
    message: "",
    OpponentDisconnected: false
  }

  componentDidMount=()=> {
    Socket.on("announcement", (text)=>{
      switch (text){
        case "player_one":
          if(this.props.isPlayer_one){
            this.setState({
              announcement:true,
              message: "You Won!"
            });
          }
          else{
            this.setState({
              announcement:true,
              message: "You Lost"
            }
            );
          }
          break;
        case "player_two":
          if(this.props.isPlayer_one){
            this.setState({
              announcement:true,
              message: "You Lost"
            });
          }
          else{
            this.setState({
              announcement:true,
              message: "You Won!"
            });
          }
          break;
        case "tie":
          this.setState({
            announcement:true,
            message: "Tie"
          });
          break;
        default:  
          this.setState({
            annoucement:false,
            message: "Oops!"
          });
          break;
      }
      setTimeout(()=>{
        this.setState({announcement: false});
      }, 1250);
    })

  Socket.on("user-disconnected", ()=>{
    this.setState({OpponentDisconnected:true});
  })
}

render(){
  const gamestate = this.props.gamestate;
  

  return(
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%"}}>
      {this.state.OpponentDisconnected && <h6>Opponent Disconnected :( </h6>} 
      {!this.state.OpponentDisconnected && 
      <div className="game">
        <div className="board-container">
          <Board gamestate={gamestate} isPlayer_one={this.props.isPlayer_one}/>     
        </div> 
      </div>
      }
    </div>
  )
  
  }
}

export default Lobby;
/*
class Waiting extends Component{
render(){
  return (
    <AnimatePresence>
      <motion.div className="waiting-lobby" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} >
          <h5>Waiting for someone to join</h5>
          <Spinner color="dark"></Spinner>
          <h6>Click to Copy Session Code:</h6>
          <Button onClick={()=> {navigator.clipboard.writeText(this.props.code)}}>{this.props.code}</Button>
          
      </motion.div>
    </AnimatePresence>
  )
}
}

&&
      <AnimatePresence>
        <motion.div style={{display:"flex", alignItems:"center", justifyContent:"center",height:"100%",position:"absolute",left:"0%",top:"0%",width:"100%"}}
        initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <h6>Opponent Disconnected :( </h6>
*/