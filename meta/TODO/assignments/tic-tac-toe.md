# Tic-Tac-Toe

For this assignment you will design a simple game called "Tic Tac Toe". The game is traditionally played on a 3x3 board between two players `x` and `o`. The two players alternate between each other marking cells in the board. During her turn a player can mark a single cell by placing a symbol in it (either an 'x' or an 'o' character). A player who manages to mark a row, column, or a diagonal completely with his symbol first wins the game. The game ends in a tie if no player manages to win after all the cells have been marked. Refer to examples below:

```
   |   |            x | o | o              x | o | x                 x | o | x
---|---|---        ---|---|---            ---|---|---               ---|---|---
   |   |            o | o | x              o | o | x                 o | o | x
---|---|---        ---|---|---            ---|---|---               ---|---|---
   |   |            o | x | x                |   | x                 o | x | o

Empty Board      Player 'o' wins         Player 'x' wins          Game is a draw
```

## Explorer Mode

- Use appropriate HTML tags and CSS to design a tic-tac-toe board.
- The game can be played by users clicking the game cells, alternating between x and o's turn
- Make sure you indicate who's turn it is.
- Show a modal/alert when the game is over, indicating who won, or a tie.
- Style the page, have fun!
- No linter warnings.

There a dozens of ways to figure out if the game is over (and who won), So I'd like you to spend some time exploring options and try a few things.

## Adventure Mode

- User `sessionStorage` or `localStorage` to persist the game's `state` between page reloads. (Add a reset button)
- CSS: Can you animate the appearance/change from empty cells to X's and O's?

## Epic Mode

It is possible to consistently make a computer play an unbeatable game of Tic Tac Toe. If you feel up to the challenge, make a single player version of the game to play against a computer AI who never lets you win. Hint: "Minimax".