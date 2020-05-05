import React from 'react'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import unified from 'unified'

var processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, { createElement: React.createElement })

export function Markdown({ children }) {
  return processor.processSync(children).result
}
