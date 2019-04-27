import React from 'react'
import ReadingNav from '@handbook/ReadingNav'

const pages = [
  {
    path: 'intro',
    text: 'Introduction to HTML',
  },
  {
    path: 'what-is-html',
    text: 'What is HTML',
  },
  {
    path: 'nesting-elements',
    text: 'Nesting Elements',
  },
  {
    path: 'block-versus-inline-elements',
    text: 'Block Versus Inline Elements',
  },
  {
    path: 'empty-elements',
    text: 'Empty Elements',
  },
  {
    path: 'attributes',
    text: 'Attributes',
  },
  {
    path: 'boolean-attributes',
    text: 'Boolean Attributes',
  },
  {
    path: 'anatomy-of-an-html-document',
    text: 'Anatomy of an HTML Document',
  },
  {
    path: 'whitespace-in-html',
    text: 'Whitespace in HTML',
  },
  {
    path: 'metadata-in-html',
    text: 'Metadata in HTML',
  },
  {
    path: 'html-text-fundamentals',
    text: 'HTML Text Fundamentals',
  },
  {
    path: 'creating-hyperlinks',
    text: 'Creating Hyperlinks',
  },
  {
    path: 'tables',
    text: 'Tables',
  },
  {
    path: 'what-is-a-table',
    text: 'What is a Table?',
  },
  {
    path: 'semantic-html',
    text: 'Semantic HTML',
  },
  {
    path: 'common-tags',
    text: 'Common Tags',
  },
]

const Nav = () => <ReadingNav pages={pages} />

export default Nav
