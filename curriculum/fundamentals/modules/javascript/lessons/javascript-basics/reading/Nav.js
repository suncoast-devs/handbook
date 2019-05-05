import React from 'react'
import ReadingNav from '../../welcome-to-javascript/reading/node_modules/@handbook/ReadingNav'

const pages = [
  {
    path: 'intro',
    text: 'Introduction'
  },
  {
    path: 'basics',
    text: 'Basics'
  },
  {
    path: 'types',
    text: 'Types'
  },
  {
    path: 'control-flow',
    text: 'Control Flow'
  },
  {
    path: 'functions',
    text: 'Function'
  },
  {
    path: 'operators',
    text: 'Operators'
  },
  {
    path: 'text-formatting',
    text: 'Text Formatting (Strings)'
  },
  {
    path: 'arrays',
    text: 'Arrays'
  },
  {
    path: 'objects',
    text: 'Objects'
  }
]

const Nav = () => <ReadingNav pages={pages} />

export default Nav
