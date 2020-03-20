import React from 'react'
import ReadingNav from '@handbook/ReadingNav'

const pages = [
  {
    path: 'intro',
    text: 'Introduction',
  },
  {
    path: 'git',
    text: 'Basics',
  },
]

const Nav = () => <ReadingNav pages={pages} />

export default Nav
