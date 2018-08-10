// Some variable where you're keeping track of whose turn it is
let currentPlayer = 'x'

// All the possible ways to win
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 6, 3],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// A function to call that will return true if the current player has won the game.
const checkForWinner = () => {
  // Get all the table cells
  const cells = document.querySelectorAll('td')

  // For each possible combination of winning moves
  for (let i = 0; i < winningCombos.length; i++) {
    const winningCombo = winningCombo[i]

    // An array of the contents of the cells in these positions
    // Array.map() returns what the function you pass it returns for each item in the array.
    let moves = winningCombo.map((position) => {
      return cells[position].textContent
    })
    
    // moves will now contain something like ['x', 'o', ''], ['x', 'o', 'o'], or ['x', 'x', 'x']
    // If all of those are the same as currentPlayer, then that player won!
    // Array.every() returns true if the function you pass it returns true for each item in the array.
    if (moves.every((move) => {
      // Does this move match the current player
      return move === currentPlayer
    })) {
      return true
    }
  }
  // If we never returned returned true after looking at all those combos, then the player didn't win
  return false
}
