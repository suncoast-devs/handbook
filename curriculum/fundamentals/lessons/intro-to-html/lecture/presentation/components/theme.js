import { code as parentTheme } from 'mdx-deck/themes'
import { Prism } from 'react-syntax-highlighter'

import style from 'react-syntax-highlighter/dist/styles/prism/atom-dark'

const pre = props => props.children

export const getLanguage = className => {
  const match = /language-(\w*)/.exec(className || 'language-javascript')
  let lang = 'javascript'
  if (match.length > 1) {
    lang = match[1]
  }
  return lang
}

export const createCode = (opts = {}) => props => {
  const language = getLanguage(props.className)

  return <Prism style={style} language={language} {...props} />
}

export default {
  ...parentTheme,

  components: {
    pre,
    code: createCode(),
  },

  googleFont: 'Source Sans Pro',
  css: {
    '@media screen and (min-width:56em)': {
      fontSize: '2rem',
    },
    '@media screen and (min-width:64em)': {
      fontSize: '2rem',
    },
    '@media print': {
      fontSize: '1rem',
    },
    background: '#80ced2',
    color: '#2f3737',
  },
  li: {
    margin: '1rem',
    listStyle: 'none',
  },
  heading: {
    position: 'fixed',
    top: 0,
    left: 0,
    maxWidth: '100%',
    width: '100vw',
    textAlign: 'center',
  },
  code: {
    color: 'inherit',
  },
  pre: {
    margin: '2rem',
    code: {
      display: 'block',
      fontSize: '1rem',
    },
  },
  blockquote: {
    margin: '0',
    padding: '0',
  },
  p: {
    textAlign: 'left',
    margin: '0 auto',
  },
  table: {
    td: {
      minWidth: '25rem',
      padding: '2rem',
    },
  },
  Slide: {
    padding: '0 6rem',
  },
}
