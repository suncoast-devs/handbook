import React, { useState } from 'react'
import cx from 'classnames'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { default as theme } from 'prism-react-renderer/themes/dracula'

// Require additional languages not included by prism-react-renderer
// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
// See https://prismjs.com/#supported-languages to add additional langages.

import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism

require('prismjs/components/prism-csharp')
require('prismjs/components/prism-docker')
require('prismjs/components/prism-powershell')
require('prismjs/components/prism-ruby')
require('prismjs/components/prism-shell-session')
require('prismjs/components/prism-http')
require('prismjs/components/prism-regex')

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
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <div className="relative" style={{ pageBreakInside: 'avoid' }}>
            <div className="absolute right-2 top-2 flex items-center uppercase font-light font-sans tracking-tigher text-gray-300">
              <button
                onClick={() => copyText()}
                className={cx(
                  'bg-gray-700 px-1 rounded transition ease-in-out duration-150 shadow-md hover:text-gray-100 hover:bg-cool-gray-600 print:hidden',
                  copied
                    ? 'text-green-100 bg-green-600 hover:bg-green-600'
                    : 'text-gray-300'
                )}
              >
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
