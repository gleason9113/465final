/**
 * @jest-environment jsdom
 */

//Testing for App.js file
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import MockedSocket from 'socket.io-mock';

import Banner from './components/Banner';
import Board from './components/Board';
import Chat from './components/Chat';
import About from './components/About';
import HowToPlay from './components/HowToPlay';
import Buttons from './components/Buttons';


afterEach(cleanup);


describe("Banner Tests", () => {
  test("Page contains an <h1> element.", () => {
    render(<Banner />);
    const banner = screen.getByRole('heading')
    expect(banner).toBeDefined();
  })

  test("Page contains the correct text.", () => {
    render(<Banner />);
    const banner = screen.getByRole('heading');
    expect(banner).toHaveTextContent('Tic-Tac-Toe');
  })
  
})

describe("Board Tests", () => {
  test("Board contains row 0", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("row-0")).toBeTruthy();
  })

  test("Board contains row 1", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("row-1")).toBeTruthy();
  })
  
  test("Board contains row 2", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("row-2")).toBeTruthy();
  })

  test("Board contains cell 0", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 0")).toBeTruthy();
  })
  
  test("Board contains cell 1", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 1")).toBeTruthy();
  })

  test("Board contains cell 2", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 2")).toBeTruthy();
  })

  test("Board contains cell 3", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 3")).toBeTruthy();
  })

  test("Board contains cell 4", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 4")).toBeTruthy();
  })

  test("Board contains cell 5", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 5")).toBeTruthy();
  })

  test("Board contains cell 6", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 6")).toBeTruthy();
  })

  test("Board contains cell 7", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 7")).toBeTruthy();
  })

  test("Board contains cell 8", () => {
    let socket = new MockedSocket();
    render(<Board socket={socket} />);
    expect(screen.getByLabelText("cell 8")).toBeTruthy();
  })
})


describe("Chat Tests", () => {
  test("Checks that Chat component contains a Title component", () => {
    window.HTMLElement.prototype.scrollIntoView = function() {}
    let socket = new MockedSocket();
    render(<Chat socket={socket} />);
    let heading = screen.getByRole('heading');
    expect(heading).toBeDefined();
    expect(heading).toContainHTML('<h5 class="display-5">Chat</h5>');
  })

  test("Checks that Chat component contains a History component", () => {
    window.HTMLElement.prototype.scrollIntoView = function() {}
    let socket = new MockedSocket();
    render(<Chat socket={socket} />);
    let history = screen.getByLabelText("chat-history");
    expect(history).toBeDefined();  
  })

  test("Checks that Chat component contains a Message component", () => {
    window.HTMLElement.prototype.scrollIntoView = function() {}
    let socket = new MockedSocket();
    render(<Chat socket={socket} />);
  })
 


})

describe("About Tests", () => {
  test('About page renders correctly', () => {
    // render About on virtual dom
    render(<About />);
  
    // elements to test
    const heading = screen.queryByLabelText('about');
    const p1 = screen.queryByLabelText('p1');
    const p2 = screen.queryByLabelText('p2');
    const p3 = screen.queryByLabelText('p3');
    const p4 = screen.queryByLabelText('p4');
    const project = screen.queryByLabelText('link-project');
    const cera_git = screen.queryByLabelText('cera-git');
    const alex_git = screen.queryByLabelText('alex-git');
    const ariel_git = screen.queryByLabelText('ariel-git');
  
    // interaction
    fireEvent.click(project);
    fireEvent.click(cera_git);
    fireEvent.click(alex_git);
    fireEvent.click(ariel_git);
  
    // expected results
    expect(heading).toHaveTextContent('About');
    expect(p1).toHaveTextContent(
      'This is a CS465/565 Final Project by Ariel, Cera, and Alex'
    );
    expect(p2).toHaveTextContent(
      'We wanted to implement a game using Node.js, React.js, Express.js, and Socket.io'
    );
    expect(p3).toHaveTextContent('We decided on a Tic-Tac-Toe game');
    expect(p4).toHaveTextContent('Our project code can be found in:');
    expect(project).toHaveAttribute(
      'href',
      'https://github.com/gleason9113/465final'
    );
    expect(project).toHaveAttribute('target', '_blank');
    expect(cera_git).toHaveAttribute('href', 'https://github.com/C3ra906');
    expect(cera_git).toHaveAttribute('target', '_blank');
    expect(alex_git).toHaveAttribute('href', 'https://github.com/sashetov');
    expect(alex_git).toHaveAttribute('target', '_blank');
    expect(ariel_git).toHaveAttribute('href', 'https://github.com/gleason9113');
    expect(ariel_git).toHaveAttribute('target', '_blank');
  });
  
})

