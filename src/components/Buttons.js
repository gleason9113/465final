import React from 'react';

// set up buttons to navigate bewtween pages? Or we can do navbar. still thinking
function Buttons({ handleAbout, handleConnect, handleHowToPlay, handleHome }) {
  return (
    <div className="nav-container mx-auto my-auto text-center">
      <button className="nav-btn" id="home" type="button" onClick={handleHome} aria-label="home">
        Home
      </button>
      <button
        className="nav-btn"
        id="about"
        type="button"
        onClick={handleAbout}
        aria-label="about"
      >
        About
      </button>
      <button
        className="nav-btn"
        id="connect"
        type="button"
        onClick={handleConnect}
        aria-label="connect"
      >
        Connect
      </button>
      <button
        className="nav-btn"
        id="how"
        type="button"
        onClick={handleHowToPlay}
        aria-label="how"
      >
        How To Play
      </button>
    </div>
  );
}

export default Buttons;
