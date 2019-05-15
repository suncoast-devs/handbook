import React from 'react'
import ReadingNav from '@handbook/ReadingNav'

const pages = [
  {
    path: 'intro',
    text: 'Introduction to CSS',
  },
  {
    path: 'vocabulary',
    text: 'Vocabulary',
  },
  {
    path: 'css-declarations',
    text: 'CSS Declarations',
  },
  {
    path: 'css-details',
    text: 'CSS Details',
  },
  {
    path: 'simple-selectors',
    text: 'Simple Selectors',
  },
  {
    path: 'pseudo-classes',
    text: 'Pseudo Classes',
  },
  {
    path: 'pseudo-elements',
    text: 'Pseudo Elements',
  },
  {
    path: 'combinators-and-selector-lists',
    text: 'Combinators and Selector Lists',
  },
  {
    path: 'values',
    text: 'Values',
  },
  {
    path: 'functions',
    text: 'Functions',
  },
  {
    path: 'cascade-and-inheritance',
    text: 'Cascade and Inheritance',
  },
  {
    path: 'the-box-model',
    text: 'The Box Model',
  },
  {
    path: 'backgrounds',
    text: 'Backgrounds',
  },
  {
    path: 'fancy-borders',
    text: 'Fancy Borders',
  },
]

const Nav = () => <ReadingNav pages={pages} />

export default Nav
