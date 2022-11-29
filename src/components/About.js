import React from 'react';

function About() {
  console.log('in About');

  return (
    <div className="container mx-auto text-center">
      <h1 className="about display-1" aria-label="about">About</h1>
      <p aria-label="p1">This is a CS465/565 Final Project by Ariel, Cera, and Alex</p>
      <p aria-label="p2">
        We wanted to implement a game using Node.js, React.js, Express.js, and
        Socket.io
      </p>
      <p aria-label="p3">We decided on a Tic-Tac-Toe game</p>
      <p aria-label="p4">Our project code can be found in: </p>
      <p>
        <a
          href="https://github.com/gleason9113/465final"
          target="_blank"
          rel="noreferrer"
          aria-label="link-project"
        >
          Project
        </a>
      </p>
      <p>More about each of us can be found in:</p>
      <p>
        <a href="https://github.com/C3ra906" target="_blank" rel="noreferrer" aria-label="cera-git">
          Cera's Github
        </a>
      </p>
      <p>
        <a href="https://github.com/sashetov" target="_blank" rel="noreferrer" aria-label="alex-git">
          Alex's Github
        </a>
      </p>
      <p>
        <a
          href="https://github.com/gleason9113" 
          target="_blank"
          rel="noreferrer"
          aria-label="ariel-git"
        >
          Ariel's Github
        </a>
      </p>
    </div>
  );
}

export default About;
