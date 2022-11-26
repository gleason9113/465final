import React, { useRef, useState } from 'react';
import Form from './Form';
import HowToPlay from './HowToPlay';
import About from './About';
import Buttons from './Buttons';
import Container from './Container';
import Home from './Home';

// set up buttons to navigate bewtween pages? Or we can do navbar. still thinking
function ButtonHandler({ socket }) {
  const [show, setShow] = useState(null);
  const linked = useRef(false);
  const newGame = useRef(true);
  const first_player = useRef('');
  const second_player = useRef('');

  // handles click of Home button
  const handleHome = () => {
    linked.current = true;
    if (newGame.current === false) {
      setShow(
        <Container
          socket={socket}
          newGame={newGame}
          first_player={first_player}
          second_player={second_player}
        />
      );
    } else {
      setShow(
        <Home
          socket={socket}
          newGame={newGame}
          first_player={first_player}
          second_player={second_player}
        />
      );
    }
  };

  // handles click of About button
  const handleAbout = () => {
    linked.current = true;
    setShow(<About />);
  };

  const handleHowToPlay = () => {
    linked.current = true;
    setShow(<HowToPlay />);
  };

  // handles click of Connect button
  const handleConnect = () => {
    linked.current = true;
    setShow(<Form />);
  };

  if (linked.current === true) {
    return (
      <div>
        <Buttons
          handleAbout={handleAbout}
          handleHowToPlay={handleHowToPlay}
          handleConnect={handleConnect}
          handleHome={handleHome}
        />
        <>{show}</>
      </div>
    );
  } else {
    return (
      <div>
        <Buttons
          handleAbout={handleAbout}
          handleHowToPlay={handleHowToPlay}
          handleConnect={handleConnect}
          handleHome={handleHome}
        />
        <Container
          socket={socket}
          first_player={first_player}
          second_player={second_player}
          newGame={newGame}
        />
      </div>
    );
  }
}

export default ButtonHandler;