const http = require("http"),
  express = require("express"),
  app = express(),
  socketIo = require("socket.io");
const fs = require("fs");
const server = http.Server(app).listen(8080);
const io = socketIo(server);
const Session = require('./Session').Session;

let codeToSession = {}; //only for joining lobbies
let SocketToSession ={};


app.use(express.static(__dirname + "/../build/"));
app.use(express.static(__dirname + "/../node_modules/"));

function socketEvents(socket){
  //session create (player 1)
  socket.on("create-session",(pName, sName)=> {
    //create new session and store it to two datastructures
    
    let code = Math.floor(Math.random()*1000000).toString();
    const session = new Session(sName, pName, socket, code);

    codeToSession = {...codeToSession, 
                     [sName]:session };
      
    SocketToSession = {...SocketToSession,
                      [socket]:session};
    
    
    socket.emit("session-created",pName,sName,code);
    socket.on("disconnect", ()=> {
        try{
          SocketToSession[socket].player_two_socket.emit("user-disconnected");
        }
        catch(err){
            ;
        }
        
        delete codeToSession[sName];
        delete SocketToSession[socket];
        
        
    })
  })



  //join session (player 2)
  socket.on("join-session",(name, sName) => {

      //failed session code 
      if(codeToSession[sName] === undefined){
          socket.emit("invalid-code");
      }
      else{
          if(!socket) {
            console.log("Not soicket!");
          }
          codeToSession[sName].joinGame(name,socket);
          codeToSession[sName].broadcast("valid-code",codeToSession[sName].gameState);
          SocketToSession = {...SocketToSession,
          [socket]: codeToSession[sName]};

          delete codeToSession[sName];
          socket.on("disconnect", ()=> {
              try{
                  SocketToSession[socket].player_one_socket.emit("user-disconnected");

              }
              catch(err){
                  ;
              }
              
              delete SocketToSession[socket];
          })
      }

  
      
  })

  //game logic
  socket.on("player-move", (index,value)=> {

      
      SocketToSession[socket].PlayerMove(index,value);

      
      switch(SocketToSession[socket].checkWinner()){
          case "player_one":
              
              SocketToSession[socket].Broadcast("announcement","player_one");
              break;
          case "player_two":
              
              SocketToSession[socket].Broadcast("announcement","player_two");
              break;
          case "tie":
              
              SocketToSession[socket].Broadcast("announcement","tie");
              break;
          case "ongoing":
              
              break;
          default:
              console.log("no switch cases hit");
      
      }
      
      
      //TODO: check winners before broadcasting
      SocketToSession[socket].Broadcast("update",SocketToSession[socket].gameState);
      

  })



  
  }

io.on('connection',socketEvents);

  


const port = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req,res)=>{
      res.sendFile(path.join(__dirname,'client','build','index.html'));
  });
}

//server.listen(port);
 

