import React from 'react'
import { Location } from '@reach/router'

const ReadingNav = props => {
  const { pages } = props

  const findIndex = location => {
    const path = location.pathname
      .replace(/\/*$/, '')
      .split('/')
      .pop()
    return pages.findIndex(page => page.path === path)
  }

  const relativePath = location =>
    location.pathname.endsWith('/') ? '..' : '.'

  const path = (location, offset) => {
    const index = findIndex(location)

    return (
      pages[index + offset] &&
      `${relativePath(location)}/${pages[index + offset].path}`
    )
  }

  const text = (location, offset) => {
    const index = findIndex(location)

    return pages[index + offset] && pages[index + offset].text
  }

  return (
    <Location>
      {({ location }) => (
        <ul className="handbook-nav-links">
          <li>
            <i class="fas fa-home" />
            <a href={location.pathname.endsWith('/') ? '../..' : '..'}>Main</a>
          </li>
          {path(location, +1) && (
            <li>
              <i class="fas fa-chevron-right" />
              <a href={path(location, +1)}>{text(location, +1)}</a>
            </li>
          )}
          {path(location, -1) && (
            <li>
              <i class="fas fa-chevron-left" />
              <a href={path(location, -1)}>{text(location, -1)}</a>
            </li>
          )}
        </ul>
      )}
    </Location>
  )
}

export default ReadingNav
