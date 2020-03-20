import React from 'react'
import ReadingNav from '@handbook/ReadingNav'

const pages = [
  {
    path: 'intro',
    text: 'Introduction',
  },
  {
    path: 'mobile-first',
    text: 'Mobile as Default',
  },
  {
    path: 'workflow',
    text: 'Workflow',
  },
  {
    path: 'building-html-css-mobile-first',
    text: 'Building HTML and CSS with mobile first',
  },
  {
    path: 'media-query-details',
    text: 'Media Query Details',
  },
]

const Nav = () => <ReadingNav pages={pages} />

export default Nav
