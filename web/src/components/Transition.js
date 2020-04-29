// https://gist.github.com/vvo/9efd4a9b687847e36fb85f0cfd11b572

import React, { Children } from 'react'
import { CSSTransition } from 'react-transition-group'

export function Transition({
  show = true,
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  children,
  appear = false,
  onExited = () => {},
}) {
  const enterClasses = enter.split(' ')
  const enterFromClasses = enterFrom.split(' ')
  const enterToClasses = enterTo.split(' ')
  const leaveClasses = leave.split(' ')
  const leaveFromClasses = leaveFrom.split(' ')
  const leaveToClasses = leaveTo.split(' ')

  return (
    <CSSTransition
      addEndListener={(node, done) => {
        node.addEventListener('transitionend', done, false)
      }}
      appear={appear}
      in={show}
      onEnter={(node) => {
        node.classList.add(...enterClasses, ...enterFromClasses)
      }}
      onEntered={(node) => {
        node.classList.remove(...enterClasses)
      }}
      onEntering={(node) => {
        node.classList.remove(...enterFromClasses)
        node.classList.add(...enterToClasses)
      }}
      onExit={(node) => {
        node.classList.add(...leaveClasses, ...leaveFromClasses)
      }}
      onExited={(node) => {
        node.classList.remove(...leaveClasses)
        onExited()
      }}
      onExiting={(node) => {
        node.classList.remove(...leaveFromClasses)
        node.classList.add(...leaveToClasses)
      }}
      unmountOnExit={true}
    >
      {Children.only(children)}
    </CSSTransition>
  )
}
