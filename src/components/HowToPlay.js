import React from 'react';

// Renders HowToPlay page, explaining the game mechanics
function HowToPlay() {
  const horizontal_wins = ` X | X | X       |   |          |   |   
-----------   -----------    -----------
   |   |       X | X | X        |   |
-----------   -----------    -----------
   |   |         |   |        X | X | X `;

  const vertical_wins = ` O |   |         | O |          |   | O 
-----------   -----------    -----------
 O |   |         | O |          |   | O
-----------   -----------    -----------
 O |   |         | O |          |   | O`;

  const diagonal_wins = ` X |   |         |   | O
-----------   -----------
   | X |         | O |   
-----------   -----------
   |   | X     O |   |    `;

  const tied = ` X | O | X     X | O | O      X | X | O
-----------   -----------    -----------
 X | X | O     X | O | X      O | O | X
-----------   -----------    -----------
 O | O | X     O | X | X      X | X | O `;

  return (
    <div className="howtoplay_container">
      <h1
        className="display-1 text-center howtoplay_header"
        data-testid="how_to_header"
      >
        How to Play Tic-Tac-Toe
      </h1>
      <p>This game is played with two players</p>
      <div>
        <p>Rules:</p>
        <ul>
          <li>
            The first player enter their name to connect will be 'Player 1'
          </li>
          <li>
            The second player to enter their name to connect will be 'Player 2'
          </li>
          <li>Player 1 needs to wait until there is a Player 2</li>
          <li>
            Player 1 is assigned the symbol 'X' and Player 2 is assigned the
            symbol 'O'
          </li>
          <li>
            Once there are two players, the game screen will load the 3x3 board
          </li>
          <li>The game is played by clicking on a square of the board</li>
          <li>
            If the move is valid, the chosen square will be marked by the
            player's symbol
          </li>
          <li>
            Whoever is the first to connect 3 of their symbols horizontally,
            vertically, or diagonally wins the game
          </li>
          <li>
            The game will end in a tie if all squares are filled but no one has
            connected 3 of their symbols
          </li>
        </ul>
      </div>
      <div>
        <p>Example Wins:</p>
        <p>
          <pre>{horizontal_wins}</pre>
        </p>
        <p></p>
        <p>
          <pre>{vertical_wins}</pre>
        </p>
        <p></p>
        <p>
          <pre>{diagonal_wins}</pre>
        </p>
      </div>
      <div>
        <p>Example Tied Condition:</p>
        <p>
          <pre>{tied}</pre>
        </p>
      </div>
    </div>
  );
}

export default HowToPlay;
