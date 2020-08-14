import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { Transition } from './Transition'

function useScrollPosition(target) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    let position = 0
    let height = 0
    let ticking = false
    const currentTarget = target.current

    const handleScroll = (e) => {
      position = currentTarget.scrollTop
      height = currentTarget.scrollHeight - currentTarget.offsetHeight
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition(position)
          setScrollHeight(height)
          ticking = false
        })
        ticking = true
      }
    }

    if (currentTarget) currentTarget.addEventListener('scroll', handleScroll)
    return () => {
      if (currentTarget)
        currentTarget.removeEventListener('scroll', handleScroll)
    }
  }, [target])

  return [scrollPosition, scrollHeight]
}

export function SiteFooter({ main }) {
  const [position, height] = useScrollPosition(main)
  return (
    <Transition
      enter="transition-opacity ease-in duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      unmountOnExit={false}
      show={position < 50 || position > height - 50}
    >
      <footer
        className={cx(
          'h-16 flex items-center justify-center bg-white text-gray-500 shadow bottom-0 left-0 right-0 print:relative',
          position > 0 ? 'sticky' : 'absolute'
        )}
      >
        &copy; 2017 - {new Date().getFullYear()}; Built with &hearts; in St.
        Petersburg, Florida.
      </footer>
    </Transition>
  )
}
