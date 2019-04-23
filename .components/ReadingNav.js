import React from 'react'

const ReadingNav = props => {
  const { pages } = props

  const path = window.location.pathname.split('/').pop()
  const index = pages.findIndex(page => page.path === path)

  const nextPath = pages[index + 1] && `./${pages[index + 1].path}`
  const nextText = pages[index + 1] && pages[index + 1].text

  const prevPath = pages[index - 1] && `./${pages[index - 1].path}`
  const prevText = pages[index - 1] && pages[index - 1].text

  return (
    <ul className="handbook-nav-links">
      {nextPath && (
        <li>
          <i className="fa fa-angle-right" />
          <a href={nextPath}>{nextText}</a>
        </li>
      )}
      {prevPath && (
        <li>
          <i className="fa fa-angle-left" />
          <a href={prevPath}>{prevText}</a>
        </li>
      )}
    </ul>
  )
}

export default ReadingNav
