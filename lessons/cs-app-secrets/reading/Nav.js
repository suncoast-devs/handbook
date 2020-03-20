import React from 'react'
import ReadingNav from '@handbook/ReadingNav'

const pages = [
  {
    path: 'intro',
    text: 'Introduction',
  },
]

const Nav = () => <ReadingNav pages={pages} />

export default Nav
