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

  console.log({ ...opts })
  console.log(language)
  console.log(props)

  return <Prism style={style} language={language} {...props} />
}

export default {
  ...parentTheme,

  components: {
    pre,
    code: createCode(),
  },

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
  },
  pre: {
    margin: '2rem',
    code: {
      display: 'block',
    },
  },
  code: {
    fontSize: '1rem',
  },
  table: {
    td: {
      minWidth: '25rem',
      padding: '2rem',
    },
  },
  Slide: {
    padding: '1rem',
  },
}
