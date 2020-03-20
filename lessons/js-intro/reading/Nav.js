import React from 'react'
import ReadingNav from '@handbook/ReadingNav'

const pages = [
  {
    path: 'intro',
    text: 'Introduction to JavaScript'
  },
  {
    path: 'javascript-and-html',
    text: 'Using JavaScript'
  },
  {
    path: 'basics',
    text: 'Getting Started With JavaScript'
  },
  {
    path: 'variables',
    text: 'Variables & Types'
  },
  {
    path: 'basic-operations',
    text: 'Manipulating Data'
  },
  {
    path: 'functions',
    text: 'Using functions'
  },
  {
    path: 'query-the-dom',
    text: 'Interacting with the DOM'
  },
  {
    path: 'events',
    text: 'Bring it together'
  }
]

const Nav = () => <ReadingNav pages={pages} />

export default Nav
