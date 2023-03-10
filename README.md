# Typesweeper

A project to practice Typescript using React and mimicing the classic game, Minesweeper

## Available Scripts

To setup and run this game locally, please pull the repository and install the dependencies. Then run `npm start` and load the page to try it out.

## Requirements

Develop a clone of Minesweeper
* Should follow behavior of minesweeper, including all functionality for placing flags, question marks, revealing squares, etc
* Should be scalable from small to large to custom size
* Should be able to be re-set at any time
* Should reveal all mines when a mine is clicked and prompt a game-over screen and a play again button

## PsuedoCode/Logic

* Take in a size from user
* Create a grid of buttons the size specified
* Randomize the location of X mines in the grid, where X is proportional the size of the grid specified
* Based on the mine locations, generate values for all cells touching mines underneath the buttons
* In all other cells, grid should be blank
* When a button is clicked, if it is a mine, end the game
* If it is a number, reveal the number
* If it is a space, reveal all spaces and numbers continuously touching
* If the user right clicks/cntrl clicks/etc, provide options to add flag or question mark as desired
* If the user middle clicks/dbl clicks/etc a number, reveal adjacent squares
* Clicking should not reveal flagged or questioned squares, but can enable removing the flag/question
* Once all squares are revealed or all mines are flagged, game ends as a Win

### Mobile Specific

* Size restrictions based on screen size?
* Gesture/Touch controls