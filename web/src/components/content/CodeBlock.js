import React, { useState } from 'react'
import cx from 'classnames'
import Highlight from 'prism-react-renderer'
import { default as theme } from 'prism-react-renderer/themes/dracula'

import PrismCore from 'prismjs/components/prism-core'

import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'

import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css-extras'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-js-extras'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-powershell'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-shell-session'
// import 'prismjs/components/prism-markdown'
// import 'prismjs/components/prism-http'
// import 'prismjs/components/prism-regex'
// import 'prismjs/components/prism-git'

// See https://prismjs.com/#supported-languages to add additional langages.

export function CodeBlock({ children, className }) {
  const language = className?.replace(/language-/, '')
  const code = children.trimEnd()

  const [copied, setCopied] = useState(false)

  async function copyText() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <Highlight Prism={PrismCore} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <div className="relative">
            <div
              className={cx(
                'absolute flex items-center right-2 top-1 transition ease-in-out duration-150 uppercase font-light font-sans tracking-tigher',
                copied
                  ? 'text-green-300 opacity-100'
                  : 'text-gray-300 hover:opacity-100 opacity-50'
              )}
            >
              {
                <span
                  className={cx(
                    'text-xs mr-2',
                    copied ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  copied!
                </span>
              }
              <button onClick={() => copyText()}>
                <i className="fad fa-copy"></i>
              </button>
            </div>
            <code className={className} style={{ ...style }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </div>
        )
      }}
    </Highlight>
  )
}
