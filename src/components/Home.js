import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Board from './Board';

const Home = ({
  socket,
  newGame,
  first_player,
  second_player,
  gameFinished,
}) => {
  const [updater, setUpdater] = useState(0);
  useEffect(() => {
    setUpdater(updater + 1);
  }, []);

  return (
    <div>
      <Banner />
      <Board
        socket={socket}
        first_player={first_player}
        second_player={second_player}
        newGame={newGame}
        gameFinished={gameFinished}
      />
    </div>
  );
};

export default Home;
