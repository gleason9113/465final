/* eslint-disable no-unused-expressions, no-undef */
const should = require('should');
const axios = require('axios');

const baseUrl = 'http://localhost:8080';

let server;
const sockets = [];
const startApp = (done) => {
  server = require('../server/index.js');
  done();
};
const stopApp = (done) => {
  server.closeServer();
  done();
};
const testBothJoinSuccessfully = (done) => {
  sockets[0] = require('socket.io-client')(baseUrl);
  sockets[1] = require('socket.io-client')(baseUrl);
  setTimeout(() => {
    const socket_id1 = sockets[0].id;
    const socket_id2 = sockets[1].id;
    const url1 = `${baseUrl}/join?socket_id=${socket_id1}&playerName=player1`;
    const url2 = `${baseUrl}/join?socket_id=${socket_id2}&playerName=player2`;
    axios.get(url1).then((res1) => {
      res1.status.should.be.equal(200);
      res1.data.playerName.should.be.equal('player1');
      res1.data.symbol.should.be.equal('X');
      axios.get(url2).then((res2) => {
        res2.status.should.be.equal(200);
        res2.data.playerName.should.be.equal('player2');
        res2.data.symbol.should.be.equal('O');
      }).catch((err) => done(err));
    }).catch((err) => done(err));
    let bothDone = 0;
    sockets[0].on('opponentAvailable', (data) => {
      data.status.should.be.equal('ok');
      data.msg.should.be.equal('you have an opponent');
      data.data.isYourTurn.should.be.equal(true); // for player 1
      data.data.opponentName.should.be.equal('player2'); // for player 1
      bothDone++;
      if (bothDone === 2) done();
    });
    sockets[1].on('opponentAvailable', (data) => {
      data.status.should.be.equal('ok');
      data.msg.should.be.equal('you have an opponent');
      data.data.isYourTurn.should.be.equal(false); // for player 2
      data.data.opponentName.should.be.equal('player1'); // for player 2
      bothDone++;
      if (bothDone === 2) done();
    });
  }, 200); // wait for sockets to setup
};
const testOnlyOnePlayerPlay = (done) => {
  sockets[2] = require('socket.io-client')(baseUrl);
  setTimeout(() => {
    const socket_id = sockets[2].id;
    const url = `${baseUrl}/join?socket_id=${socket_id}&playerName=player3`;
    axios.get(url).then((res1) => {
      res1.status.should.be.equal(200);
      res1.data.playerName.should.be.equal('player3');
      res1.data.symbol.should.be.equal('X');
      sockets[2].emit('move', { move_id: 0 });
      sockets[2].once('move_done', (data) => {
        data.status.should.be.equal('error');
        data.msg.should.be.equal('Player attempting to play in a game that is not fully initialized. You dont have an opponent yet');
        data.errorCode.should.be.equal(3);
        should(data.data).not.be.ok;
        done();
      });
    }).catch((err) => done(err));
  }, 200); // wait for sockets to setup
};
const testJoinGamePlayer4 = (done) => {
  sockets[3] = require('socket.io-client')(baseUrl);
  setTimeout(() => {
    const socket_id = sockets[3].id;
    const url = `${baseUrl}/join?socket_id=${socket_id}&playerName=player4`;
    axios.get(url).then((res1) => {
      res1.status.should.be.equal(200);
      res1.data.playerName.should.be.equal('player4');
      res1.data.symbol.should.be.equal('O');
    }).catch((err) => done(err));
    sockets[3].once('opponentAvailable', (data) => {
      data.status.should.be.equal('ok');
      data.msg.should.be.equal('you have an opponent');
      data.data.isYourTurn.should.be.equal(false); // for player 4
      data.data.opponentName.should.be.equal('player3'); // for player 4
      done();
    });
  }, 200); // wait for sockets to setup
};
const testJoinPlayer56Success = (done) => {
  sockets[4] = require('socket.io-client')(baseUrl);
  sockets[5] = require('socket.io-client')(baseUrl);
  setTimeout(() => {
    const socket_id1 = sockets[4].id;
    const socket_id2 = sockets[5].id;
    const url1 = `${baseUrl}/join?socket_id=${socket_id1}&playerName=player5`;
    const url2 = `${baseUrl}/join?socket_id=${socket_id2}&playerName=player6`;
    axios.get(url1).then((res1) => {
      res1.status.should.be.equal(200);
      res1.data.playerName.should.be.equal('player5');
      res1.data.symbol.should.be.equal('X');
      axios.get(url2).then((res2) => {
        res2.status.should.be.equal(200);
        res2.data.playerName.should.be.equal('player6');
        res2.data.symbol.should.be.equal('O');
      }).catch((err) => done(err));
    }).catch((err) => done(err));
    let bothDone = 0;
    sockets[4].on('opponentAvailable', (data) => {
      data.status.should.be.equal('ok');
      data.msg.should.be.equal('you have an opponent');
      data.data.isYourTurn.should.be.equal(true); // for player 5
      data.data.opponentName.should.be.equal('player6'); // for player 5
      bothDone++;
      if (bothDone === 2) done();
    });
    sockets[5].on('opponentAvailable', (data) => {
      data.status.should.be.equal('ok');
      data.msg.should.be.equal('you have an opponent');
      data.data.isYourTurn.should.be.equal(false); // for player 6
      data.data.opponentName.should.be.equal('player5'); // for player 6
      bothDone++;
      if (bothDone === 2) done();
    });
  }, 200); // wait for sockets to setup
};
const testPlayer4OutOfTurn = (done) => {
  sockets[3].emit('move', { move_id: 0 });
  sockets[3].once('move_done', (data) => {
    data.status.should.be.equal('error');
    data.msg.should.be.equal('player attempting to play out of turn');
    data.errorCode.should.be.equal(5); // out of turn
    should(data.data).not.be.ok;
    done();
  });
};
const testPlayer3Move0Sucess = (done) => {
  sockets[2].once('move_done', (data) => {
    data.status.should.be.equal('success');
    data.msg.should.be.equal('player moved to position 0');
    should(JSON.stringify(data.data.boardState)).be.equal('["X","","","","","","","",""]');
    should(data.data.gameWinner).not.be.ok;
    done();
  });
  sockets[2].emit('move', { move_id: 0 });
};
const testPlayer4Move0Fail = (done) => {
  sockets[3].once('move_done', (data) => {
    data.status.should.be.equal('error');
    data.errorCode.should.be.equal(4); // already taken
    data.msg.should.be.equal('player attempting to move to a slot in the game that already has a symbol in it');
    should(data.data).not.be.ok;
    done();
  });
  sockets[3].emit('move', { move_id: 0 });
};
const testPlayer4Move10Fail = (done) => {
  sockets[3].once('move_done', (data) => {
    data.status.should.be.equal('error');
    data.errorCode.should.be.equal(2); // invalid move id
    data.msg.should.be.equal('you did not provide a valid move id, you need to provide data that looks like {move_id: move_id}, where move_id is an interger that corresponds to an index in the board array');
    should(data.data).not.be.ok;
    done();
  });
  sockets[3].emit('move', { move_id: 10 });
};
const testPlayers34DrawConditionMove2 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 4');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","","","","O","","","",""]');
      should(data.data.gameWinner).not.be.ok;
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[3].once('move_done', handler);
  sockets[2].once('move_done', handler);
  sockets[3].emit('move', { move_id: 4 });
  // x - -
  // - o -
  // - - -
};
const testPlayers34DrawConditionMove3 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 3');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","","","X","O","","","",""]');
      should(data.data.gameWinner).not.be.ok;
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[3].once('move_done', handler);
  sockets[2].once('move_done', handler);
  sockets[2].emit('move', { move_id: 3 });
  // x - -
  // x o -
  // - - -
};
const testPlayers34DrawConditionMove4 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 6');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","","","X","O","","O","",""]');
      should(data.data.gameWinner).not.be.ok;
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[2].once('move_done', handler);
  sockets[3].once('move_done', handler);
  sockets[3].emit('move', { move_id: 6 });
  // x - -
  // x o -
  // o - -
};
const testPlayers34DrawConditionMove5 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 2');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","","X","X","O","","O","",""]');
      should(data.data.gameWinner).not.be.ok;
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[2].once('move_done', handler);
  sockets[3].once('move_done', handler);
  sockets[2].emit('move', { move_id: 2 });
  // x - x
  // x o -
  // o - -
};
const testPlayers34DrawConditionMove6 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 1');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","O","X","X","O","","O","",""]');
      should(data.data.gameWinner).not.be.ok;
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[2].once('move_done', handler);
  sockets[3].once('move_done', handler);
  sockets[3].emit('move', { move_id: 1 });
  // x o x
  // x o -
  // o - -
};
const testPlayers34DrawConditionMove7 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 7');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","O","X","X","O","","O","X",""]');
      should(data.data.gameWinner).not.be.ok;
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[2].once('move_done', handler);
  sockets[3].once('move_done', handler);
  sockets[2].emit('move', { move_id: 7 });
  // x o x
  // x o -
  // o x -
};
const testPlayers34DrawConditionMove8 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 5');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","O","X","X","O","O","O","X",""]');
      should(data.data.gameWinner).not.be.ok;
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[2].once('move_done', handler);
  sockets[3].once('move_done', handler);
  sockets[3].emit('move', { move_id: 5 });
  // x o x
  // x o o
  // o x -
};
const testPlayers34DrawConditionMove9 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 8');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","O","X","X","O","O","O","X","X"]');
      data.data.gameWinner.should.be.equal(2); // DRAW CONDITION
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[2].once('move_done', handler);
  sockets[3].once('move_done', handler);
  sockets[2].emit('move', { move_id: 8 });
  // x o x
  // x o o
  // o x x
};
const testPlayers12Player1WindsMove1 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 0');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","","","","","","","",""]');
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[0].once('move_done', handler);
  sockets[1].once('move_done', handler);
  sockets[0].emit('move', { move_id: 0 });
  // X - -
  // - - -
  // - - -
};
const testPlayers12Player1WindsMove2 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 1');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","O","","","","","","",""]');
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[0].once('move_done', handler);
  sockets[1].once('move_done', handler);
  sockets[1].emit('move', { move_id: 1 });
  // X O -
  // - - -
  // - - -
};
const testPlayers12Player1WindsMove3 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 4');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","O","","","X","","","",""]');
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[0].once('move_done', handler);
  sockets[1].once('move_done', handler);
  sockets[0].emit('move', { move_id: 4 });
  // X O -
  // - X -
  // - - -
};
const testPlayers12Player1WindsMove4 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 2');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","O","O","","X","","","",""]');
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[0].once('move_done', handler);
  sockets[1].once('move_done', handler);
  sockets[1].emit('move', { move_id: 2 });
  // X O O
  // - X -
  // - - -
};
const testPlayers12Player1WindsMove5 = (done) => {
  let bothDone = 0; const
    handler = (data) => {
      data.status.should.be.equal('success');
      data.msg.should.be.equal('player moved to position 8');
      should(JSON.stringify(data.data.boardState)).be.equal('["X","O","O","","X","","","","X"]');
      data.data.gameWinner.should.be.equal(0); // PLAYER 1 WINS CONDITION
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[0].once('move_done', handler);
  sockets[1].once('move_done', handler);
  sockets[0].emit('move', { move_id: 8 });
  // X O O
  // - X -
  // - - X
};
const player1SendChatMessageTest = (done) => {
  const handler = (data) => {
    data.status.should.be.equal('error');
    data.msg.should.be.equal('player attempting to chat without being in a game, join this player to a game with GET to /join');
    data.errorCode.should.be.equal(1);
    done();
  };
  sockets[0].once('chat_done', handler);
  sockets[0].emit('chat', { message: 'hey player 2, what is up?' });
};
const player5SendChatMessageTest = (done) => {
  let bothDone = 0; const handler1 = (data) => {
    data.status.should.be.equal('ok');
    data.msg.should.be.equal('sent message successfully to player');
    data.data.message.should.be.equal('hey player 6, what is up?');
    data.data.from.should.be.equal('player5');
    data.data.to.should.be.equal('player6');
    bothDone++;
    if (bothDone === 2) done();
  }; const
    handler2 = (data) => {
      data.status.should.be.equal('ok');
      data.msg.should.be.equal('you have a message');
      data.data.message.should.be.equal('hey player 6, what is up?');
      data.data.from.should.be.equal('player5');
      data.data.to.should.be.equal('player6');
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[4].once('chat_done', handler1);
  sockets[5].once('chat_done', handler2);
  sockets[4].emit('chat', { message: 'hey player 6, what is up?' });
};
const player6SendChatMessageTest = (done) => {
  let bothDone = 0; const handler1 = (data) => {
    data.status.should.be.equal('ok');
    data.msg.should.be.equal('sent message successfully to player');
    data.data.message.should.be.equal('sup player 5, im good.');
    data.data.from.should.be.equal('player6');
    data.data.to.should.be.equal('player5');
    bothDone++;
    if (bothDone === 2) done();
  }; const
    handler2 = (data) => {
      data.status.should.be.equal('ok');
      data.msg.should.be.equal('you have a message');
      data.data.message.should.be.equal('sup player 5, im good.');
      data.data.from.should.be.equal('player6');
      data.data.to.should.be.equal('player5');
      bothDone++;
      if (bothDone === 2) done();
    };
  sockets[5].once('chat_done', handler1);
  sockets[4].once('chat_done', handler2);
  sockets[5].emit('chat', { message: 'sup player 5, im good.' });
};
describe('Start', () => {
  before(startApp);
  it('start', (done) => { done(); });
});
describe('Join game tests', () => {
  it('player 1 and 2 both join successfully', testBothJoinSuccessfully);
  it('player 3 joins and no other player but attempts to play', testOnlyOnePlayerPlay);
  it('player 4 joins player 3 game', testJoinGamePlayer4);
  it('player 5 and 6 both join successfully', testJoinPlayer56Success);
});
describe('Play game tests', () => {
  it('player 4 attempts to play out of turn', testPlayer4OutOfTurn);
  it('player 3 moves to position 0 successfully', testPlayer3Move0Sucess);
  it('player 4 fails to move position 0', testPlayer4Move0Fail);
  it('player 4 fails to move position 10', testPlayer4Move10Fail);
  it('player 3 and 4 keep playing valid moves until draw, move 2', testPlayers34DrawConditionMove2);
  it('player 3 and 4 keep playing valid moves until draw, move 3', testPlayers34DrawConditionMove3);
  it('player 3 and 4 keep playing valid moves until draw, move 4', testPlayers34DrawConditionMove4);
  it('player 3 and 4 keep playing valid moves until draw, move 5', testPlayers34DrawConditionMove5);
  it('player 3 and 4 keep playing valid moves until draw, move 6', testPlayers34DrawConditionMove6);
  it('player 3 and 4 keep playing valid moves until draw, move 7', testPlayers34DrawConditionMove7);
  it('player 3 and 4 keep playing valid moves until draw, move 8', testPlayers34DrawConditionMove8);
  it('player 3 and 4 keep playing valid moves until draw, move 9', testPlayers34DrawConditionMove9);
  it('player 1 and 2 play until player 1 wins move 1', testPlayers12Player1WindsMove1);
  it('player 1 and 2 play until player 1 wins move 2', testPlayers12Player1WindsMove2);
  it('player 1 and 2 play until player 1 wins move 3', testPlayers12Player1WindsMove3);
  it('player 1 and 2 play until player 1 wins move 4', testPlayers12Player1WindsMove4);
  it('player 1 and 2 play until player 1 wins move 5', testPlayers12Player1WindsMove5);
});
describe('Chat tests', () => {
  it('player 1 send chat message test - fails because game is over and player needs to rejoin', player1SendChatMessageTest);
  it('player 5 send chat message test - success', player5SendChatMessageTest);
  it('player 6 send chat message test - success', player6SendChatMessageTest);
});
describe('End', () => {
  after(stopApp);
  it('end', (done) => { done(); });
});