describe("How To Play tests", () => {
  test('How To Play page renders correctly', () => {
    // variables for easy testing
    const horizontal_wins = ` X | X | X | | | | ----------- ----------- ----------- | | X | X | X | | ----------- ----------- ----------- | | | | X | X | X`;
  
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
  
    const tie_con = ` X | O | X     X | O | O      X | X | O
     -----------   -----------    -----------
      X | X | O     X | O | X      O | O | X
     -----------   -----------    -----------
      O | O | X     O | X | X      X | X | O `;
    // render About on virtual dom
    render(<HowToPlay />);
  
    // elements to test
    const heading = screen.queryByTestId('how_to_header');
    const two = screen.queryByTestId('two_players');
    const rules = screen.queryByTestId('rules');
    const list = screen.queryByTestId('list_of_rules');
    const { getAllByRole } = within(list);  // within needs to be imported from somewhere
    const rule_list = getAllByRole('listitem');  //getAllByRole undefined?  
    const wins = screen.queryByTestId('wins');
    const ties = screen.queryByTestId('ties');
    const h_wins = screen.queryByTestId('h_wins');
    const v_wins = screen.queryByTestId('v_wins');
    const d_wins = screen.queryByTestId('d_wins');
    const tied = screen.queryByTestId('tied');
  
    // expected results
    expect(rule_list.length).toBe(9);  //218 is why this is failing, anyway.
    expect(heading).toHaveTextContent('How to Play Tic-Tac-Toe');
    expect(two).toHaveTextContent('This game is played with two players');
    expect(rules).toHaveTextContent('Rules:');
    expect(wins).toHaveTextContent('Example Wins:');
    expect(ties).toHaveTextContent('Example Tied Conditions:');
    expect(h_wins).toHaveTextContent(horizontal_wins);
    expect(v_wins).toHaveTextContent(vertical_wins);
    expect(d_wins).toHaveTextContent(diagonal_wins);
    expect(tied).toHaveTextContent(tie_con);
  });
})

describe("Buttons Tests", () => {
  test('Buttons function correctly', () => {
    // render About on virtual dom
    const handleHome = jest.fn();
    const handleAbout = jest.fn();
    const handleConnect = jest.fn();
    const handleHowToPlay = jest.fn();

    render(<Buttons handleAbout={handleAbout}
      handleHowToPlay={handleHowToPlay}
      handleConnect={handleConnect}
      handleHome={handleHome} />);
  
    // buttons to test
    const home = screen.queryByLabelText('home');
    const about = screen.queryByLabelText('about');
    const howTo = screen.queryByLabelText('how');
    const connect = screen.queryByLabelText('connect');
    const comment = screen.queryByLabelText('comment');

    expect(home).toBeDefined();
    expect(about).toBeDefined();
    expect(connect).toBeDefined();
    expect(howTo).toBeDefined();
    
  
    // interaction
    fireEvent.click(home);
    fireEvent.click(about);
    fireEvent.click(howTo);
    fireEvent.click(connect);
    
    // expected results
    expect(handleHome).toHaveBeenCalledTimes(1); //TODO apparently this isnt correct  I *think* these functions need to be mocked and passed in when you render the component, but I'm still f=trying toi figure out mocking
    expect(handleAbout).toHaveBeenCalledTimes(1);
    expect(handleHowToPlay).toHaveBeenCalledTimes(1);
    expect(handleConnect).toHaveBeenCalledTimes(1);
   
  })
})
  

  
