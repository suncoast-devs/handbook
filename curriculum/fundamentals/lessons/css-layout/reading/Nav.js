import React from 'react'
import ReadingNav from '@handbook/ReadingNav'

const pages = [
  {
    path: 'intro',
    text: 'Introduction',
  },
  {
    path: 'normal-flow',
    text: 'Normal Flow',
  },
  {
    path: 'flexbox',
    text: 'Flexbox',
  },
  {
    path: 'floats',
    text: 'Floats',
  },
  {
    path: 'positioning',
    text: 'Positioning',
  },
  {
    path: 'flexbox-in-depth',
    text: 'Flexbox in Depth',
  },
]

const Nav = () => <ReadingNav pages={pages} />

export default Nav
