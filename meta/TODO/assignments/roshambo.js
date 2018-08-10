const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

const minToWin = 2

const versus = { rock: 'scissors', paper: 'rock', scissors: 'paper' }
const scores = { player: 0, computer: 0 }

const handleButtonClick = (event) => {
  const player = event.target.className
  const computer = getComputerMove()
  $('figure.player img').src = `/images/${player}.svg`
  $('figure.computer img').src = `/images/${computer}.svg`
  if (player === computer) {
    $('figure.player').className = 'player draw'
    $('figure.computer').className = 'computer draw'
  } else {
    if (computer === versus[player]) {
      $('figure.player').className = 'player win'
      $('figure.computer').className = 'computer lose'
      if (++scores.player >= minToWin) { gameOver(true) }
    } else {
      $('figure.player').className = 'player lose'
      $('figure.computer').className = 'computer win'
      if (++scores.computer >= minToWin) { gameOver(false) }
    }
    $('.scores .player').textContent = scores.player
    $('.scores .computer').textContent = scores.computer
  }
}

const getComputerMove = () => {
  const moves = ['rock', 'paper', 'scissors']
  return moves[Math.floor(Math.random() * moves.length)]
}

const gameOver = (playerDidWin) => {
  if (playerDidWin) {
    $('.dialog h3').textContent = 'You won!'
  } else {
    $('.dialog h3').textContent = 'You lost!'
  }
  $('body').className = 'modal'
}

const resetGame = () => {
  scores.player = 0
  scores.computer = 0
  $('.scores .player').textContent = 0
  $('.scores .computer').textContent = 0
  $('figure.player').className = 'player'
  $('figure.computer').className = 'computer'
  $('figure.player img').src = '/images/unknown.svg'
  $('figure.computer img').src = '/images/unknown.svg'
  $('body').className = ''
}

const main = () => {
  const buttons = $$('.player-input button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick)
  }
  $('.dialog button').addEventListener('click', resetGame)
}

document.addEventListener('DOMContentLoaded', main)
