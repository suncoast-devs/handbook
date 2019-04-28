import React from 'react'
import ReadingNav from '@handbook/ReadingNav'

const pages = [
  {
    path: 'intro',
    text: 'Introduction',
  },
  {
    path: 'basics',
    text: 'Basics',
  },
  {
    path: 'types',
    text: 'Types',
  },
  {
    path: 'control-flow',
    text: 'Control Flow',
  },
  {
    path: 'functions',
    text: 'Function',
  },
  {
    path: 'operators',
    text: 'Operators',
  },
]

const Nav = () => <ReadingNav pages={pages} />

export default Nav
