import React from 'react'
import { Location } from '@reach/router'

const ReadingNav = props => {
  const { pages } = props

  const findIndex = location => {
    console.log(location)

    const path = location.pathname
      .replace(/\/*$/, '')
      .split('/')
      .pop()
    return pages.findIndex(page => page.path === path)
  }

  const nextPath = location => {
    const index = findIndex(location)

    return pages[index + 1] && `./${pages[index + 1].path}`
  }

  const nextText = location => {
    const index = findIndex(location)

    return pages[index + 1] && pages[index + 1].text
  }

  const prevPath = location => {
    const index = findIndex(location)

    return pages[index - 1] && `./${pages[index - 1].path}`
  }

  const prevText = location => {
    const index = findIndex(location)

    return pages[index - 1] && pages[index - 1].text
  }

  return (
    <Location>
      {({ location }) => (
        <ul className="handbook-nav-links">
          {nextPath(location) && (
            <li>
              <i className="fa fa-angle-right" />
              <a href={nextPath(location)}>{nextText(location)}</a>
            </li>
          )}
          {prevPath(location) && (
            <li>
              <i className="fa fa-angle-left" />
              <a href={prevPath(location)}>{prevText(location)}</a>
            </li>
          )}
        </ul>
      )}
    </Location>
  )
}

export default ReadingNav
