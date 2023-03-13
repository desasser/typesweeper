# Typesweeper

A project to practice Typescript using React and mimicing the classic game, Minesweeper

## Play Typesweeper

To setup and run this game locally, clone the repository and install the dependencies. Then run `npm start` and load the page to try it out.

## Requirements

Develop a clone of Minesweeper
* Should follow behavior of minesweeper, including all functionality for placing flags, question marks, revealing squares, etc
* Should be scalable from small to large to custom size
* Should be able to be re-set at any time
* Should reveal all mines when a mine is clicked and prompt a game-over screen and a play again button

## PsuedoCode/Logic

* Take in a size from user (W x H)
* Create a grid of buttons the size specified
* Randomize the location of X mines in the grid, where X is provided by the user
* Based on the mine locations, generate values for all cells touching mines
* In all other cells, grid should be blank
* When a button is clicked, if it is a mine, end the game
* If it is a number, reveal the number
* If it is a space, reveal all spaces and numbers continuously touching
* If the user right clicks, provide options to add flag or question mark as desired
* If the user middle clicks/dbl clicks/etc a number, reveal adjacent squares - To Be Added Later
* Clicking should not reveal flagged or questioned squares, but can enable removing the flag/question - Marks to be added later
* Once all squares are revealed or all mines are flagged, game ends as a Win

### Mobile Specific - Outside of scope

* Size restrictions based on screen size?
* Gesture/Touch controls

### To-Do

* Form should be a separate component and fields should have validation  
* Rectangular shapes break it  
* Entering more mines than cells breaks it  
* Turn off click events outside of 'modal' or set all click events outside of modal to reset game and close the modal
* Reduce duplicate code (CSS, some utility functions, win/loss component, etc)
* Add functionality to reveal adjacent squares when number is clicked on
* Build context menu wheel
* Improve modal structure and CSS